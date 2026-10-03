import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { computeTarget, sceneState } from "./scene-state";

const TEX = "/textures/earth";
const SUN = new THREE.Vector3(-1, 0.35, 0.75).normalize();
const TILT = THREE.MathUtils.degToRad(23.4);

const HQ = { name: "Dubai", lat: 25.2, lon: 55.27 };
const OFFICES = [
  { name: "London", lat: 51.5, lon: -0.12, major: true },
  { name: "Singapore", lat: 1.35, lon: 103.82, major: true },
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "Frankfurt", lat: 50.11, lon: 8.68 },
  { name: "Riyadh", lat: 24.71, lon: 46.67 },
  { name: "Cairo", lat: 30.04, lon: 31.24 },
  { name: "Mumbai", lat: 19.07, lon: 72.87 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Sydney", lat: -33.87, lon: 151.2 },
];

/** Lat/long → point on a unit sphere, matching THREE.SphereGeometry's equirectangular UVs. */
function latLon(lat: number, lon: number, r = 1) {
  const phi = THREE.MathUtils.degToRad(lon + 180);
  const theta = THREE.MathUtils.degToRad(90 - lat);
  return new THREE.Vector3(
    -Math.cos(phi) * Math.sin(theta),
    Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
  ).multiplyScalar(r);
}

const earthVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vUv = uv;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const earthFrag = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D specMap;
  uniform sampler2D cloudMap;
  uniform vec3 sunDir;
  uniform vec3 rim;
  uniform float glow;
  uniform float cloudShift;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(cameraPosition - vWorld);
    float NdL = dot(N, sunDir);
    float dayMix = smoothstep(-0.12, 0.28, NdL);

    vec3 day = texture2D(dayMap, vUv).rgb;
    float cloudShadow = texture2D(cloudMap, vUv + vec2(cloudShift - 0.004, 0.002)).a;
    day *= 1.0 - cloudShadow * 0.35;
    vec3 night = texture2D(nightMap, vUv).rgb * vec3(1.0, 0.78, 0.5) * 2.2;

    vec3 col = mix(night, day * (max(NdL, 0.0) * 1.15 + 0.04), dayMix);

    vec3 H = normalize(sunDir + V);
    float ocean = texture2D(specMap, vUv).r;
    col += pow(max(dot(N, H), 0.0), 140.0) * ocean * dayMix * vec3(1.0, 0.92, 0.8) * 0.45;

    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col += rim * fres * (0.35 + glow) * (0.2 + dayMix);

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const cloudFrag = /* glsl */ `
  uniform sampler2D cloudMap;
  uniform vec3 sunDir;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    float a = texture2D(cloudMap, vUv).a;
    float l = smoothstep(-0.15, 0.45, dot(normalize(vNormal), sunDir));
    gl_FragColor = vec4(vec3(0.03 + l * 0.97), a * 0.92);
    #include <colorspace_fragment>
  }
`;

const atmoVert = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmoFrag = /* glsl */ `
  uniform vec3 color;
  uniform float strength;
  varying vec3 vNormal;
  void main() {
    float i = pow(max(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 4.0);
    gl_FragColor = vec4(color, 1.0) * i * strength;
  }
`;

const arcFrag = /* glsl */ `
  uniform float time;
  uniform float offset;
  uniform vec3 color;
  varying vec2 vUv;
  void main() {
    float d = fract(vUv.x - time * 0.32 + offset);
    float pulse = smoothstep(0.72, 0.98, d) * (1.0 - smoothstep(0.98, 1.0, d));
    gl_FragColor = vec4(color, 0.16 + pulse * 0.95);
  }
`;

const arcVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Arcs({ color }: { color: THREE.Color }) {
  const mats = useRef<THREE.ShaderMaterial[]>([]);
  const curves = useMemo(() => {
    const a = latLon(HQ.lat, HQ.lon, 1.003);
    return OFFICES.map((o) => {
      const b = latLon(o.lat, o.lon, 1.003);
      const lift = 1 + a.distanceTo(b) * 0.38;
      const mid = a.clone().add(b).normalize().multiplyScalar(lift);
      return new THREE.QuadraticBezierCurve3(a, mid, b);
    });
  }, []);
  useFrame((state) => {
    for (const m of mats.current) {
      m.uniforms["time"]!.value = state.clock.elapsedTime;
      (m.uniforms["color"]!.value as THREE.Color).lerp(color, 0.06);
    }
  });
  return (
    <>
      {curves.map((c, i) => (
        <mesh key={i}>
          <tubeGeometry args={[c, 64, 0.0035, 6, false]} />
          <shaderMaterial
            ref={(m) => {
              if (m) mats.current[i] = m;
            }}
            vertexShader={arcVert}
            fragmentShader={arcFrag}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uniforms={{
              time: { value: 0 },
              offset: { value: i * 0.17 },
              color: { value: new THREE.Color("#7fe8e6") },
            }}
          />
        </mesh>
      ))}
    </>
  );
}

