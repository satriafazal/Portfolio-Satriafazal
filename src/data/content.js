// ============================================================
//  SEMUA KONTEN WEBSITE ADA DI FILE INI.
//  Untuk update: ubah teks/ID proyek di sini, lalu rebuild.
//  Setiap teks punya versi Indonesia (id) dan English (en).
// ============================================================

// ---------- Placeholder SVG (dipakai kalau gambar internet gagal load) ----------
export function placeholderSvg(label = "Image", w = 1200, h = 800, dark = false) {
  const bg = dark ? "#1c1c22" : "#e8e5de";
  const fg = dark ? "#8a8a94" : "#6b675e";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="${w}" height="${h}" fill="${bg}"/>
<g fill="none" stroke="${fg}" stroke-width="2" opacity="0.35">
<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) / 4}"/>
<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) / 6}"/>
</g>
<text x="50%" y="50%" fill="${fg}" font-family="Georgia, serif" font-size="${Math.round(
    w / 16
  )}" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ---------- Identitas utama ----------
export const profile = {
  firstName: "Satria",
  lastName: "Faza Lutfian",
  role: { id: "Creative Technologist", en: "Creative Technologist" },
  tagline: {
    id: "Ideas meet systems. Products come to life.",
    en: "Ideas meet systems. Products come to life.",
  },
  identity: {
    id: "Mahasiswa Sistem Informasi · Telkom University · Jakarta",
    en: "Information Systems Student · Telkom University · Jakarta Campus",
  },
};

import profilePrimary from "../public/BWP.png";
import profileAlternate from "../public/Profile.png";
import projectEfurniture from "../public/efurniture.png";

// ---------- Gambar hero ----------
export const heroImages = {
  primary: profilePrimary,
  alternate: profileAlternate,
};

// ---------- Sosial media (GitHub, LinkedIn, Instagram) ----------
export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/satriafazal/",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/satriafazal",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/satriafzl_?cplk=MW85ZmJhaGFlY2Z3eg==",
    icon: "instagram",
  },
];

// ---------- 2. About ----------
export const about = {
  label: { id: "Tentang Saya", en: "About" },
  title: {
    id: "Di titik temu kebutuhan, desain, dan teknologi.",
    en: "At the intersection of needs, design, and technology.",
  },
  paragraphs: {
    id: [
      "Saya menikmati proses memahami masalah, merancang solusi, dan membangun aplikasi. Dalam proyek-proyek akademik, saya terlibat dalam berbagai tahap pengembangan produk digital, mulai dari analisis kebutuhan dan perancangan UI/UX hingga implementasi, integrasi, dan pengujian.",
      "Saya tertarik pada titik temu antara kebutuhan pengguna, proses bisnis, desain, dan teknologi. Bagi saya, sebuah aplikasi bukan hanya tentang kode, tetapi juga tentang bagaimana sistem bekerja dan seberapa baik solusi tersebut menjawab kebutuhan.",
    ],
    en: [
      "I enjoy understanding problems, designing solutions, and building applications. Through academic projects, I have been involved in different stages of digital product development, from requirements analysis and UI/UX design to implementation, integration, and testing.",
      "I am interested in the intersection of user needs, business processes, design, and technology. To me, an application is not just about code, but also about how the system works and how effectively it addresses real needs.",
    ],
  },
};

// ---------- 3. How I work ----------
export const processSteps = [
  {
    num: "01",
    title: { id: "Discover", en: "Discover" },
    subtitle: { id: "Memahami", en: "Understand" },
    desc: {
      id: "Mengidentifikasi kebutuhan, memahami masalah, menganalisis proses bisnis, dan merancang alur sistem.",
      en: "Identify needs, understand the problem, analyze business processes, and design the system flow.",
    },
    tags: { id: "Requirements · Analisis Masalah · Alur Sistem", en: "Requirements · Problem analysis · System flow" },
  },
  {
    num: "02",
    title: { id: "Design", en: "Design" },
    subtitle: { id: "Merancang", en: "Design" },
    desc: {
      id: "Menyusun struktur antarmuka, wireframe, pengalaman pengguna, dan alur interaksi.",
      en: "Structure the interface, wireframes, user experience, and interaction flows.",
    },
    tags: { id: "UI/UX · Wireframe · Alur Pengguna", en: "UI/UX · Wireframing · User flow" },
  },
  {
    num: "03",
    title: { id: "Build", en: "Build" },
    subtitle: { id: "Membangun", en: "Build" },
    desc: {
      id: "Mengimplementasikan antarmuka, backend, API, database, logika bisnis, dan integrasi sesuai kebutuhan proyek.",
      en: "Implement the interface, backend, API, database, business logic, and integrations as each project requires.",
    },
    tags: { id: "Frontend · Backend · API · Database", en: "Frontend · Backend · API · Database" },
  },
  {
    num: "04",
    title: { id: "Refine", en: "Refine" },
    subtitle: { id: "Menyempurnakan", en: "Refine" },
    desc: {
      id: "Menguji fitur, menelusuri bug, memvalidasi hasil implementasi, dan memperbaiki masalah integrasi.",
      en: "Test features, trace bugs, validate the implementation, and fix integration issues.",
    },
    tags: { id: "Testing · Debugging · Integrasi", en: "Testing · Debugging · Integration" },
  },
];

