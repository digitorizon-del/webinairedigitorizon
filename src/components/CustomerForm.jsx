import { useMemo, useState } from 'react'
import { DEPOSIT_AMOUNT } from '../data/offers'
import { validateForm, isFormValid } from '../utils/validation'
import { initiatePayment } from '../utils/payment'
import Reveal from './Reveal'

function formatFcfa(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

const EMPTY_FIELDS = { fullName: '', phone: '', email: '', company: '' }

const FIELDS_CONFIG = [
  { id: 'fullName', label: 'Nom complet', type: 'text', autoComplete: 'name', placeholder: 'Ex : Aïssata Koné', error: 'Merci de renseigner votre nom complet.' },
  { id: 'phone', label: 'Téléphone / WhatsApp', type: 'tel', autoComplete: 'tel', placeholder: 'Ex : +225 07 12 34 56 78', error: 'Format ivoirien attendu (ex : +225 07 12 34 56 78).' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'Ex : contact@entreprise.com', error: 'Merci de renseigner une adresse email valide.' },
  { id: 'company', label: "Nom de l'entreprise", type: 'text', autoComplete: 'organization', placeholder: 'Ex : Koné Business Services', error: 'Merci de renseigner le nom de votre entreprise.' },
]

export default function CustomerForm({ offer }) {
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fieldValidity = useMemo(() => validateForm(fields), [fields])
  const formValid = useMemo(() => isFormValid(fields), [fields])

  function handleChange(field, value) {
    setFields((prev) => ({ ...prev, [field]: value }))
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ fullName: true, phone: true, email: true, company: true })
    setErrorMessage('')

    if (!formValid || !offer) return

    setSubmitting(true)
    try {
      const url = await initiatePayment({
        offer,
        depositAmount: DEPOSIT_AMOUNT,
        customer: fields,
      })
      window.location.href = url
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue lors de la connexion au service de paiement.'
      )
      setSubmitting(false)
    }
  }

  if (!offer) return null

  const remaining = offer.price - DEPOSIT_AMOUNT

  return (
    <section className="relative py-20 md:py-28" id="checkout">
      <div className="container mx-auto max-w-6xl px-5 grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-navy to-navy-dark p-8 text-white shadow-navy-glow">
            <h2 className="text-xl md:text-2xl font-extrabold mb-7">Récapitulatif</h2>
            <dl className="flex flex-col gap-4">
              <div className="flex justify-between gap-3 border-b border-white/10 pb-3.5">
                <dt className="text-sm text-white/50">Offre choisie</dt>
                <dd className="font-bold text-right">{offer.name}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-white/10 pb-3.5">
                <dt className="text-sm text-white/50">Prix total</dt>
                <dd className="font-bold text-right">
                  {formatFcfa(offer.price)}
                  {offer.period ? offer.period : ''}
                </dd>
              </div>
              <div className="flex justify-between gap-3 rounded-xl bg-orange/15 px-3 py-2.5">
                <dt className="text-sm text-white/70">À payer maintenant</dt>
                <dd className="font-extrabold text-orange text-right">
                  {formatFcfa(DEPOSIT_AMOUNT)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-sm text-white/50">Reste à payer à la livraison</dt>
                <dd className="font-bold text-right">{formatFcfa(remaining)}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            className="rounded-3xl glass-card p-8 shadow-md"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-navy mb-7">
              Vos informations
            </h2>

            {FIELDS_CONFIG.map(({ id, label, type, autoComplete, placeholder, error }) => {
              const invalid = touched[id] && !fieldValidity[id]
              return (
                <div className="mb-5" key={id}>
                  <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-navy">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    autoComplete={autoComplete}
                    value={fields[id]}
                    onChange={(e) => handleChange(id, e.target.value)}
                    onBlur={() => handleBlur(id)}
                    placeholder={placeholder}
                    className={`w-full rounded-xl border-[1.5px] bg-white px-4 py-3.5 text-navy placeholder:text-navy/30 transition-colors focus:outline-none focus:border-orange ${
                      invalid ? 'border-red-400' : 'border-navy/15'
                    }`}
                  />
                  {invalid && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
                </div>
              )
            })}

            {errorMessage && (
              <p className="mb-4 rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-600">
                ⚠️ {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={!formValid || submitting}
              className="w-full rounded-full bg-gradient-to-r from-orange to-orange-dark px-7 py-4 font-extrabold text-white shadow-glow transition-all duration-200 hover:scale-[1.02] hover:shadow-glow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
            >
              {submitting
                ? 'Connexion au paiement...'
                : `Payer ${formatFcfa(DEPOSIT_AMOUNT)} et réserver ma place`}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
