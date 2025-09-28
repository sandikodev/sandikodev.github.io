"use client"

import { useEffect } from "react"

const SUPPORTED = ["id", "en", "de", "ja"]

export default function LocaleLangSetter() {
  useEffect(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "/"
    const seg = path.split("/").filter(Boolean)[0]
    const lang = SUPPORTED.includes(seg) ? seg : "id"
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [])
  return null
}
