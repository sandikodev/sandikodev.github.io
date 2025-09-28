import Link from "next/link"
import { Github, Linkedin, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sandikodev. Semua hak dilindungi.</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/sandikodev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground/80 hover:text-foreground"
          >
            <Github className="size-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/sandikodev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground/80 hover:text-foreground"
          >
            <Linkedin className="size-5" />
          </Link>
          <Link
            href="https://instagram.com/sandikodev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground/80 hover:text-foreground"
          >
            <Instagram className="size-5" />
          </Link>
          <Link
            href="https://twitter.com/sandikodev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-foreground/80 hover:text-foreground"
          >
            <Twitter className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