function Markers({ color }: { color: THREE.Color }) {
  const rings = useRef<THREE.Mesh[]>([]);
  const dots = useRef<THREE.MeshBasicMaterial[]>([]);
  const points = useMemo(
    () =>
      [{ ...HQ, major: true, hq: true }, ...OFFICES.map((o) => ({ ...o, hq: false }))].map((p) => {
        const pos = latLon(p.lat, p.lon, 1.004);
        const q = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          pos.clone().normalize(),
        );
        return { ...p, pos, q };
      }),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    rings.current.forEach((r, i) => {
      if (!r) return;
      const k = (t * 0.6 + i * 0.23) % 1;
      r.scale.setScalar(1 + k * 3);
      (r.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.8;
    });
    dots.current.forEach((d) => d?.color.lerp(color, 0.06));
  });
  return (
    <>
      {points.map((p, i) => (
        <group key={p.name} position={p.pos} quaternion={p.q}>
          <mesh>
            <circleGeometry args={[p.hq ? 0.014 : p.major ? 0.01 : 0.007, 16]} />
            <meshBasicMaterial
              ref={(m) => {
                if (m) dots.current[i] = m;
              }}
              color={p.hq ? "#e6c98a" : "#7fe8e6"}
              toneMapped={false}
            />
          </mesh>
          {(p.hq || p.major) && (
            <mesh
              ref={(m) => {
                if (m) rings.current[i] = m;
              }}
            >
              <ringGeometry args={[0.014, 0.018, 32]} />
              <meshBasicMaterial
                color={p.hq ? "#e6c98a" : "#7fe8e6"}
                transparent
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}

function Earth({ lite }: { lite: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const spin = useRef<THREE.Group>(null!);
  const clouds = useRef<THREE.Mesh>(null!);
  const atmo = useRef<THREE.ShaderMaterial>(null!);
  const cur = useRef({ x: 0, y: 0, s: 1.2, near: 0 });
  const tint = useMemo(() => new THREE.Color(), []);
  const accent = useMemo(() => new THREE.Color("#7fe8e6"), []);
  const ndc = useMemo(() => new THREE.Vector3(), []);
  const { viewport, camera, gl } = useThree();

  const [day, night, spec, cloud] = useTexture([
    `${TEX}/earth_atmos_2048.jpg`,
    `${TEX}/earth_lights_2048.png`,
    `${TEX}/earth_specular_2048.jpg`,
    `${TEX}/earth_clouds_1024.png`,
  ]) as [THREE.Texture, THREE.Texture, THREE.Texture, THREE.Texture];
  useMemo(() => {
    day.colorSpace = THREE.SRGBColorSpace;
    night.colorSpace = THREE.SRGBColorSpace;
    const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
    for (const t of [day, night, spec, cloud]) t.anisotropy = aniso;
  }, [day, night, spec, cloud, gl]);

  const earthUniforms = useMemo(
    () => ({
      dayMap: { value: day },
      nightMap: { value: night },
      specMap: { value: spec },
      cloudMap: { value: cloud },
      sunDir: { value: SUN.clone() },
      rim: { value: new THREE.Color("#5fb8ff") },
      glow: { value: 0 },
      cloudShift: { value: 0 },
    }),
    [day, night, spec, cloud],
  );

  const cloudUniforms = useMemo(
    () => ({ cloudMap: { value: cloud }, sunDir: earthUniforms.sunDir }),
    [cloud, earthUniforms],
  );

  const startRotation = useMemo(() => {
    const d = latLon(HQ.lat - 8, HQ.lon - 20);
    return -Math.atan2(d.x, d.z);
  }, []);

  useFrame((_, dt) => {
    const t = computeTarget();
    const k = 1 - Math.pow(0.002, dt);
    const c = cur.current;
    c.x += (t.x - c.x) * k;
    c.y += (t.y - c.y) * k;
    c.s += (t.s - c.s) * k;
    const sm = lite ? 0.75 : 1;
    const px = sceneState.pointer.x;
    const py = sceneState.pointer.y;

    group.current.position.set(
      (c.x * viewport.width) / 2 + px * 0.2,
      (c.y * viewport.height) / 2 + py * 0.12,
      0,
    );
    group.current.scale.setScalar(c.s * sm * (1 + c.near * 0.04));

    ndc.copy(group.current.position).project(camera);
    const d = Math.hypot(ndc.x - px, (ndc.y - py) * (viewport.height / viewport.width));
    const near = THREE.MathUtils.clamp(1 - d / (0.22 * c.s * sm), 0, 1);
    c.near += (near - c.near) * 0.08;

    const v = Math.min(3, Math.abs(sceneState.velocity));
    spin.current.rotation.y += dt * (0.035 + v * 0.18 + c.near * 0.12);
    group.current.rotation.x += (-py * 0.18 - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (px * 0.3 - group.current.rotation.y) * 0.04;
    clouds.current.rotation.y += dt * 0.012;
    earthUniforms.cloudShift.value = (clouds.current.rotation.y / (Math.PI * 2)) % 1;

    accent.set(sceneState.hover ?? sceneState.color);
    tint.set("#4f9dff").lerp(accent, 0.15 + c.near * 0.3);
    earthUniforms.rim.value.lerp(tint, 0.05);
    earthUniforms.glow.value = c.near * 0.6 + v * 0.08;
    atmo.current.uniforms["color"]!.value.lerp(tint, 0.05);
    atmo.current.uniforms["strength"]!.value = 0.75 + c.near * 0.6;
  });

  const seg = lite ? 64 : 128;
  return (
    <group ref={group}>
      <mesh scale={1.12}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          ref={atmo}
          vertexShader={atmoVert}
          fragmentShader={atmoFrag}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          uniforms={{ color: { value: new THREE.Color("#5fb8ff") }, strength: { value: 1.1 } }}
        />
      </mesh>
      <group rotation={[0, 0, TILT]}>
        <group ref={spin} rotation={[0, startRotation, 0]}>
          <mesh>
            <sphereGeometry args={[1, seg, seg]} />
            <shaderMaterial
              vertexShader={earthVert}
              fragmentShader={earthFrag}
              uniforms={earthUniforms}
            />
          </mesh>
          <mesh ref={clouds} scale={1.012}>
            <sphereGeometry args={[1, seg, seg]} />
            <shaderMaterial
              vertexShader={earthVert}
              fragmentShader={cloudFrag}
              uniforms={cloudUniforms}
              transparent
              depthWrite={false}
            />
          </mesh>
          <Arcs color={accent} />
          <Markers color={accent} />
        </group>
      </group>
    </group>
  );
}

function Stars({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const [positions, colors] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(14 + Math.random() * 16);
      v.z = -Math.abs(v.z) - 4;
      p.set([v.x, v.y, v.z], i * 3);
      const warm = Math.random();
      tmp.setHSL(warm > 0.85 ? 0.08 : 0.58, warm > 0.85 ? 0.6 : 0.3, 0.6 + Math.random() * 0.4);
      c.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    return [p, c];
  }, [count]);
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * (0.004 + Math.min(3, Math.abs(sceneState.velocity)) * 0.006);
    ref.current.position.y = -window.scrollY * 0.0004;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function isLowPower() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (
    innerWidth < 768 ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Scene() {
  const [lite] = useState(isLowPower);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const f = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", f);
    return () => document.removeEventListener("visibilitychange", f);
  }, []);
  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
    >
      <Earth lite={lite} />
      <Stars count={lite ? 600 : 1600} />
    </Canvas>
  );
}
