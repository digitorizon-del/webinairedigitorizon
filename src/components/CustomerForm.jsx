import { useMemo, useState } from 'react'
import { DEPOSIT_AMOUNT } from '../data/offers'
import { validateForm, isFormValid } from '../utils/validation'
import { initiatePayment } from '../utils/payment'

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
    <div className="p-6 sm:p-8">
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-navy to-navy-dark p-5 text-white">
        <p className="mb-1 text-xs text-white/50">Offre choisie</p>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-extrabold">{offer.name}</h3>
          <span className="font-extrabold text-orange">
            {formatFcfa(offer.price)}
            {offer.period ? offer.period : ''}
          </span>
        </div>
        {offer.bonus && <p className="mt-2 text-xs text-white/70">🎁 {offer.bonus}</p>}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-orange/15 px-3 py-2.5">
          <span className="text-xs text-white/70">À payer maintenant</span>
          <span className="text-sm font-extrabold text-orange">{formatFcfa(DEPOSIT_AMOUNT)}</span>
        </div>
        <p className="mt-2 text-[11px] text-white/40">
          Reste {formatFcfa(remaining)} à payer à la livraison
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <h2 className="mb-5 text-lg font-extrabold text-navy">Vos informations</h2>

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
    </div>
  )
}
