"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function LocaleSwitcher({
  currentLocale,
  locales,
}: {
  currentLocale: string
  locales: { code: string; label: string }[]
}) {
  const pathname = usePathname() || "/"
  // Build base path without locale prefix to keep anchors for home page
  const segments = pathname.split("/").filter(Boolean)
  const first = segments[0]
  const hasLocalePrefix = locales.some((l) => l.code === first)
  const rest = hasLocalePrefix ? segments.slice(1) : segments
  const base = "/" + rest.join("/")
  const baseWithoutHash = base === "/" ? "" : base

  return (
    <div className="flex items-center gap-1">
      {locales.map((l) => {
        const href = `/${l.code}${baseWithoutHash}`
        const active = l.code === currentLocale
        return (
          <Link
            key={l.code}
            href={href || "/"}
            className={cn(
              "rounded px-2 py-1 text-xs border",
              active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            {l.label}
          </Link>
        )
      })}
    </div>
  )
}