// ---------- 4. Skills ----------
export const skillGroups = [
  {
    title: { id: "System Analysis & Requirements", en: "System Analysis & Requirements" },
    sub: { id: "Analisis sistem dan kebutuhan", en: "System and requirements analysis" },
    items: {
      id: ["Analisis kebutuhan aplikasi", "Pemetaan proses bisnis dan alur sistem", "Perancangan fitur dan aturan bisnis", "Penyusunan dokumentasi proyek"],
      en: ["Application requirements analysis", "Business process and system flow mapping", "Feature and business rule design", "Project documentation"],
    },
  },
  {
    title: { id: "UI/UX & Frontend Development", en: "UI/UX & Frontend Development" },
    sub: { id: "Perancangan antarmuka dan pengembangan frontend", en: "Interface design and frontend development" },
    items: {
      id: ["Wireframe dan perancangan UI/UX", "Implementasi halaman dan komponen antarmuka", "Interaksi pengguna dan visualisasi data", "Integrasi frontend dengan API"],
      en: ["Wireframing and UI/UX design", "Page and interface component implementation", "User interaction and data visualization", "Frontend–API integration"],
    },
  },
  {
    title: { id: "Backend & System Integration", en: "Backend & System Integration" },
    sub: { id: "Pengembangan backend dan integrasi sistem", en: "Backend development and system integration" },
    items: {
      id: ["REST API dan routing layanan", "Database dan pengolahan data", "Autentikasi dan otorisasi", "Integrasi microservices dan komunikasi antarlayanan"],
      en: ["REST APIs and service routing", "Database and data processing", "Authentication and authorization", "Microservices integration and inter-service communication"],
    },
  },
  {
    title: { id: "Testing & Problem Solving", en: "Testing & Problem Solving" },
    sub: { id: "Pengujian dan pemecahan masalah", en: "Testing and problem solving" },
    items: {
      id: ["Pengujian fungsional", "Debugging", "Validasi alur dan integrasi", "Evaluasi hasil implementasi"],
      en: ["Functional testing", "Debugging", "Flow and integration validation", "Implementation review"],
    },
  },
];

export const techGroups = [
  { title: { id: "Bahasa & Web", en: "Languages & Web" }, items: ["JavaScript", "PHP", "Python", "HTML/CSS"] },
  { title: { id: "Framework & Runtime", en: "Frameworks & Runtime" }, items: ["Laravel", "Express.js", "React", "Vite"] },
  { title: { id: "Database & Komunikasi", en: "Database & Communication" }, items: ["MySQL", "PostgreSQL", "REST API", "gRPC", "Protocol Buffers", "Socket.IO"] },
  { title: { id: "Tools & Pendukung", en: "Tools & Supporting" }, items: ["GitHub", "Jira", "VS Code", "JWT"] },
];

