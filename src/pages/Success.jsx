import { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Logo from '../components/Logo'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import { SectionBackgroundFX } from '../components/BackgroundFX'
import { checkPaymentStatus } from '../utils/payment'
import { offers } from '../data/offers'

function formatFcfa(amount) {
  return `${Number(amount).toLocaleString('fr-FR')} FCFA`
}

function findOfferIdByName(name) {
  return offers.find((offer) => offer.name === name)?.id ?? null
}

export default function Success() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [status, setStatus] = useState(token ? 'loading' : 'invalid')
  const [details, setDetails] = useState(null)

  const verify = useCallback(() => {
    if (!token) {
      setStatus('invalid')
      return
    }
    setStatus('loading')
    checkPaymentStatus(token)
      .then((response) => {
        const paymentStatus = response?.data?.statut
        setDetails(response?.data ?? null)
        if (paymentStatus === 'paid') setStatus('paid')
        else if (paymentStatus === 'pending') setStatus('pending')
        else if (paymentStatus === 'failed' || paymentStatus === 'no paid') setStatus('failed')
        else setStatus('error')
      })
      .catch(() => setStatus('error'))
  }, [token])

  useEffect(() => {
    verify()
  }, [verify])

  const offerName = details?.personal_Info?.[0]?.offre
  const amount = details?.Montant
  const retryOfferId = offerName ? findOfferIdByName(offerName) : null

  return (
    <>
      <div className="relative flex min-h-[80vh] items-center overflow-hidden py-16">
        <SectionBackgroundFX />
        <div className="relative container mx-auto max-w-md px-5">
          <Reveal className="flex flex-col items-center gap-6 text-center">
            <Logo />

            {status === 'loading' && <LoadingState />}
            {status === 'paid' && <PaidState offerName={offerName} amount={amount} />}
            {status === 'pending' && <PendingState onRetry={verify} />}
            {status === 'failed' && <FailedState retryOfferId={retryOfferId} />}
            {(status === 'invalid' || status === 'error') && <ErrorState />}
          </Reveal>
        </div>
      </div>
      <Footer />
    </>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-5 py-8">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-navy/10 border-t-orange"
        role="status"
        aria-label="Vérification en cours"
      />
      <p className="text-base text-navy/60">Vérification de votre paiement en cours...</p>
    </div>
  )
}

function PaidState({ offerName, amount }) {
  return (
    <>
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

      <h1 className="text-2xl md:text-3xl font-extrabold text-navy">Votre place est réservée !</h1>
      <p className="text-base md:text-lg text-navy/60">
        Nous vous contactons sous 24h pour démarrer votre projet.
      </p>

      {(offerName || amount) && (
        <div className="w-full rounded-2xl bg-navy/5 px-5 py-4 text-left">
          {offerName && (
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-navy/50">Offre</span>
              <span className="font-bold text-navy">{offerName}</span>
            </div>
          )}
          {amount != null && (
            <div className="mt-2 flex justify-between gap-3 text-sm">
              <span className="text-navy/50">Montant payé</span>
              <span className="font-bold text-navy">{formatFcfa(amount)}</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}

function PendingState({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange/10 text-4xl">
        ⏳
      </div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-navy">
        Paiement en cours de traitement
      </h1>
      <p className="text-base md:text-lg text-navy/60">
        Votre paiement est en cours de traitement, cela peut prendre quelques instants.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-gradient-to-r from-orange to-orange-dark px-7 py-3.5 font-extrabold text-white shadow-glow transition-all duration-200 hover:scale-[1.02] hover:shadow-glow-lg active:scale-[0.98]"
      >
        Revérifier le statut
      </button>
    </div>
  )
}

function FailedState({ retryOfferId }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-4xl text-red-500">
        ✕
      </div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-navy">Le paiement n'a pas abouti</h1>
      <p className="text-base md:text-lg text-navy/60">
        Une erreur est survenue lors du traitement de votre paiement. Vous pouvez réessayer.
      </p>
      <Link
        to={retryOfferId ? `/?offer=${retryOfferId}` : '/'}
        className="rounded-full bg-gradient-to-r from-orange to-orange-dark px-7 py-3.5 font-extrabold text-white shadow-glow transition-all duration-200 hover:scale-[1.02] hover:shadow-glow-lg active:scale-[0.98]"
      >
        Réessayer
      </Link>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy/5 text-4xl">
        ⚠️
      </div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-navy">
        Impossible de vérifier ce paiement
      </h1>
      <p className="text-base md:text-lg text-navy/60">
        Le lien utilisé est invalide ou incomplet. Merci de retourner à l'accueil.
      </p>
      <Link
        to="/"
        className="rounded-full bg-gradient-to-r from-orange to-orange-dark px-7 py-3.5 font-extrabold text-white shadow-glow transition-all duration-200 hover:scale-[1.02] hover:shadow-glow-lg active:scale-[0.98]"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
