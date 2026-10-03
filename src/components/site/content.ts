import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import t4 from "@/assets/t4.jpg";
import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";
import c3 from "@/assets/c3.jpg";
import c4 from "@/assets/c4.jpg";

export const COMPANY = "Novarc";
export type Lang = "en" | "ar";

/* ───────────── language-independent data ───────────── */

export const navHrefs = ["/", "/about", "/#services", "/projects", "/team", "/contact"];
export const offices = [
  { tz: "Asia/Dubai", hq: true },
  { tz: "Europe/London", hq: false },
  { tz: "Asia/Singapore", hq: false },
  { tz: "Asia/Riyadh", hq: false },
];
export const caseMetrics = [
  [
    { v: 62, s: "" },
    { v: 28, s: "%" },
    { v: 9, s: "" },
  ],
  [
    { v: 40, s: "M" },
    { v: 4, s: "" },
    { v: 12, s: "ms" },
  ],
  [
    { v: 2, s: "M" },
    { v: 35, s: "%" },
    { v: 400, s: "" },
  ],
  [
    { v: 31, s: "%" },
    { v: 3, s: "x" },
    { v: 12, s: "" },
  ],
];
export const departmentSizes = [12, 6, 4, 4, 4];
export const serviceColors = ["#5fe0e0", "#6fb8ff", "#e6c98a", "#9fe8b8", "#ff9f8a", "#c9d6ff"];
export const strengthSpans = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
];
export const statValues = [250, 120, 10, 15, 30];
export const projectMedia = [
  { img: p1, year: "2025" },
  { img: p2, year: "2024" },
  { img: p3, year: "2024" },
  { img: p4, year: "2023" },
];
export const testimonialImgs = [c1, c2, c3, c4];
export const teamImgs = [t1, t2, t3, t4];
export const socialHrefs = ["#", "#", "#", "#"];
export const PHONE = "+971 4 555 0142";
export const EMAIL = "hello@novarc.co";

export const clients = [
  { name: "Altura", color: "#5fe0e0", shape: "circle" },
  { name: "Vectra", color: "#ff9f8a", shape: "triangle" },
  { name: "Northwind", color: "#6fb8ff", shape: "square" },
  { name: "Kairo", color: "#e6c98a", shape: "diamond" },
  { name: "Solenne", color: "#f5b3d4", shape: "circle" },
  { name: "Obsidian", color: "#c9d6ff", shape: "square" },
  { name: "Helix", color: "#9fe8b8", shape: "triangle" },
  { name: "Quanta", color: "#b79cff", shape: "diamond" },
  { name: "Marlow", color: "#ffcf6f", shape: "circle" },
  { name: "Zephyr", color: "#7fe8e6", shape: "triangle" },
  { name: "Orbis", color: "#ff8fa3", shape: "square" },
  { name: "Tessera", color: "#a8e063", shape: "diamond" },
] as const;

/* ───────────── copy ───────────── */