// ---------- 5. Projects (PLACEHOLDER gambar dari internet) ----------
export const projects = [
  {
    num: "01",
    title: "Dashboard OBE",
    kind: {
      id: "Analitik Akademik · Aplikasi Web",
      en: "Academic Analytics · Web Application",
    },
    status: { id: "Testing / UAT", en: "Testing / UAT" },
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    desc: {
      id: "Aplikasi untuk memantau ketercapaian Course Learning Outcomes (CLO) dan Program Learning Outcomes (PLO), dengan dashboard analitik dan dukungan pelaporan akademik.",
      en: "An academic analytics application for monitoring CLO and PLO attainment through dashboards, detailed results, and academic reporting.",
    },
    contributions: {
      id: [
        "Analisis kebutuhan dan proses bisnis",
        "Perancangan UI/UX dan wireframe",
        "Pengembangan frontend, backend, API, dan database",
        "Logika perhitungan CLO/PLO",
        "Testing, debugging, UAT, dan dokumentasi",
      ],
      en: [
        "Requirements and business process analysis",
        "UI/UX design and wireframing",
        "Frontend, backend, API, and database development",
        "CLO/PLO calculation logic",
        "Testing, debugging, UAT, and documentation",
      ],
    },
  },
  {
    num: "02",
    title: "SmartServiceku",
    kind: {
      id: "Microservices · Aplikasi Layanan",
      en: "Microservices · Service Application",
    },
    status: { id: "Proyek Akademik Selesai", en: "Completed Academic Project" },
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    desc: {
      id: "Aplikasi layanan perbaikan perangkat dengan layanan terpisah untuk pemesanan, pembayaran, autentikasi, dan komunikasi real-time.",
      en: "A device repair service application built around separate services for orders, payments, authentication, and real-time communication.",
    },
    contributions: {
      id: [
        "Pengembangan API Gateway dan routing layanan",
        "Implementasi Chat Service dan komunikasi real-time",
        "Integrasi gRPC dan Protocol Buffers",
        "Pekerjaan frontend, backend/API, autentikasi JWT, dan database",
      ],
      en: [
        "API Gateway development and service routing",
        "Chat Service implementation and real-time communication",
        "gRPC and Protocol Buffers integration",
        "Frontend, backend/API, JWT authentication, and database work",
      ],
    },
  },
  {
    num: "03",
    title: "WattCare",
    kind: {
      id: "Pemantauan Energi · Visualisasi Data",
      en: "Energy Monitoring · Data Visualization",
    },
    status: { id: "Proyek Akademik Selesai", en: "Completed Academic Project" },
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    desc: {
      id: "Aplikasi pemantauan konsumsi energi yang membantu pengguna melihat penggunaan listrik, riwayat konsumsi, dan estimasi biaya.",
      en: "An energy-monitoring application designed to help users explore electricity consumption, usage history, and estimated energy costs.",
    },
    contributions: {
      id: [
        "Analisis kebutuhan dan UI/UX",
        "Pengembangan frontend dan backend/API",
        "Dashboard, grafik, dan riwayat konsumsi",
        "Perhitungan kWh dan estimasi biaya",
        "Pengelolaan perangkat dan fitur rekomendasi penghematan",
      ],
      en: [
        "Requirements analysis and UI/UX",
        "Frontend and backend/API development",
        "Dashboard, charts, and consumption history",
        "kWh calculation and cost estimation",
        "Device management and energy-saving recommendations",
      ],
    },
  },
  {
    num: "04",
    title: "E-Furniture",
    kind: {
      id: "E-commerce · Manajemen Pesanan",
      en: "E-commerce · Order Management",
    },
    status: { id: "Proyek Akademik Selesai", en: "Completed Academic Project" },
    img: projectEfurniture,
    desc: {
      id: "Aplikasi e-commerce furnitur dengan alur belanja dari penjelajahan produk hingga checkout, serta fitur pengelolaan produk dan pesanan.",
      en: "A furniture e-commerce application covering product discovery, shopping, checkout, and administrative product and order management.",
    },
    contributions: {
      id: [
        "Katalog dan detail produk, pencarian, serta filter",
        "Registrasi, login, keranjang, dan checkout",
        "Konfirmasi pembayaran dan riwayat/status pesanan",
        "Pengelolaan produk, pesanan, dan dashboard admin",
        "Estimasi kustomisasi/produksi dan notifikasi pesanan",
      ],
      en: [
        "Product catalog and details, search, and filtering",
        "Registration, login, cart, and checkout",
        "Payment confirmation and order history/status",
        "Product, order management, and admin dashboard",
        "Customization/production estimates and order notifications",
      ],
    },
  },
];

