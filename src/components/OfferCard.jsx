import { useEffect, useState } from 'react'
import { getRemainingSeats } from '../utils/seats'
import AnimatedNumber from './AnimatedNumber'

function formatFcfa(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

export default function OfferCard({ offer, selected, onSelect }) {
  const [seats, setSeats] = useState(() => getRemainingSeats(offer.seatsStart))

  useEffect(() => {
    const interval = setInterval(() => {
      setSeats(getRemainingSeats(offer.seatsStart))
    }, 15000)
    return () => clearInterval(interval)
  }, [offer.seatsStart])

  const isLow = seats <= 2
  const featured = Boolean(offer.featured)

  return (
    <button
      type="button"
      onClick={() => onSelect(offer.id)}
      aria-pressed={selected}
      className={`
        group relative flex flex-col gap-4 rounded-3xl p-7 pt-8 text-left
        glass-card transition-all duration-300 ease-out
        hover:-translate-y-1.5
        ${featured ? 'md:-translate-y-3 md:scale-[1.03] md:hover:-translate-y-4' : ''}
        ${
          selected
            ? 'ring-2 ring-orange shadow-glow-lg border-orange/60'
            : featured
              ? 'border-orange/40 shadow-glow hover:shadow-glow-lg'
              : 'border-navy/10 shadow-md hover:border-orange/40 hover:shadow-glow'
        }
      `}
    >
      {featured && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-orange to-orange-dark px-4 py-1.5 text-xs font-extrabold text-white shadow-glow">
          ⭐ Offre recommandée
        </span>
      )}

      <div
        className={`absolute right-6 top-8 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected ? 'border-orange' : 'border-navy/20'
        }`}
        aria-hidden="true"
      >
        <span
          className={`w-3 h-3 rounded-full bg-orange transition-opacity ${
            selected ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <h3 className="pr-8 text-xl font-extrabold text-navy">{offer.name}</h3>

      <div className="flex flex-wrap items-baseline gap-2.5">
        <span className="text-sm text-navy/40 line-through">{formatFcfa(offer.oldPrice)}</span>
        <span className="text-2xl font-extrabold bg-gradient-to-r from-orange to-orange-dark bg-clip-text text-transparent">
          {formatFcfa(offer.price)}
        </span>
        {offer.period && <span className="text-xs font-medium text-navy/50">{offer.period}</span>}
      </div>

      <ul className="flex flex-col gap-2">
        {offer.features.map((feature) => (
          <li key={feature} className="relative pl-6 text-sm text-navy/70">
            <span className="absolute left-0 font-extrabold text-orange">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {offer.note && <p className="text-xs italic text-navy/40">{offer.note}</p>}

      <p className="rounded-xl bg-navy/5 px-3 py-2.5 text-sm font-bold text-navy">
        🎁 {offer.bonus}
      </p>

      <div
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 w-fit text-sm font-extrabold ${
          isLow
            ? 'bg-red-50 text-red-600 animate-pulse-glow-alert'
            : 'bg-orange/10 text-orange-dark animate-pulse-glow'
        }`}
      >
        <span>🔥</span>
        <AnimatedNumber value={seats} />
        <span>place{seats > 1 ? 's' : ''} restante{seats > 1 ? 's' : ''}</span>
      </div>
    </button>
  )
}
