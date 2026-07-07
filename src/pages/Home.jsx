import { useState } from 'react'
import Header from '../components/Header'
import OfferSelection from '../components/OfferSelection'
import CustomerForm from '../components/CustomerForm'
import Footer from '../components/Footer'
import SocialProofToast from '../components/SocialProofToast'
import { offers } from '../data/offers'

export default function Home() {
  const [selectedId, setSelectedId] = useState(null)

  function handleSelect(id) {
    setSelectedId(id)
    requestAnimationFrame(() => {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const selectedOffer = offers.find((o) => o.id === selectedId) || null

  return (
    <>
      <Header />
      <main>
        <OfferSelection selectedId={selectedId} onSelect={handleSelect} />
        <CustomerForm offer={selectedOffer} />
      </main>
      <Footer />
      <SocialProofToast />
    </>
  )
}
