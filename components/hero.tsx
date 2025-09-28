import { Button } from "@/components/ui/button"

type HeroI18n = {
  title?: string
  description?: string
  ctaPrimary?: string
  ctaSecondary?: string
  founderTitle?: string
  kpiExperience?: string
  kpiUptime?: string
  kpiProjects?: string
  kpiA11y?: string
}

export default function Hero({ t = {} }: { t?: HeroI18n }) {
  return (
    <section id="hero" className="scroll-mt-24 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -z-10 size-64 -translate-x-1/2 blur-3xl opacity-40 dark:opacity-60 animate-float-slow"
        style={{
          // Use tokens via CSS variables for consistent theming
          background: "radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-pretty text-4xl font-semibold tracking-tight md:text-5xl">
              {t.title ?? "Membangun antarmuka yang tangguh dan berakses."}
            </h1>
            <p className="mt-4 text-foreground/80">
              {t.description ??
                "Solusi perangkat lunak, jaringan, dan keamanan siber untuk kebutuhan B2B. Fokus pada performa, aksesibilitas, dan detail mikro yang menyenangkan."}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Button asChild aria-label={t.ctaPrimary ?? "Ajukan Proyek"}>
                <a href="#contact">{t.ctaPrimary ?? "Ajukan Proyek"}</a>
              </Button>
              <a
                href="#projects"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                aria-label={t.ctaSecondary ?? "Lihat Proyek"}
              >
                {t.ctaSecondary ?? "Lihat Proyek"}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center text-center md:items-end md:text-right">
            <img
              src="/images/avatar-sandikode.png"
              alt="Profil Sandikodev (alias Kata Sandi)"
              width={120}
              height={120}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="mb-4 size-28 rounded-full border object-cover ring-2 ring-primary dark:[box-shadow:0_0_24px_var(--color-primary)]"
            />
            <p className="text-sm text-muted-foreground">{t.founderTitle ?? "Founder • Koneksi Jaringan Indonesia"}</p>
          </div>
        </div>

        {/* KPI strip inspired by hero metrics */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4">
          <div className="rounded-md border bg-secondary/30 p-4 transition-shadow dark:drop-shadow-[0_0_8px_var(--color-primary)]">
            <p className="text-2xl font-semibold">6+</p>
            <p className="text-sm text-muted-foreground">{t.kpiExperience ?? "Tahun pengalaman"}</p>
          </div>
          <div className="rounded-md border bg-secondary/30 p-4 transition-shadow dark:drop-shadow-[0_0_8px_var(--color-primary)]">
            <p className="text-2xl font-semibold">98%</p>
            <p className="text-sm text-muted-foreground">{t.kpiUptime ?? "Uptime proyek"}</p>
          </div>
          <div className="rounded-md border bg-secondary/30 p-4 transition-shadow dark:drop-shadow-[0_0_8px_var(--color-primary)]">
            <p className="text-2xl font-semibold">10+</p>
            <p className="text-sm text-muted-foreground">{t.kpiProjects ?? "Proyek terpilih"}</p>
          </div>
          <div className="rounded-md border bg-secondary/30 p-4 transition-shadow dark:drop-shadow-[0_0_8px_var(--color-primary)]">
            <p className="text-2xl font-semibold">A11y</p>
            <p className="text-sm text-muted-foreground">{t.kpiA11y ?? "Fokus aksesibilitas"}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
