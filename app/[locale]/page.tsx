import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Vision from "@/components/vision"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { getDictionary, type Locale } from "@/lib/i18n/dictionaries"

export default async function LocalizedHomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale
  const t = await getDictionary(locale)
  return (
    <main>
      <Navbar t={{ ...t.nav, currentLocale: locale, locales: t.locales }} />
      <Hero t={t.hero} />
      <About />
      <Projects t={t.projects} />
      <Vision />
      <Contact t={t.contact} />
      <Footer />
    </main>
  )
}
