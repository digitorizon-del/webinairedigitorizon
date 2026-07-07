import { useEffect, useState } from 'react'
import { getRemainingSeats } from '../utils/seats'

function formatFcfa(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

export default function OfferCard({ offer, selected, onSelect }) {
  const [seats, setSeats] = useState(() => getRemainingSeats(offer.seatsStart))

  useEffect(() => {
    const interval = setInterval(() => {
      setSeats(getRemainingSeats(offer.seatsStart))
    }, 30000)
    return () => clearInterval(interval)
  }, [offer.seatsStart])

  return (
    <button
      type="button"
      className={`offer-card${selected ? ' offer-card--selected' : ''}`}
      onClick={() => onSelect(offer.id)}
      aria-pressed={selected}
    >
      <div className="offer-card__radio" aria-hidden="true">
        <span className="offer-card__radio-dot" />
      </div>

      <h3 className="offer-card__name">{offer.name}</h3>

      <div className="offer-card__pricing">
        <span className="offer-card__old-price">{formatFcfa(offer.oldPrice)}</span>
        <span className="offer-card__price">
          {formatFcfa(offer.price)}
          {offer.period && <span className="offer-card__period">{offer.period}</span>}
        </span>
      </div>

      <ul className="offer-card__features">
        {offer.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      {offer.note && <p className="offer-card__note">{offer.note}</p>}

      <p className="offer-card__bonus">🎁 {offer.bonus}</p>

      <p className="offer-card__seats">🔥 {seats} place{seats > 1 ? 's' : ''} restante{seats > 1 ? 's' : ''}</p>
    </button>
  )
}
