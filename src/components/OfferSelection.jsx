import OfferCard from './OfferCard'
import Reveal from './Reveal'
import { SectionBackgroundFX } from './BackgroundFX'
import { offers } from '../data/offers'

export default function OfferSelection({ selectedId, onSelect }) {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 md:py-28" id="offres">
      <SectionBackgroundFX />
      <div className="relative container mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-navy mb-14">
            Choisissez votre offre
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:pt-4">
          {offers.map((offer, index) => (
            <Reveal
              key={offer.id}
              delay={index * 120}
              className={offer.featured ? 'relative z-10' : 'relative'}
            >
              <OfferCard
                offer={offer}
                selected={selectedId === offer.id}
                onSelect={onSelect}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
