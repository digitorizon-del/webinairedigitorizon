import OfferCard from './OfferCard'
import { offers } from '../data/offers'

export default function OfferSelection({ selectedId, onSelect }) {
  return (
    <section className="offers" id="offres">
      <div className="container">
        <h2 className="section-title">Choisissez votre offre</h2>
        <div className="offers__grid">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              selected={selectedId === offer.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
