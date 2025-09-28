export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">Tentang</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="text-foreground/80 leading-relaxed">
            <p>
              Insinyur perangkat lunak dan admin jaringan yang membantu bisnis membangun sistem andal, aman, dan siap
              skala. Berfokus pada arsitektur web, infrastruktur jaringan, dan praktik keamanan siber yang pragmatis.
            </p>
            <p className="mt-3">
              Founder <span className="font-medium">Koneksi Jaringan Indonesia</span> — mendorong kedaulatan data
              melalui inisiatif <span className="font-semibold">.warga</span>. Dikenal juga sebagai{" "}
              <span className="font-medium">“Kata Sandi”</span>.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Keahlian Utama</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/80">
              <li>Python</li>
              <li>JavaScript/TypeScript</li>
              <li>Go (Golang)</li>
              <li>Flask, Laravel</li>
              <li>Next.js & React (Full‑stack)</li>
              <li>Shell scripting</li>
              <li>Sistem administrasi jaringan (Linux, DNS, TCP/IP)</li>
              <li>Keamanan Siber, LLM Engineering & ChatGPT</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
