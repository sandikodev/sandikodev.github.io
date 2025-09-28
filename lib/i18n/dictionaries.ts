import { locales, type Locale } from "./locales"

type Dict = {
  locales: { code: string; label: string }[]
  nav: {
    brand: string
    home: string
    about: string
    projects: string
    vision: string
    contact: string
  }
  hero: {
    title: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    founderTitle: string
    kpiExperience: string
    kpiUptime: string
    kpiProjects: string
    kpiA11y: string
  }
  projects: {
    heading: string
    subheading: string
    categories: {
      all: string
      web: string
      systems: string
      plugins: string
      writing: string
    }
  }
  contact: {
    heading: string
    subheading: string
    nameLabel: string
    emailLabel: string
    messageLabel: string
    submit: string
    submitting: string
    invalidEmailTitle: string
    invalidEmailDesc: string
    mailOpeningTitle: string
    mailOpeningDesc: string
  }
}

const baseLocales = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "ja", label: "日本語" },
]

const dicts: Record<Locale, Dict> = {
  id: {
    locales: baseLocales,
    nav: {
      brand: "Sandikodev",
      home: "Beranda",
      about: "Tentang",
      projects: "Proyek",
      vision: "Visi",
      contact: "Kontak",
    },
    hero: {
      title: "Membangun antarmuka yang tangguh dan berakses.",
      description:
        "Solusi perangkat lunak, jaringan, dan keamanan siber untuk kebutuhan B2B. Fokus pada performa, aksesibilitas, dan detail mikro yang menyenangkan.",
      ctaPrimary: "Ajukan Proyek",
      ctaSecondary: "Lihat Proyek",
      founderTitle: "Founder • Koneksi Jaringan Indonesia",
      kpiExperience: "Tahun pengalaman",
      kpiUptime: "Uptime proyek",
      kpiProjects: "Proyek terpilih",
      kpiA11y: "Fokus aksesibilitas",
    },
    projects: {
      heading: "Proyek B2B Terpilih",
      subheading: "Filter proyek berdasarkan kategori. Semua gambar adalah placeholder.",
      categories: { all: "Semua", web: "Web", systems: "Sistem", plugins: "Plugin", writing: "Tulisan" },
    },
    contact: {
      heading: "Kontak",
      subheading: "Kirim pesan langsung melalui email. Semua kolom wajib diisi.",
      nameLabel: "Nama",
      emailLabel: "Email",
      messageLabel: "Pesan",
      submit: "Ajukan Proyek",
      submitting: "Mengirim...",
      invalidEmailTitle: "Email tidak valid",
      invalidEmailDesc: "Mohon masukkan alamat email yang benar.",
      mailOpeningTitle: "Membuka aplikasi email…",
      mailOpeningDesc: "Draf pesan Anda sedang disiapkan.",
    },
  },
  en: {
    locales: baseLocales,
    nav: {
      brand: "Sandikodev",
      home: "Home",
      about: "About",
      projects: "Projects",
      vision: "Vision",
      contact: "Contact",
    },
    hero: {
      title: "Building resilient, accessible interfaces.",
      description:
        "Software, networking, and cybersecurity solutions for B2B needs. Focused on performance, accessibility, and delightful micro‑details.",
      ctaPrimary: "Start a Project",
      ctaSecondary: "View Projects",
      founderTitle: "Founder • Koneksi Jaringan Indonesia",
      kpiExperience: "Years of experience",
      kpiUptime: "Project uptime",
      kpiProjects: "Selected projects",
      kpiA11y: "Accessibility focus",
    },
    projects: {
      heading: "Selected B2B Projects",
      subheading: "Filter projects by category. All images are placeholders.",
      categories: { all: "All", web: "Web", systems: "Systems", plugins: "Plugins", writing: "Writing" },
    },
    contact: {
      heading: "Contact",
      subheading: "Send a message via email. All fields are required.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Start a Project",
      submitting: "Sending...",
      invalidEmailTitle: "Invalid email",
      invalidEmailDesc: "Please enter a valid email address.",
      mailOpeningTitle: "Opening email app…",
      mailOpeningDesc: "Preparing your message draft.",
    },
  },
  de: {
    locales: baseLocales,
    nav: {
      brand: "Sandikodev",
      home: "Start",
      about: "Über mich",
      projects: "Projekte",
      vision: "Vision",
      contact: "Kontakt",
    },
    hero: {
      title: "Robuste, barrierefreie Interfaces entwickeln.",
      description:
        "Software-, Netzwerk- und Cybersicherheitslösungen für B2B. Fokus auf Performance, Barrierefreiheit und liebevolle Details.",
      ctaPrimary: "Projekt anfragen",
      ctaSecondary: "Projekte ansehen",
      founderTitle: "Gründer • Koneksi Jaringan Indonesia",
      kpiExperience: "Jahre Erfahrung",
      kpiUptime: "Projekt‑Uptime",
      kpiProjects: "Ausgewählte Projekte",
      kpiA11y: "Barrierefreiheit im Fokus",
    },
    projects: {
      heading: "Ausgewählte B2B‑Projekte",
      subheading: "Projekte nach Kategorien filtern. Alle Bilder sind Platzhalter.",
      categories: { all: "Alle", web: "Web", systems: "Systeme", plugins: "Plugins", writing: "Schreiben" },
    },
    contact: {
      heading: "Kontakt",
      subheading: "Senden Sie eine E‑Mail. Alle Felder sind erforderlich.",
      nameLabel: "Name",
      emailLabel: "E‑Mail",
      messageLabel: "Nachricht",
      submit: "Projekt anfragen",
      submitting: "Senden...",
      invalidEmailTitle: "Ungültige E‑Mail",
      invalidEmailDesc: "Bitte geben Sie eine gültige E‑Mail‑Adresse ein.",
      mailOpeningTitle: "E‑Mail‑App wird geöffnet…",
      mailOpeningDesc: "Ihre Nachricht wird vorbereitet.",
    },
  },
  ja: {
    locales: baseLocales,
    nav: {
      brand: "Sandikodev",
      home: "ホーム",
      about: "概要",
      projects: "プロジェクト",
      vision: "ビジョン",
      contact: "お問い合わせ",
    },
    hero: {
      title: "堅牢でアクセシブルな UI を構築します。",
      description:
        "B2B 向けのソフトウェア、ネットワーク、サイバーセキュリティのソリューション。性能・アクセシビリティ・心地よいマイクロインタラクションに注力。",
      ctaPrimary: "プロジェクト相談",
      ctaSecondary: "実績を見る",
      founderTitle: "創業者 • Koneksi Jaringan Indonesia",
      kpiExperience: "実務年数",
      kpiUptime: "稼働率",
      kpiProjects: "選定プロジェクト",
      kpiA11y: "アクセシビリティ重視",
    },
    projects: {
      heading: "選定された B2B プロジェクト",
      subheading: "カテゴリで絞り込み。画像はすべてプレースホルダーです。",
      categories: { all: "すべて", web: "Web", systems: "システム", plugins: "プラグイン", writing: "執筆" },
    },
    contact: {
      heading: "お問い合わせ",
      subheading: "メールでご連絡ください。全項目必須です。",
      nameLabel: "お名前",
      emailLabel: "メール",
      messageLabel: "メッセージ",
      submit: "プロジェクト相談",
      submitting: "送信中...",
      invalidEmailTitle: "無効なメール",
      invalidEmailDesc: "正しいメールアドレスを入力してください。",
      mailOpeningTitle: "メールアプリを開いています…",
      mailOpeningDesc: "メッセージの下書きを準備しています。",
    },
  },
}

export async function getDictionary(locale: Locale): Promise<Dict> {
  const l = locales.includes(locale) ? locale : "id"
  return dicts[l]
}

export type { Dict }
export type { Locale } from "./locales"
