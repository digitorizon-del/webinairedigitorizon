import Logo from './Logo'
import Reveal from './Reveal'
import { HeroBackgroundFX } from './BackgroundFX'

export default function Header() {
  return (
    <header className="relative bg-navy pb-16 md:pb-24 overflow-hidden">
      <HeroBackgroundFX />

      <div className="relative container mx-auto max-w-6xl px-5">
        <div className="pt-6 pb-2">
          <Logo variant="light" />
        </div>

        <div className="mt-8 md:mt-14 text-center">
          <Reveal>
            <h1 className="mx-auto max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Réservez votre place —{' '}
              <span className="bg-gradient-to-r from-orange to-orange-light bg-clip-text text-transparent">
                Offres spéciales webinaire
              </span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg text-white/70">
              Tarifs exclusifs réservés aux participants du webinaire du 12 juillet 2026
            </p>
          </Reveal>
        </div>
      </div>
    </header>
  )
}
