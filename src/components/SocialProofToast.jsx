import { useEffect, useState } from 'react'
import { offers } from '../data/offers'

const NAMES = [
  "Kouassi N'Guessan", 'Yao Koné', 'Aya Traoré', 'Aïcha Diabaté', 'Bertrand Kouamé',
  'Fatou Bamba', 'Ibrahim Ouattara', 'Adjoua Aka', 'Koffi Diallo', 'Mariam Kra',
  'Sékou Touré', 'Aminata Coulibaly', 'Jean-Baptiste Zadi', 'Akissi Dosso', 'Moussa Konaté',
  'Nadège Gnahoré', 'Serge Sanogo', "Awa N'Guessan", 'Christian Koné', 'Fatim Traoré',
  'Désiré Diabaté', 'Rokia Kouamé', 'Franck Bamba', 'Assita Ouattara', 'Prince Aka',
  'Béatrice Diallo', 'Cyrille Kra', 'Djénéba Touré', 'Armand Coulibaly', 'Vivianne Zadi',
]

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function randomDelay(min, max) {
  return Math.floor(min + Math.random() * (max - min))
}

export default function SocialProofToast() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let showTimer
    let hideTimer

    function scheduleNext() {
      showTimer = setTimeout(() => {
        setToast({
          name: randomItem(NAMES),
          offer: randomItem(offers).name,
          key: Date.now(),
        })
        hideTimer = setTimeout(() => {
          setToast(null)
          scheduleNext()
        }, 5500)
      }, randomDelay(30000, 60000))
    }

    scheduleNext()
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!toast) return null

  return (
    <div
      key={toast.key}
      className="fixed bottom-4 left-4 z-50 max-w-[280px] animate-slide-in-left rounded-2xl bg-navy/90 backdrop-blur-xl border border-white/10 shadow-navy-glow px-4 py-3 text-white"
      role="status"
    >
      <p className="text-xs text-white/60">🟢 À l'instant</p>
      <p className="text-sm font-semibold leading-snug">
        {toast.name} vient de réserver l'offre{' '}
        <span className="text-orange">{toast.offer}</span>
      </p>
    </div>
  )
}
