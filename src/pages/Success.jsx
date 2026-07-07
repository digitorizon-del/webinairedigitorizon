import Logo from '../components/Logo'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import { SectionBackgroundFX } from '../components/BackgroundFX'

export default function Success() {
  return (
    <>
      <div className="relative flex min-h-[80vh] items-center overflow-hidden py-16">
        <SectionBackgroundFX />
        <div className="relative container mx-auto max-w-md px-5">
          <Reveal className="flex flex-col items-center gap-6 text-center">
            <Logo />

            <svg viewBox="0 0 52 52" className="h-24 w-24">
              <circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="#FD8D39"
                strokeWidth="3"
                strokeDasharray="151"
                strokeDashoffset="151"
                className="animate-draw-circle"
              />
              <path
                fill="none"
                stroke="#FD8D39"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset="40"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                className="animate-draw-check"
              />
            </svg>

            <h1 className="text-2xl md:text-3xl font-extrabold text-navy">
              Votre place est réservée !
            </h1>
            <p className="text-base md:text-lg text-navy/60">
              Nous vous contactons sous 24h pour démarrer votre projet.
            </p>
          </Reveal>
        </div>
      </div>
      <Footer />
    </>
  )
}