// ---------- 6. Experience ----------
export const experience = {
  label: { id: "Pengalaman", en: "Experience" },
  title: { id: "Kontribusi di luar kelas.", en: "Contributions beyond coursework." },
  items: [
    {
      role: { id: "Asisten Praktikum", en: "Practicum Assistant" },
      org: "Telkom University",
      period: { id: "2025–2026", en: "2025–2026" },
      desc: {
        id: "Mendukung kegiatan praktikum di bidang Sistem Operasi, Pengembangan Aplikasi Web, dan Jaringan Komputer. Periode tercatat: Februari–Juni 2025 (Jaringan Komputer) dan September 2025–Januari 2026 (Sistem Operasi & Pengembangan Aplikasi Web).",
        en: "Supported practical learning activities in Operating Systems, Web Application Development, and Computer Networking. Recorded periods: February–June 2025 (Computer Networking) and September 2025–January 2026 (Operating Systems & Web Application Development).",
      },
    },
    {
      role: {
        id: "Staf Informasi, Publikasi & Kreatif — DPM",
        en: "Information, Publication & Creative Staff — DPM",
      },
      org: "DPM",
      period: { id: "Desember 2025–sekarang", en: "December 2025–present" },
      desc: {
        id: "Membuat konten digital kreatif, termasuk Reels, serta mendukung kebutuhan publikasi dan komunikasi visual organisasi.",
        en: "Create digital content, including Reels, and support organizational publication and visual communication needs.",
      },
    },
  ],
};

// ---------- 7. Education ----------
export const education = {
  label: { id: "Pendidikan", en: "Education" },
  title: { id: "Perjalanan belajar.", en: "The learning journey." },
  items: [
    {
      school: "Telkom University — Jakarta Campus",
      degree: {
        id: "S1 Sistem Informasi",
        en: "Bachelor's Degree in Information Systems",
      },
      period: { id: "September 2023–sekarang", en: "September 2023–present" },
    },
    {
      school: "SMK Telkom Sandhy Putra Jakarta",
      degree: {
        id: "Teknik Komputer dan Jaringan",
        en: "Computer and Network Engineering",
      },
      period: { id: "Juli 2019–Juni 2022", en: "July 2019–June 2022" },
    },
  ],
  certification: {
    name: {
      id: "BNSP — Sertifikasi Kompetensi Level III",
      en: "BNSP — Level III Competency Certification",
    },
    detail: {
      id: "Implementasi Jaringan Komputer",
      en: "Computer Network Implementation",
    },
  },
};

// ---------- 8. Strengths ----------
export const strengths = [
  {
    title: { id: "Curiosity", en: "Curiosity" },
    desc: {
      id: "Senang mengeksplorasi teknologi dan memahami cara kerja aplikasi.",
      en: "Enjoys exploring technology and understanding how applications work.",
    },
  },
  {
    title: { id: "Problem Solving", en: "Problem Solving" },
    desc: {
      id: "Menikmati proses menemukan masalah dan mencari solusinya.",
      en: "Enjoys the process of finding problems and searching for solutions.",
    },
  },
  {
    title: { id: "Cross-functional Thinking", en: "Cross-functional Thinking" },
    desc: {
      id: "Menghubungkan kebutuhan, desain, dan implementasi teknis.",
      en: "Connects needs, design, and technical implementation.",
    },
  },
  {
    title: { id: "Hands-on Building", en: "Hands-on Building" },
    desc: {
      id: "Senang membangun fitur, menguji hasilnya, dan memperbaiki masalah.",
      en: "Enjoys building features, testing results, and fixing issues.",
    },
  },
];

// ---------- 9. Contact (PLACEHOLDER — ganti dengan kontak asli) ----------
export const contact = {
  label: { id: "Kontak", en: "Contact" },
  title: {
    id: "Terbuka untuk kolaborasi dan kesempatan baru.",
    en: "Open to collaboration and new opportunities.",
  },
  statement: {
    id: "Terbuka untuk kesempatan magang, pekerjaan awal karier, kolaborasi proyek, freelance, dan bertukar ide dengan komunitas teknologi.",
    en: "Open to internship and early-career opportunities, full-time roles, freelance projects, collaborations, and connecting with technology communities.",
  },
  email: "Satriafaza24@gmail.com",
  links: [
    { name: "GitHub", href: "https://github.com/satriafazal/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/satriafazal" },
    { name: "Instagram", href: "https://www.instagram.com/satriafzl_?cplk=MW85ZmJhaGFlY2Z3eg==" },
  ],
};
