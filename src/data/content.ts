import type {
  ExperienceItem,
  NavItem,
  Project,
  Service,
  StatItem,
  Testimonial,
  Tool,
} from "../types";

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "Tentang" },
  { id: "experience", label: "Experience" },
  { id: "tools", label: "Skill & Tools" },
  { id: "work", label: "Karya" },
  { id: "certificates", label: "Sertifikasi" },
  { id: "services", label: "Layanan" },
  { id: "testimonials", label: "Testimoni" },
  { id: "contact", label: "Kontak" },
];

export const CONTACT_EMAIL = "meimaulidta0105@gmail.com";

export const SOCIALS = {
  instagram: "https://www.instagram.com/meiiimr",
  tiktok: "https://www.tiktok.com/@haloomeiii",
  linkedin: "https://id.linkedin.com/in/meimaulidta",
};

export const STATS: StatItem[] = [
  { value: 2, label: "Tahun pengalaman" },
  { value: 3, label: "Brand partner" },
  { value: 2, label: "Projects" },
  { value: 4, label: "Certificate completion" },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    category: "Organisasi mahasiswa",
    title: "Himpunan Mahasiswa Pendidikan Bisnis",
    detail: "Departemen P3M (Pendidikan, Penelitian dan Prestasi Mahasiswa)",
    period: "2024 — 2025",
    variant: "organization",
  },
  {
    category: "Beasiswa",
    title: "Beasiswa Pemuda Tangguh",
    detail: "Pemerintah Kota Surabaya",
    period: "2022 — 2026",
    variant: "scholarship",
  },
];

export const TOOLS: Tool[] = [
  {
    name: "Canva",
    description: "Desain visual & presentasi",
    image: "assets/skill-tools/canva.jpg",
    variant: "canva",
  },
  {
    name: "CapCut",
    description: "Editing video pendek",
    image: "assets/skill-tools/capcut.jpg",
    variant: "capcut",
  },
  {
    name: "VN",
    description: "Video editing di ponsel",
    image: "assets/skill-tools/vn.jpg",
    variant: "vn",
  },
  {
    name: "Word",
    description: "Dokumen & penulisan",
    image: "assets/skill-tools/word.jpg",
    variant: "word",
  },
  {
    name: "Excel",
    description: "Data & spreadsheet",
    image: "assets/skill-tools/excel.jpg",
    variant: "excel",
  },
  {
    name: "PowerPoint",
    description: "Presentasi yang menarik",
    image: "assets/skill-tools/powerpoint.jpg",
    variant: "powerpoint",
  },
  {
    name: "Worksheet",
    description: "Lembar kerja & aktivitas",
    icon: "worksheet",
    variant: "worksheet",
  },
  {
    name: "FilmoraGo",
    description: "Editing video & efek",
    image: "assets/skill-tools/filmorago.jpg",
    variant: "filmora",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Dsavior Brand",
    description: "Project Landing Page Catalog",
    image: "assets/projects/project1.png",
    alt: "Mockup halaman katalog D'Savior Body Serum",
    width: 1000,
    height: 571,
    year: "2026",
    tag: "Project",
    links: [
      {
        label: "Kunjungi Project",
        href: "https://meimaulidta.github.io/dsavior",
      },
    ],
  },
  {
    title: "Cherrybeads7",
    description: "Visual profil dan katalog produk handmade",
    image: "assets/projects/project2.png",
    alt: "Mockup profil media sosial dan katalog produk handmade Cherrybeads7",
    width: 1000,
    height: 667,
    year: "2024",
    tag: "Project",
    links: [
      {
        label: "Kunjungi Project",
        href: "https://www.tiktok.com/@cherrybeads7?_r=1&_t=ZS-9B4ZqaIUYxJ",
      },
    ],
  },
  {
    title: "Konten Video DSavior",
    description: "Konten TikTok bertema produk perawatan kulit",
    image: "assets/projects/project3.png",
    alt: "Mockup konten video TikTok untuk produk perawatan kulit",
    width: 1000,
    height: 667,
    year: "2024",
    tag: "Project",
    links: [
      {
        label: "Kunjungi Project 1",
        href: "https://www.tiktok.com/@for.beautycare?_r=1&_t=ZS-9B4Ziw3Kktw",
      },
      {
        label: "Kunjungi Project 2",
        href: "https://www.tiktok.com/@dsavior.bodyoil?_r=1&_t=ZS-9B4Zkfz8n7R",
      },
    ],
  },
  {
    title: "Konten PLP UNESA",
    description: "Konten dan dokumentasi kegiatan organisasi di TikTok",
    image: "assets/projects/project4.png",
    alt: "Mockup profil TikTok PLP UNESA dengan dokumentasi dan konten kegiatan",
    width: 933,
    height: 1400,
    year: "2025",
    tag: "Project",
    links: [
      {
        label: "Kunjungi Project",
        href: "https://www.tiktok.com/@plpunesa_smectra?_r=1&_t=ZS-9B4Ze5dl54n",
      },
    ],
  },
  {
    title: "AN-NAMIROH Travelindo Juanda",
    description:
      "Konten kreator perusahaan travel AN-NAMIROH Juanda, masa kerja September - November 2026",
    image: "assets/projects/project5.png",
    alt: "Konten kreator untuk AN-NAMIROH Travelindo Juanda",
    width: 1536,
    height: 1024,
    year: "2026",
    tag: "Project",
    links: [
      {
        label: "Kunjungi Project",
        href: "https://www.tiktok.com/@annamirohpusatsidoarjo?_r=1&_t=ZS-9BavdAOziz7",
      },
    ],
  },
];

