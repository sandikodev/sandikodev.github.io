export default function Vision() {
  return (
    <section id="vision" className="scroll-mt-24 border-t">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">Visi</h2>
        <div className="mt-4 leading-relaxed text-foreground/80">
          <p className="font-medium">
            “Membangun jaringan mandiri dan berdaulat di Indonesia, dengan top‑level domain
            <span className="font-semibold"> .warga</span> yang hanya bisa diakses secara tertutup dan aman,
            mengedepankan kedaulatan data masyarakat.”
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Menginisiasi layanan hosting SaaS.</li>
            <li>Membangun ekosistem digital berbasis keamanan & kedaulatan data.</li>
            <li>Menjaring kompetensi unggul di bidang IT untuk kolaborasi.</li>
          </ul>
          <div className="mt-6">
            <a
              href="#contact"
              className="text-sm font-medium underline underline-offset-4 text-foreground/80 hover:text-foreground"
              aria-label="Hubungi via Kontak"
            >
              Hubungi via Kontak
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