const en = {
  nav: ["Home", "About", "Services", "Projects", "Team", "Contact"],
  ui: {
    getStarted: "Get Started",
    menu: "Menu",
    switchLabel: "عربي",
    switchAria: "التبديل إلى العربية",
    langName: "English",
  },
  loader: ["Initialising core", "Loading systems", "Calibrating scene", "Preparing story", "Ready"],
  hero: {
    side: "Intelligent infrastructure — since 2014",
    eyebrow: "Novarc Group — Est. 2014",
    l1: "Engineering",
    l2: "tomorrow's",
    l3: "infrastructure.",
    lead: "We design, build and operate the intelligent systems behind banks, cities and global enterprises — with the calm precision of people who've done it for a decade.",
    explore: "Explore Services",
    contact: "Contact Us",
    scroll: "Scroll to begin the story",
    cities: "Dubai · London · Singapore",
  },
  about: {
    marquee: "WHO WE ARE — OUR STORY — WHO WE ARE —",
    chapters: [
      {
        k: "Who We Are",
        t: "An engineering and strategy group building the digital backbone of ambitious organisations.",
      },
      {
        k: "Our Story",
        t: "Founded in 2014 by four engineers in a rented studio, we now operate across 15 countries.",
      },
      {
        k: "Our Mission",
        t: "Turn complex infrastructure into calm, intelligent systems people trust every day.",
      },
      { k: "Our Vision", t: "" },
      { k: "Our Values", t: "" },
    ],
    milestones: [
      { y: "2014", t: "Founded in a rented studio in Dubai" },
      { y: "2017", t: "First national-scale infrastructure contract" },
      { y: "2020", t: "London & Singapore offices open" },
      { y: "2023", t: "Operations across 15 countries" },
      { y: "2026", t: "250+ systems running in production" },
    ],
    missionCaption: "Field ops — Lumen Fibre",
    visionA: "A world where every enterprise runs on technology that is",
    visionB: "invisible, resilient and humane.",
    values: [
      { t: "Precision", d: "Every decision measured, every detail deliberate." },
      { t: "Candour", d: "We say the hard thing early, so nothing surprises you late." },
      { t: "Craft", d: "Senior people who still care how the work is made." },
      { t: "Long-term", d: "We build systems meant to outlast the next hype cycle." },
    ],
  },
  services: {
    t1: "Our",
    t2: "Services",
    lead: "Six disciplines, one integrated team. Hover to explore — the planet shifts its energy with every capability.",
    more: "Learn More",
    items: [
      {
        name: "Digital Strategy",
        d: "Roadmaps that align technology investment with measurable business outcomes.",
      },
      {
        name: "Cloud Infrastructure",
        d: "Resilient, secure and cost-aware platforms engineered for global scale.",
      },
      {
        name: "AI & Data Systems",
        d: "Applied intelligence, from data pipelines to production-grade models.",
      },
      {
        name: "Product Engineering",
        d: "Web and mobile products designed and built end-to-end by one team.",
      },
      { name: "Cyber Security", d: "Zero-trust architecture, audits and 24/7 threat response." },
      {
        name: "Experience Design",
        d: "Interfaces and brand systems that make complex things feel effortless.",
      },
    ],
  },
  why: {
    eyebrow: "Why choose us",
    a: "Trusted where failure",
    b: "isn't",
    c: "an option.",
    items: [
      { t: "Experience", d: "A decade delivering for regulated, high-stakes industries." },
      { t: "Quality", d: "ISO 27001 processes and obsessive QA on every release." },
      { t: "Innovation", d: "An in-house lab prototyping what comes next." },
      { t: "Professional Team", d: "Senior specialists only — no hand-offs to juniors." },
      { t: "Fast Support", d: "Under 15-minute response, around the clock." },
      { t: "Custom Solutions", d: "Nothing off the shelf. Built for your reality." },
    ],
  },
  stats: {
    eyebrow: "A decade in numbers",
    items: ["Projects Completed", "Happy Clients", "Years Experience", "Countries", "Team Members"],
  },
  projects: {
    ghost: "SELECTED WORK — SELECTED WORK",
    eyebrow: "Selected work 2023—2025",
    t1: "Our",
    t2: "Projects",
    lead: "Infrastructure that quietly powers millions of lives.",
    scroll: "Scroll",
    view: "View Project",
    cursor: "VIEW PROJECT",
    items: [
      {
        name: "Meridian Tower",
        cat: "Smart Building OS",
        d: "A unified operating system for a 62-floor headquarters — energy, access and comfort in one layer.",
      },
      {
        name: "Atlas Bank",
        cat: "Fintech Platform",
        d: "Real-time risk command center processing 40M transactions a day across four continents.",
      },
      {
        name: "Lumen Fibre",
        cat: "Network Infrastructure",
        d: "A national fibre rollout orchestrated by predictive planning and field automation.",
      },
      {
        name: "Harbor One",
        cat: "Logistics Intelligence",
        d: "Port digital twin that cut vessel turnaround times by 31% in its first year.",
      },
    ],
  },
  process: {
    eyebrow: "Our process",
    t1: "Six steps.",
    t2: "Zero surprises.",
    items: [
      { t: "Discovery", d: "Workshops, audits and interviews to understand the real problem." },
      { t: "Planning", d: "Architecture, milestones and a transparent budget you can hold us to." },
      { t: "Design", d: "Systems and interfaces prototyped and validated with real users." },
      { t: "Development", d: "Senior engineers shipping in weekly, demo-able increments." },
      { t: "Testing", d: "Automated, security and load testing before anything goes live." },
      { t: "Delivery", d: "Launch, handover and long-term partnership with measurable SLAs." },
    ],
  },
  clients: { eyebrow: "Trusted by 120+ industry leaders" },
  testimonials: {
    eyebrow: "Testimonials",
    t1: "In their",
    t2: "own words.",
    prev: "Previous",
    next: "Next",
    show: "Show",
    items: [
      {
        name: "Lena Hartmann",
        company: "Atlas Bank",
        role: "Chief Technology Officer",
        r: "Novarc rebuilt our risk platform without a single minute of downtime. They operate like an extension of our own leadership team.",
      },
      {
        name: "Omar Al-Rashid",
        company: "Meridian Group",
        role: "Managing Director",
        r: "Rare combination of strategic clarity and engineering depth. The building now practically runs itself.",
      },
      {
        name: "Sofia Marín",
        company: "Harbor One",
        role: "VP Operations",
        r: "Their digital twin changed how we plan every single day. Measurable impact within the first quarter.",
      },
      {
        name: "Daniel Okafor",
        company: "Lumen Fibre",
        role: "Head of Programmes",
        r: "Calm, precise and brutally honest about trade-offs. Exactly the partner you want on a national project.",
      },
    ],
  },
  team: {
    title: "The people.",
    meta: "30 specialists · 9 nationalities",
    cursor: "HELLO",
    social: "Social profile",
    items: [
      { name: "Elena Novak", role: "Founder & CEO" },
      { name: "Marcus Reid", role: "Chief Technology Officer" },
      { name: "Yasmin Haddad", role: "Head of Design" },
      { name: "Julian Weber", role: "Principal Engineer" },
    ],
  },
  cta: {
    eyebrow: "Ready when you are",
    l1: "Let's build",
    l2: "something great",
    l3: "together.",
    start: "Start a Project",
    contact: "Contact Us",
  },
  contact: {
    eyebrow: "Contact",
    t1: "Tell us what",
    t2: "you're building.",
    info: [
      { l: "Address", v: "Level 41, Emirates Towers, Dubai, UAE" },
      { l: "Phone", v: PHONE },
      { l: "Email", v: EMAIL },
      { l: "Working Hours", v: "Sun – Thu, 09:00 – 18:00 GST" },
    ],
    form: "Project enquiry",
    name: "Your name",
    email: "Email address",
    company: "Company",
    msg: "Tell us about the project",
    send: "Send Message",
    thanks: "Thank you — we'll reply within 24 hours.",
    map: "Map — 25.2175° N, 55.2826° E",
    openMaps: "Open in Maps ↗",
  },
  footer: {
    about:
      "Engineering and strategy group building intelligent infrastructure for ambitious organisations since 2014.",
    hq: "Dubai HQ —",
    tz: "GST",
    explore: "Explore",
    services: "Services",
    contact: "Contact",
    address: "Level 41, Emirates Towers, Dubai",
    rights: "Novarc Group. All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookies",
    top: "Back to top",
  },
  socials: ["LinkedIn", "X / Twitter", "Instagram", "Behance"],
  teasers: {
    about: "Discover our full story",
    projects: "All case studies",
    team: "Meet the whole team",
  },
  next: { label: "Next page", cursor: "GO" },
  pages: {
    about: {
      index: "01",
      eyebrow: "About Novarc",
      l1: "We build what",
      l2: "others call",
      l3: "impossible.",
      lead: "A decade of engineering the systems that banks, cities and governments can't afford to get wrong — and the people, principles and places behind them.",
      meta: ["Est. 2014", "15 countries", "4 offices"],
      marquee: "PRECISION — CANDOUR — CRAFT — LONG-TERM — ",
    },
    projects: {
      index: "02",
      eyebrow: "Our work",
      l1: "Work that",
      l2: "runs the world",
      l3: "quietly.",
      lead: "From 62-floor towers to national fibre networks — a look inside the infrastructure we've designed, built and still operate today.",
      meta: ["250+ projects", "4 continents", "0 failed launches"],
      marquee: "SMART BUILDINGS — FINTECH — NETWORKS — LOGISTICS — ",
    },
    team: {
      index: "03",
      eyebrow: "Our team",
      l1: "The minds",
      l2: "behind the",
      l3: "machines.",
      lead: "Thirty senior specialists from nine nationalities. No layers, no hand-offs — the people you meet are the people who build.",
      meta: ["30 specialists", "9 nationalities", "12 yrs avg. experience"],
      marquee: "ENGINEERS — DESIGNERS — STRATEGISTS — GUARDIANS — ",
    },
    contact: {
      index: "04",
      eyebrow: "Contact",
      l1: "Let's start",
      l2: "something",
      l3: "remarkable.",
      lead: "Tell us about the problem. A senior partner — not a sales team — will reply within one business day.",
      meta: ["Reply < 24h", "4 offices", "24/7 support"],
      marquee: "DUBAI — LONDON — SINGAPORE — RIYADH — ",
    },
  },
  offices: {
    eyebrow: "Global presence",
    title: "Four cities. One team.",
    open: "Open now",
    closed: "Closed",
    hq: "Headquarters",
    hub: "Regional hub",
    items: [
      { city: "Dubai", country: "United Arab Emirates", addr: "Level 41, Emirates Towers" },
      { city: "London", country: "United Kingdom", addr: "30 St Mary Axe, Floor 18" },
      { city: "Singapore", country: "Singapore", addr: "Marina Bay Financial Centre, T2" },
      { city: "Riyadh", country: "Saudi Arabia", addr: "KAFD, Tower 2.07" },
    ],
  },
  cases: {
    eyebrow: "Case studies",
    title: "Inside the work.",
    challenge: "The challenge",
    approach: "Our approach",
    impact: "Impact",
    items: [
      {
        challenge:
          "Fourteen disconnected building systems, three vendors and no single view of energy, access or occupancy.",
        approach:
          "One operating layer that unifies every sensor and system, with a digital twin facility teams actually use.",
        metrics: ["Floors unified", "Energy saved", "Months to launch"],
      },
      {
        challenge:
          "A legacy risk engine that took hours to flag fraud across markets with completely different regulations.",
        approach:
          "A streaming risk platform with explainable models, rebuilt live with zero downtime for customers.",
        metrics: ["Daily transactions", "Continents", "Avg. decision time"],
      },
      {
        challenge:
          "A national fibre rollout slipping behind schedule, with field teams planning routes on spreadsheets.",
        approach:
          "Predictive route planning and a field app that turned 400 crews into one coordinated operation.",
        metrics: ["Homes connected", "Faster rollout", "Field crews"],
      },
      {
        challenge:
          "Vessel congestion costing millions each month, with berth planning done by phone and whiteboard.",
        approach:
          "A live digital twin of the port that simulates every arrival and recommends the optimal plan.",
        metrics: ["Turnaround cut", "Planning speed", "Months to ROI"],
      },
    ],
  },
  departments: {
    eyebrow: "Departments",
    title: "How we're organised.",
    items: ["Engineering", "Design", "Security", "Strategy", "Operations"],
  },
  perks: {
    eyebrow: "Life at Novarc",
    title: "Built for people who build.",
    items: [
      {
        t: "Deep work first",
        d: "Four meeting-free days a week. Your calendar belongs to your craft.",
      },
      {
        t: "Learning budget",
        d: "$5,000 a year for courses, conferences and books — no approval needed.",
      },
      {
        t: "Work from anywhere",
        d: "Office in four cities, home everywhere else. Six weeks a year fully remote.",
      },
      { t: "Real ownership", d: "Every team member holds equity. When Novarc grows, you grow." },
    ],
  },
  careers: {
    eyebrow: "Careers",
    title: "Join the team.",
    apply: "Apply now",
    items: [
      {
        t: "Senior Platform Engineer",
        dept: "Engineering",
        loc: "Dubai",
        type: "Full-time",
        d: "Design and run the cloud foundations behind national-scale systems. Kubernetes, Go and a strong opinion on observability.",
      },
      {
        t: "Lead Product Designer",
        dept: "Design",
        loc: "London",
        type: "Full-time",
        d: "Shape complex operational tools into calm, beautiful interfaces used by thousands every day.",
      },
      {
        t: "Security Architect",
        dept: "Security",
        loc: "Singapore",
        type: "Full-time",
        d: "Own zero-trust architecture for regulated clients, from threat models to incident response.",
      },
      {
        t: "Data Scientist, Applied AI",
        dept: "Engineering",
        loc: "Remote",
        type: "Contract",
        d: "Build forecasting and optimisation models that run in production — not just in notebooks.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Before you ask.",
    items: [
      {
        q: "How quickly can you start?",
        a: "Discovery usually begins within two weeks of our first conversation. For urgent incidents, our response team is available 24/7.",
      },
      {
        q: "Do you work with startups or only enterprises?",
        a: "Both. What matters is the stakes: we take on work where reliability, security and scale genuinely matter.",
      },
      {
        q: "How do you price projects?",
        a: "Discovery is fixed-price. Delivery is milestone-based with a transparent budget agreed upfront — no surprises.",
      },
      {
        q: "Can you take over an existing system?",
        a: "Yes. Around a third of our work starts with a legacy platform we audit, stabilise and then modernise.",
      },
      {
        q: "What happens after launch?",
        a: "Most clients keep us on for operations under measurable SLAs, from 24/7 monitoring to continuous improvement.",
      },
    ],
  },
};

export type Copy = typeof en;

const ar: Copy = {
  nav: ["الرئيسية", "من نحن", "خدماتنا", "مشاريعنا", "الفريق", "تواصل معنا"],
  ui: {
    getStarted: "ابدأ الآن",
    menu: "القائمة",
    switchLabel: "EN",
    switchAria: "Switch to English",
    langName: "العربية",
  },
  loader: ["تهيئة النواة", "تحميل الأنظمة", "معايرة المشهد", "تحضير القصة", "جاهز"],
  hero: {
    side: "بنية تحتية ذكية — منذ 2014",
    eyebrow: "مجموعة نوفارك — تأسست عام 2014",
    l1: "نهندس",
    l2: "مستقبل",
    l3: "البنية التحتية.",
    lead: "نصمّم ونبني ونشغّل الأنظمة الذكية التي تقف خلف البنوك والمدن والمؤسسات العالمية — بدقّةٍ هادئة لفريقٍ يتقن ذلك منذ عقد.",
    explore: "استكشف خدماتنا",
    contact: "تواصل معنا",
    scroll: "مرّر لتبدأ القصة",
    cities: "دبي · لندن · سنغافورة",
  },
  about: {
    marquee: "من نحن — قصتنا — من نحن — قصتنا —",
    chapters: [
      { k: "من نحن", t: "مجموعة هندسية واستراتيجية تبني العمود الفقري الرقمي للمؤسسات الطموحة." },
      {
        k: "قصتنا",
        t: "انطلقنا عام 2014 بأربعة مهندسين في استوديو مستأجر، واليوم نعمل في 15 دولة.",
      },
      {
        k: "مهمتنا",
        t: "نحوّل البنى التحتية المعقّدة إلى أنظمة ذكية وهادئة يثق بها الناس كل يوم.",
      },
      { k: "رؤيتنا", t: "" },
      { k: "قيمنا", t: "" },
    ],
    milestones: [
      { y: "2014", t: "التأسيس في استوديو مستأجر في دبي" },
      { y: "2017", t: "أول عقد بنية تحتية على مستوى وطني" },
      { y: "2020", t: "افتتاح مكتبَي لندن وسنغافورة" },
      { y: "2023", t: "عمليات في 15 دولة" },
      { y: "2026", t: "أكثر من 250 نظاماً قيد التشغيل" },
    ],
    missionCaption: "العمليات الميدانية — لومن فايبر",
    visionA: "عالمٌ تعمل فيه كل مؤسسة بتقنيةٍ",
    visionB: "خفيّة، صلبة، وإنسانية.",
    values: [
      { t: "الدقّة", d: "كل قرار محسوب، وكل تفصيل مقصود." },
      { t: "الصراحة", d: "نقول الحقيقة الصعبة مبكراً، كي لا تُفاجأ بشيء لاحقاً." },
      { t: "الإتقان", d: "خبراء ما زالوا يهتمّون بكيفية صناعة العمل، لا بنتيجته فقط." },
      { t: "النَّفَس الطويل", d: "نبني أنظمة تعيش أطول من موجة الضجيج القادمة." },
    ],
  },
  services: {
    t1: "خدماتنا",
    t2: "المتكاملة",
    lead: "ستة تخصصات، وفريق واحد متكامل. مرّر المؤشر للاستكشاف — يتغيّر وهج الكوكب مع كل خدمة.",
    more: "اعرف المزيد",
    items: [
      {
        name: "الاستراتيجية الرقمية",
        d: "خرائط طريق تربط الاستثمار التقني بنتائج أعمال قابلة للقياس.",
      },
      {
        name: "البنية السحابية",
        d: "منصّات مرنة وآمنة وموفّرة للتكلفة، مصمّمة للعمل على نطاق عالمي.",
      },
      {
        name: "الذكاء الاصطناعي والبيانات",
        d: "ذكاء تطبيقي، من خطوط معالجة البيانات إلى نماذج جاهزة للإنتاج.",
      },
      {
        name: "هندسة المنتجات",
        d: "منتجات ويب وتطبيقات جوّال يصمّمها ويبنيها فريق واحد من البداية للنهاية.",
      },
      {
        name: "الأمن السيبراني",
        d: "بنية «انعدام الثقة»، وتدقيق أمني، واستجابة للتهديدات على مدار الساعة.",
      },
      { name: "تصميم التجربة", d: "واجهات وهويات بصرية تجعل الأمور المعقّدة تبدو سهلة وبديهية." },
    ],
  },
  why: {
    eyebrow: "لماذا نحن",
    a: "موثوقون حيث",
    b: "الفشل",
    c: "ليس خياراً.",
    items: [
      { t: "الخبرة", d: "عقدٌ من التنفيذ لقطاعات منظَّمة وعالية المخاطر." },
      { t: "الجودة", d: "عمليات وفق معيار ISO 27001 واختبار جودة صارم لكل إصدار." },
      { t: "الابتكار", d: "مختبر داخلي يبني نماذج أولية لما هو قادم." },
      { t: "فريق محترف", d: "خبراء كبار فقط — لا نسلّم عملك للمبتدئين." },
      { t: "دعم سريع", d: "استجابة خلال أقل من 15 دقيقة، على مدار الساعة." },
      { t: "حلول مخصّصة", d: "لا شيء جاهز مسبقاً. كل شيء مبنيّ على مقاس واقعك." },
    ],
  },
  stats: {
    eyebrow: "عقدٌ بالأرقام",
    items: ["مشروع منجز", "عميل سعيد", "سنوات من الخبرة", "دولة", "خبير في فريقنا"],
  },
  projects: {
    ghost: "أعمال مختارة — أعمال مختارة",
    eyebrow: "أعمال مختارة 2023 — 2025",
    t1: "أبرز",
    t2: "مشاريعنا",
    lead: "بنية تحتية تُشغّل حياة الملايين بصمت.",
    scroll: "مرّر",
    view: "عرض المشروع",
    cursor: "عرض المشروع",
    items: [
      {
        name: "برج ميريديان",
        cat: "نظام تشغيل المباني الذكية",
        d: "نظام تشغيل موحّد لمقرّ من 62 طابقاً — الطاقة والدخول والراحة في طبقة واحدة.",
      },
      {
        name: "بنك أطلس",
        cat: "منصّة تقنية مالية",
        d: "مركز قيادة للمخاطر في الوقت الفعلي يعالج 40 مليون معاملة يومياً عبر أربع قارات.",
      },
      {
        name: "لومن فايبر",
        cat: "بنية الشبكات",
        d: "مشروع ألياف ضوئية وطني تديره خطط تنبّؤية وأتمتة ميدانية.",
      },
      {
        name: "هاربر ون",
        cat: "ذكاء لوجستي",
        d: "توأم رقمي لميناء خفّض زمن مناولة السفن بنسبة 31% في عامه الأول.",
      },
    ],
  },
  process: {
    eyebrow: "منهجية العمل",
    t1: "ست خطوات.",
    t2: "بلا مفاجآت.",
    items: [
      { t: "الاستكشاف", d: "ورش عمل وتدقيق ومقابلات لفهم المشكلة الحقيقية." },
      { t: "التخطيط", d: "بنية ومراحل وميزانية شفافة يمكنك محاسبتنا عليها." },
      { t: "التصميم", d: "أنظمة وواجهات نبني نماذجها ونختبرها مع مستخدمين حقيقيين." },
      { t: "التطوير", d: "مهندسون كبار يسلّمون دفعات أسبوعية قابلة للعرض." },
      { t: "الاختبار", d: "اختبارات آلية وأمنية واختبارات تحمّل قبل أي إطلاق." },
      { t: "التسليم", d: "إطلاق وتسليم وشراكة طويلة الأمد باتفاقيات خدمة قابلة للقياس." },
    ],
  },
  clients: { eyebrow: "موضع ثقة أكثر من 120 من روّاد القطاع" },
  testimonials: {
    eyebrow: "آراء العملاء",
    t1: "على لسان",
    t2: "عملائنا.",
    prev: "السابق",
    next: "التالي",
    show: "عرض رأي",
    items: [
      {
        name: "لينا هارتمان",
        company: "بنك أطلس",
        role: "الرئيسة التنفيذية للتقنية",
        r: "أعادت نوفارك بناء منصة المخاطر لدينا دون دقيقة توقّف واحدة. يعملون كامتدادٍ حقيقي لفريق قيادتنا.",
      },
      {
        name: "عمر الراشد",
        company: "مجموعة ميريديان",
        role: "المدير العام",
        r: "مزيج نادر من الوضوح الاستراتيجي والعمق الهندسي. المبنى اليوم يكاد يدير نفسه بنفسه.",
      },
      {
        name: "صوفيا مارين",
        company: "هاربر ون",
        role: "نائبة رئيس العمليات",
        r: "غيّر التوأم الرقمي طريقة تخطيطنا لكل يوم. أثرٌ ملموس منذ الربع الأول.",
      },
      {
        name: "دانيال أوكافور",
        company: "لومن فايبر",
        role: "رئيس البرامج",
        r: "هادئون ودقيقون وصريحون تماماً بشأن المفاضلات. الشريك الذي تريده في مشروع وطني.",
      },
    ],
  },
  team: {
    title: "فريقنا.",
    meta: "30 خبيراً · 9 جنسيات",
    cursor: "مرحباً",
    social: "الحساب الاجتماعي",
    items: [
      { name: "إيلينا نوفاك", role: "المؤسِّسة والرئيسة التنفيذية" },
      { name: "ماركوس ريد", role: "الرئيس التنفيذي للتقنية" },
      { name: "ياسمين حداد", role: "رئيسة قسم التصميم" },
      { name: "جوليان ويبر", role: "كبير المهندسين" },
    ],
  },
  cta: {
    eyebrow: "جاهزون متى كنت جاهزاً",
    l1: "لنبنِ",
    l2: "شيئاً عظيماً",
    l3: "معاً.",
    start: "ابدأ مشروعك",
    contact: "تواصل معنا",
  },
  contact: {
    eyebrow: "تواصل معنا",
    t1: "أخبرنا عمّا",
    t2: "تبنيه.",
    info: [
      { l: "العنوان", v: "الطابق 41، أبراج الإمارات، دبي، الإمارات العربية المتحدة" },
      { l: "الهاتف", v: PHONE },
      { l: "البريد الإلكتروني", v: EMAIL },
      { l: "ساعات العمل", v: "الأحد – الخميس، 09:00 – 18:00 بتوقيت الخليج" },
    ],
    form: "استفسار عن مشروع",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    company: "الشركة",
    msg: "حدّثنا عن مشروعك",
    send: "أرسل الرسالة",
    thanks: "شكراً لك — سنردّ عليك خلال 24 ساعة.",
    map: "الخريطة — 25.2175° شمالاً، 55.2826° شرقاً",
    openMaps: "افتح في الخرائط ↗",
  },
  footer: {
    about: "مجموعة هندسية واستراتيجية تبني بنية تحتية ذكية للمؤسسات الطموحة منذ عام 2014.",
    hq: "المقر الرئيسي، دبي —",
    tz: "بتوقيت الخليج",
    explore: "استكشف",
    services: "خدماتنا",
    contact: "تواصل",
    address: "الطابق 41، أبراج الإمارات، دبي",
    rights: "مجموعة نوفارك. جميع الحقوق محفوظة.",
    privacy: "الخصوصية",
    terms: "الشروط",
    cookies: "ملفات الارتباط",
    top: "العودة للأعلى",
  },
  socials: ["لينكدإن", "إكس / تويتر", "إنستغرام", "بيهانس"],
  teasers: {
    about: "اكتشف قصتنا كاملة",
    projects: "كل دراسات الحالة",
    team: "تعرّف على الفريق كاملاً",
  },
  next: { label: "الصفحة التالية", cursor: "انتقل" },
  pages: {
    about: {
      index: "01",
      eyebrow: "عن نوفارك",
      l1: "نبني ما",
      l2: "يسمّيه الآخرون",
      l3: "مستحيلاً.",
      lead: "عقدٌ من هندسة الأنظمة التي لا تحتمل البنوك والمدن والحكومات أي خطأ فيها — والأشخاص والمبادئ والأماكن التي تقف خلفها.",
      meta: ["تأسست 2014", "15 دولة", "4 مكاتب"],
      marquee: "الدقّة — الصراحة — الإتقان — النَّفَس الطويل — ",
    },
    projects: {
      index: "02",
      eyebrow: "أعمالنا",
      l1: "أعمال",
      l2: "تُشغّل العالم",
      l3: "بصمت.",
      lead: "من أبراج بـ62 طابقاً إلى شبكات ألياف وطنية — نظرة من الداخل على بنى تحتية صمّمناها وبنيناها وما زلنا نشغّلها حتى اليوم.",
      meta: ["+250 مشروعاً", "4 قارات", "صفر إطلاقات فاشلة"],
      marquee: "مبانٍ ذكية — تقنية مالية — شبكات — لوجستيات — ",
    },
    team: {
      index: "03",
      eyebrow: "فريقنا",
      l1: "العقول",
      l2: "التي تقف خلف",
      l3: "الأنظمة.",
      lead: "ثلاثون خبيراً من تسع جنسيات. لا طبقات إدارية ولا تسليم للمبتدئين — من تقابلهم هم من يبنون.",
      meta: ["30 خبيراً", "9 جنسيات", "12 سنة متوسط الخبرة"],
      marquee: "مهندسون — مصمّمون — استراتيجيون — حُرّاس — ",
    },
    contact: {
      index: "04",
      eyebrow: "تواصل معنا",
      l1: "لنبدأ",
      l2: "شيئاً",
      l3: "استثنائياً.",
      lead: "أخبرنا عن التحدي. سيردّ عليك شريك أول — لا فريق مبيعات — خلال يوم عمل واحد.",
      meta: ["ردّ خلال 24 ساعة", "4 مكاتب", "دعم على مدار الساعة"],
      marquee: "دبي — لندن — سنغافورة — الرياض — ",
    },
  },
  offices: {
    eyebrow: "حضورنا العالمي",
    title: "أربع مدن. فريق واحد.",
    open: "مفتوح الآن",
    closed: "مغلق الآن",
    hq: "المقر الرئيسي",
    hub: "مركز إقليمي",
    items: [
      { city: "دبي", country: "الإمارات العربية المتحدة", addr: "الطابق 41، أبراج الإمارات" },
      { city: "لندن", country: "المملكة المتحدة", addr: "30 سانت ماري آكس، الطابق 18" },
      { city: "سنغافورة", country: "سنغافورة", addr: "مركز مارينا باي المالي، البرج 2" },
      {
        city: "الرياض",
        country: "المملكة العربية السعودية",
        addr: "مركز الملك عبدالله المالي، البرج 2.07",
      },
    ],
  },
  cases: {
    eyebrow: "دراسات حالة",
    title: "من داخل العمل.",
    challenge: "التحدي",
    approach: "منهجيتنا",
    impact: "الأثر",
    items: [
      {
        challenge:
          "أربعة عشر نظاماً منفصلاً في المبنى، وثلاثة موردين، ولا رؤية موحّدة للطاقة أو الدخول أو الإشغال.",
        approach:
          "طبقة تشغيل واحدة توحّد كل الحسّاسات والأنظمة، مع توأم رقمي يستخدمه فريق المنشأة فعلاً كل يوم.",
        metrics: ["طابقاً موحّداً", "توفير في الطاقة", "أشهر حتى الإطلاق"],
      },
      {
        challenge: "محرّك مخاطر قديم يستغرق ساعات لرصد الاحتيال عبر أسواق بتشريعات مختلفة تماماً.",
        approach:
          "منصة مخاطر لحظية بنماذج قابلة للتفسير، أُعيد بناؤها مباشرةً دون أي توقّف للعملاء.",
        metrics: ["معاملة يومياً", "قارات", "متوسط زمن القرار"],
      },
      {
        challenge: "مشروع ألياف وطني متأخر عن جدوله، وفرق ميدانية تخطّط مساراتها على جداول بيانات.",
        approach: "تخطيط تنبّؤي للمسارات وتطبيق ميداني حوّل 400 فريق إلى عملية واحدة منسّقة.",
        metrics: ["منزل متّصل", "تسريع في التنفيذ", "فريقاً ميدانياً"],
      },
      {
        challenge: "ازدحام السفن يكلّف الملايين شهرياً، وتخطيط الأرصفة يتمّ عبر الهاتف والسبّورة.",
        approach: "توأم رقمي حيّ للميناء يحاكي كل وصول ويقترح الخطة المثلى تلقائياً.",
        metrics: ["خفض زمن المناولة", "أسرع في التخطيط", "شهراً لاسترداد الاستثمار"],
      },
    ],
  },
  departments: {
    eyebrow: "الأقسام",
    title: "كيف ننظّم أنفسنا.",
    items: ["الهندسة", "التصميم", "الأمن", "الاستراتيجية", "العمليات"],
  },
  perks: {
    eyebrow: "الحياة في نوفارك",
    title: "مصمَّمة لمن يبنون.",
    items: [
      { t: "العمل العميق أولاً", d: "أربعة أيام أسبوعياً بلا اجتماعات. وقتك ملكٌ لإتقانك." },
      {
        t: "ميزانية للتعلّم",
        d: "5,000 دولار سنوياً للدورات والمؤتمرات والكتب — دون الحاجة لموافقة.",
      },
      {
        t: "اعمل من أي مكان",
        d: "مكاتب في أربع مدن، والبيت في كل مكان آخر. ستة أسابيع سنوياً عن بُعد بالكامل.",
      },
      { t: "ملكية حقيقية", d: "كل عضو في الفريق يملك حصة. عندما تنمو نوفارك، تنمو معها." },
    ],
  },
  careers: {
    eyebrow: "الوظائف",
    title: "انضم إلى الفريق.",
    apply: "قدّم الآن",
    items: [
      {
        t: "مهندس منصّات أول",
        dept: "الهندسة",
        loc: "دبي",
        type: "دوام كامل",
        d: "صمّم وشغّل الأسس السحابية لأنظمة على مستوى وطني. ‏Kubernetes وGo ورأي واضح في قابلية المراقبة.",
      },
      {
        t: "قائد تصميم المنتجات",
        dept: "التصميم",
        loc: "لندن",
        type: "دوام كامل",
        d: "حوّل أدوات التشغيل المعقّدة إلى واجهات هادئة وجميلة يستخدمها الآلاف يومياً.",
      },
      {
        t: "مهندس معماري للأمن",
        dept: "الأمن",
        loc: "سنغافورة",
        type: "دوام كامل",
        d: "امتلك بنية «انعدام الثقة» لعملاء في قطاعات منظَّمة، من نمذجة التهديدات إلى الاستجابة للحوادث.",
      },
      {
        t: "عالم بيانات — ذكاء تطبيقي",
        dept: "الهندسة",
        loc: "عن بُعد",
        type: "عقد",
        d: "ابنِ نماذج تنبّؤ وتحسين تعمل في بيئة الإنتاج — لا في دفاتر التجارب فقط.",
      },
    ],
  },
  faq: {
    eyebrow: "أسئلة شائعة",
    title: "قبل أن تسأل.",
    items: [
      {
        q: "متى يمكنكم البدء؟",
        a: "عادةً تبدأ مرحلة الاستكشاف خلال أسبوعين من أول محادثة. وللحالات الطارئة، فريق الاستجابة متاح على مدار الساعة.",
      },
      {
        q: "هل تعملون مع الشركات الناشئة أم المؤسسات الكبرى فقط؟",
        a: "مع الاثنين. المهم هو حجم المسؤولية: نتولّى الأعمال التي تهمّ فيها الموثوقية والأمان والتوسّع فعلاً.",
      },
      {
        q: "كيف تسعّرون المشاريع؟",
        a: "مرحلة الاستكشاف بسعر ثابت. والتنفيذ على مراحل بميزانية شفافة متّفق عليها مسبقاً — بلا مفاجآت.",
      },
      {
        q: "هل يمكنكم استلام نظام قائم؟",
        a: "نعم. نحو ثلث أعمالنا يبدأ بمنصة قديمة ندقّقها ونثبّتها ثم نحدّثها.",
      },
      {
        q: "ماذا يحدث بعد الإطلاق؟",
        a: "معظم عملائنا يستمرّون معنا في التشغيل باتفاقيات خدمة قابلة للقياس، من المراقبة الدائمة إلى التحسين المستمر.",
      },
    ],
  },
};

export const copy: Record<Lang, Copy> = { en, ar };
