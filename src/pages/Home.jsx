import { useState } from 'react'
import Header from '../components/Header'
import OfferSelection from '../components/OfferSelection'
import CustomerForm from '../components/CustomerForm'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import SocialProofToast from '../components/SocialProofToast'
import { offers } from '../data/offers'

export default function Home() {
  const [selectedId, setSelectedId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  function handleSelect(id) {
    setSelectedId(id)
    setModalOpen(true)
  }

  function handleClose() {
    setModalOpen(false)
  }

  const selectedOffer = offers.find((o) => o.id === selectedId) || null

  return (
    <>
      <Header />
      <main>
        <OfferSelection selectedId={modalOpen ? selectedId : null} onSelect={handleSelect} />
      </main>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        ariaLabel={selectedOffer ? `Réserver l'offre ${selectedOffer.name}` : 'Réserver ma place'}
      >
        <CustomerForm offer={selectedOffer} />
      </Modal>
      <Footer />
      <SocialProofToast />
    </>
  )
}
