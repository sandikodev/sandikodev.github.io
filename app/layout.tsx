import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import LocaleLangSetter from "@/components/locale-lang-setter"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sandikodev (Kata Sandi) — Solusi Kode & Kedaulatan Data",
  description:
    "Portofolio B2B untuk solusi perangkat lunak, infrastruktur jaringan, keamanan siber, dan kedaulatan data. Membangun solusi dengan kode & kedaulatan data.",
  generator: "v0.app",
  metadataBase: new URL("https://sandikodev.github.io"),
  keywords: [
    "Sandikodev",
    "Kata Sandi",
    "Portofolio",
    "B2B",
    "Keamanan Siber",
    "Kedaulatan Data",
    "Next.js",
    "React",
    "Python",
    "Golang",
    "Laravel",
    "Flask",
    "Jaringan",
    "LLM Engineering",
  ],
  authors: [{ name: "Sandikodev", url: "https://sandikodev.github.io" }],
  creator: "Sandikodev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://sandikodev.github.io/",
    title: "Sandikodev (Kata Sandi) — Solusi Kode & Kedaulatan Data",
    description:
      "Portofolio B2B untuk solusi perangkat lunak, infrastruktur jaringan, keamanan siber, dan kedaulatan data.",
    images: [
      {
        url: "/images/sandikodev-avatar.jpg",
        width: 512,
        height: 512,
        alt: "Profil Sandikodev",
      },
    ],
    siteName: "Sandikodev",
  },
  twitter: {
    card: "summary",
    site: "@sandikodev",
    creator: "@sandikodev",
    title: "Sandikodev (Kata Sandi) — Solusi Kode & Kedaulatan Data",
    description:
      "Portofolio B2B untuk solusi perangkat lunak, infrastruktur jaringan, keamanan siber, dan kedaulatan data.",
    images: ["/images/sandikodev-avatar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="scroll-smooth dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LocaleLangSetter />
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2"
        >
          Lewati ke konten utama
        </a>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sandikodev",
              alternateName: "Kata Sandi",
              url: "https://sandikodev.github.io/",
              sameAs: [
                "https://github.com/sandikodev",
                "https://www.linkedin.com/in/sandikodev",
                "https://instagram.com/sandikodev",
                "https://twitter.com/sandikodev",
              ],
              jobTitle: "Software Engineer • Network Admin • Cybersecurity",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Koneksi Jaringan Indonesia",
              url: "https://sandikodev.github.io/",
              logo: "https://sandikodev.github.io/images/sandikodev-avatar.jpg",
            }),
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
