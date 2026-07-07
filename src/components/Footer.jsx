import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-gray-50 py-10">
      <div className="container mx-auto max-w-6xl px-5 flex flex-col items-center gap-3 text-center">
        <Logo size="small" />
        <div className="flex flex-col gap-1 text-sm text-navy/70">
          <a href="mailto:contact@digitorizon.com" className="hover:text-orange transition-colors">
            contact@digitorizon.com
          </a>
          <a href="tel:+2250500259286" className="hover:text-orange transition-colors">
            +225 05 00 25 92 86
          </a>
        </div>
        <p className="text-xs text-navy/40">Digitorizon © 2026</p>
      </div>
    </footer>
  )
}
