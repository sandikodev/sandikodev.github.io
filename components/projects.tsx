import ProjectCard from "./project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Project = {
  title: string
  description: string
  imageAlt: string
  imageUrl: string
  github?: string
  demo?: string
  category: "web" | "systems" | "plugins" | "writing"
}

type ProjectsI18n = {
  heading?: string
  subheading?: string
  categories?: {
    all: string
    web: string
    systems: string
    plugins: string
    writing: string
  }
}

const projects: Project[] = [
  {
    title: "SMM Panel",
    description: "Panel layanan media sosial dengan otomasi & pengelolaan pesanan.",
    imageAlt: "SMM Panel",
    imageUrl: "/smm-panel-dashboard.jpg",
    github: "https://github.com/sandikodev",
    demo: "#",
    category: "web",
  },
  {
    title: "Sistem Akademik",
    description: "Sistem informasi akademik: manajemen siswa, nilai, dan kurikulum.",
    imageAlt: "Sistem Akademik",
    imageUrl: "/sistem-akademik.jpg",
    github: "https://github.com/sandikodev",
    demo: "#",
    category: "systems",
  },
  {
    title: "Sistem Akademik Lite",
    description: "Versi ringan untuk kebutuhan sekolah kecil/menengah.",
    imageAlt: "Sistem Akademik Lite",
    imageUrl: "/sistem-akademik-lite.jpg",
    github: "https://github.com/sandikodev",
    demo: "#",
    category: "web",
  },
  {
    title: "Game Typing (kode)",
    description: "Permainan ala monkeytype dengan fitur latihan menulis kode.",
    imageAlt: "Game Typing",
    imageUrl: "/game-typing-code.jpg",
    github: "https://github.com/sandikodev",
    demo: "#",
    category: "plugins",
  },
  {
    title: "Sistem Arsip Desa",
    description: "Pengarsipan dokumen desa yang aman dan mudah dicari.",
    imageAlt: "Sistem Arsip Desa",
    imageUrl: "/sistem-arsip-desa.jpg",
    github: "https://github.com/sandikodev",
    demo: "#",
    category: "systems",
  },
  {
    title: "Command Center Desa",
    description: "Pusat kendali data desa dengan dashboard dan monitoring.",
    imageAlt: "Command Center Desa",
    imageUrl: "/command-center-desa.jpg",
    github: "https://github.com/sandikodev",
    demo: "#",
    category: "systems",
  },
]

export default function Projects({ t = {} as ProjectsI18n }: { t?: ProjectsI18n }) {
  const categoryLabels = {
    all: t.categories?.all ?? "Semua",
    web: t.categories?.web ?? "Web",
    systems: t.categories?.systems ?? "Sistem",
    plugins: t.categories?.plugins ?? "Plugin",
    writing: t.categories?.writing ?? "Tulisan",
  }

  const categories = [
    { value: "all", label: categoryLabels.all },
    { value: "web", label: categoryLabels.web },
    { value: "systems", label: categoryLabels.systems },
    { value: "plugins", label: categoryLabels.plugins },
    { value: "writing", label: categoryLabels.writing },
  ] as const

  return (
    <section id="projects" className="scroll-mt-24 border-t">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              {t.heading ?? "Proyek B2B Terpilih"}
            </h2>
            <p className="mt-2 text-foreground/80">
              {t.subheading ?? "Filter proyek berdasarkan kategori. Semua gambar adalah placeholder."}
            </p>
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
            {categories.map((c) => (
              <TabsTrigger
                key={c.value}
                value={c.value}
                className="rounded-md border bg-secondary/30 px-3 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:text-foreground"
              >
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((c) => {
            const list = c.value === "all" ? projects : projects.filter((p) => p.category === c.value)
            return (
              <TabsContent key={c.value} value={c.value} className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {list.map((p) => (
                    <ProjectCard key={`${c.value}-${p.title}`} project={p} />
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