export const CERTIFICATES: Project[] = [
  {
    title: "Certificate Workshop Videography",
    description: "Workshop completion certificate",
    image: "assets/certificate/sertif1.jpeg",
    alt: "Sertifikat Workshop Videography",
    width: 1200,
    height: 800,
    year: "2024",
    tag: "Certificate",
    parallax: 6,
    links: [
      {
        label: "Download",
        href: "assets/certificate/sertif1.jpeg",
        download: "certificate-workshop-videography.jpeg",
      },
    ],
  },
  {
    title: "Certificate LKMM-TD",
    description: "Workshop completion certificate",
    image: "assets/certificate/sertif2.jpeg",
    alt: "Sertifikat LKMM-TD",
    width: 1200,
    height: 1800,
    year: "2024",
    tag: "Certificate",
    parallax: 6,
    links: [
      {
        label: "Download",
        href: "assets/certificate/sertif2.jpeg",
        download: "certificate-lkmm-td.jpeg",
      },
    ],
  },
  {
    title: "Certificate Google Ads",
    description: "Workshop completion certificate",
    image: "assets/certificate/sertif3.jpeg",
    alt: "Sertifikat Google Ads",
    width: 1200,
    height: 1800,
    year: "2026",
    tag: "Certificate",
    parallax: 6,
    links: [
      {
        label: "Download",
        href: "assets/certificate/sertif3.jpeg",
        download: "certificate-google-ads.jpeg",
      },
    ],
  },
  {
    title: "Certificate Creating Marketing Camp",
    description: "Workshop completion certificate",
    image: "assets/certificate/sertif4.jpeg",
    alt: "Sertifikat Creating Marketing Camp",
    width: 1200,
    height: 1800,
    year: "2026",
    tag: "Certificate",
    parallax: 6,
    links: [
      {
        label: "Download",
        href: "assets/certificate/sertif4.jpeg",
        download: "certificate-creating-marketing-camp.jpeg",
      },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    title: "Content creation",
    description:
      "Foto, video pendek, dan copywriting yang menarik. Membuat konten harian yang konsisten dan lebih hidup.",
    tags: ["Short video", "Copywriting", "Photo direction"],
    icon: "image",
  },
  {
    title: "Digital marketing",
    description:
      "Strategi marketing, riset audiens, dan campaign berbayar yang fokus ke tujuan.",
    tags: ["Funnel", "Analytics"],
    icon: "chart",
  },
  {
    title: "Social media",
    description:
      "Kelola akun, bangun komunitas, dan memasarkan brand ke kalangan luas.",
    tags: ["Content plan", "Community", "Reporting"],
    icon: "chat",
  },
  {
    title: "Brand campaign",
    description:
      "Konsep branding dari insight sampai eksekusi. Satu cerita besar yang turun jadi konten kecil yang saling nyambung.",
    tags: ["Big idea", "Launch", "Art direction"],
    icon: "star",
    accent: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Konten yang dibuat sangat menarik dan disesuaikan dengan target audiens meski hanya dengan cara soft selling tetapi mei menyesuaikan dengan market serta trend dan berusaha untuk menaikkan engagement dari brand produk dan juga menaikkan level dari brand D'savior",
    name: "Sagita ika",
    role: "Owner brand D'savior",
    initials: "SI",
  },
  {
    quote:
      "Video yang dibuat tidak hanya menggunakan trend tetapi berusaha menaikkan engagement produk dari sebuah brand",
    name: "Reyhan Haqiqi",
    role: "Partner",
    initials: "RH",
  },
  {
    quote:
      "Content yang dibuat tidak hanya tentang trend tetapi juga menjelaskan produk jadi waktu itu penonton juga mengirimkan content yang mei buat kemudian menanyakan harga dari produk tersebut, terima kasih mei",
    name: "Aisyah",
    role: "Coordinator, keuangan An namiroh Travel",
    initials: "A",
  },
];
