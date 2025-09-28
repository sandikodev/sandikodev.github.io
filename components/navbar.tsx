"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import LocaleSwitcher from "@/components/locale-switcher"

type NavbarI18n = {
  brand?: string
  home?: string
  about?: string
  projects?: string
  vision?: string
  contact?: string
  currentLocale?: string
  locales?: { code: string; label: string }[]
}

export default function Navbar({
  t = {},
}: {
  t?: NavbarI18n
}) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState("hero")

  useEffect(() => {
    const ids = ["hero", "about", "projects", "vision", "contact"]
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const labels = {
    brand: t.brand ?? "Sandikodev",
    home: t.home ?? "Beranda",
    about: t.about ?? "Tentang",
    projects: t.projects ?? "Proyek",
    vision: t.vision ?? "Visi",
    contact: t.contact ?? "Kontak",
  }

  const links = [
    { href: "#hero", label: labels.home },
    { href: "#about", label: labels.about },
    { href: "#projects", label: labels.projects },
    { href: "#vision", label: labels.vision },
    { href: "#contact", label: labels.contact },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:py-4">
        <Link
          href="#hero"
          className="font-semibold text-lg tracking-tight text-foreground transition-shadow
          hover:[box-shadow:0_0_12px_var(--color-primary)] dark:hover:[box-shadow:0_0_12px_var(--color-primary)]"
        >
          {labels.brand}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => {
            const isActive = activeId === l.href.replace("#", "")
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-sm transition-colors",
                  isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground",
                )}
              >
                {l.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-2 left-0 h-0.5 rounded-full bg-primary transition-all glow-bar animate-glow",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full",
                  )}
                />
              </a>
            )
          })}
        </div>

        <div className="ml-2 md:ml-4">
          <LocaleSwitcher
            currentLocale={t.currentLocale ?? "id"}
            locales={
              t.locales ?? [
                { code: "id", label: "ID" },
                { code: "en", label: "EN" },
                { code: "de", label: "DE" },
                { code: "ja", label: "日本語" },
              ]
            }
          />
        </div>

        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="inline-flex items-center justify-center rounded-md border px-2 py-2 md:hidden"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-[max-height] duration-300 overflow-hidden border-t",
          open ? "max-h-72" : "max-h-0",
        )}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3">
          {links.map((l) => {
            const isActive = activeId === l.href.replace("#", "")
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn("py-2", isActive ? "text-foreground font-medium" : "text-foreground/90")}
              >
                {l.label}
              </a>
            )
          })}
        </div>
      </div>
    </header>
  )
}
