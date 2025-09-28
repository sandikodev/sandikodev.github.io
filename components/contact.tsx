"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type ContactI18n = {
  heading?: string
  subheading?: string
  nameLabel?: string
  emailLabel?: string
  messageLabel?: string
  submit?: string
  submitting?: string
  invalidEmailTitle?: string
  invalidEmailDesc?: string
  mailOpeningTitle?: string
  mailOpeningDesc?: string
}

export default function Contact({ t = {} as ContactI18n }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      toast({
        title: t.invalidEmailTitle ?? "Email tidak valid",
        description: t.invalidEmailDesc ?? "Mohon masukkan alamat email yang benar.",
      })
      return
    }
    setSubmitting(true)
    const subject = `Kontak Portofolio - ${name || "Tanpa Nama"}`
    const body = `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    const mailto = `mailto:sandikodev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    toast({
      title: t.mailOpeningTitle ?? "Membuka aplikasi email…",
      description: t.mailOpeningDesc ?? "Draf pesan Anda sedang disiapkan.",
    })
    // Slight delay to ensure toast is visible before navigation
    setTimeout(() => {
      window.location.href = mailto
      setSubmitting(false)
    }, 200)
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{t.heading ?? "Kontak"}</h2>
        <p className="mt-2 text-foreground/80">
          {t.subheading ?? "Kirim pesan langsung melalui email. Semua kolom wajib diisi."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:max-w-lg" noValidate>
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t.nameLabel ?? "Name"}
            </label>
            <Input
              id="name"
              name="name"
              required
              placeholder={t.nameLabel ?? "Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t.emailLabel ?? "Email"}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={email !== "" && !isValidEmail(email)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t.messageLabel ?? "Message"}
            </label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder={t.messageLabel ?? "Message"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>
          <Button
            type="submit"
            className="w-fit transition-shadow dark:hover:[box-shadow:0_0_14px_var(--color-primary)]"
            disabled={submitting}
          >
            {submitting ? (t.submitting ?? "Mengirim...") : (t.submit ?? "Ajukan Proyek")}
          </Button>
        </form>
      </div>
    </section>
  )
}
