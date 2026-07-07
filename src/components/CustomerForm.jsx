import { useMemo, useState } from 'react'
import { DEPOSIT_AMOUNT } from '../data/offers'
import { validateForm, isFormValid } from '../utils/validation'
import { initiatePayment } from '../utils/payment'

function formatFcfa(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

const EMPTY_FIELDS = { fullName: '', phone: '', email: '', company: '' }

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
          : "Une erreur est survenue lors de la connexion au service de paiement."
      )
      setSubmitting(false)
    }
  }

  if (!offer) return null

  const remaining = offer.price - DEPOSIT_AMOUNT

  return (
    <section className="checkout" id="checkout">
      <div className="container checkout__inner">
        <div className="checkout__summary">
          <h2 className="section-title">Récapitulatif</h2>
          <dl className="checkout__summary-list">
            <div>
              <dt>Offre choisie</dt>
              <dd>{offer.name}</dd>
            </div>
            <div>
              <dt>Prix total</dt>
              <dd>{formatFcfa(offer.price)}{offer.period ? offer.period : ''}</dd>
            </div>
            <div className="checkout__summary-highlight">
              <dt>À payer maintenant</dt>
              <dd>{formatFcfa(DEPOSIT_AMOUNT)}</dd>
            </div>
            <div>
              <dt>Reste à payer à la livraison</dt>
              <dd>{formatFcfa(remaining)}</dd>
            </div>
          </dl>
        </div>

        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <h2 className="section-title">Vos informations</h2>

          <div className="field">
            <label htmlFor="fullName">Nom complet</label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              value={fields.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              className={touched.fullName && !fieldValidity.fullName ? 'field--invalid' : ''}
              placeholder="Ex : Aïssata Koné"
            />
            {touched.fullName && !fieldValidity.fullName && (
              <p className="field__error">Merci de renseigner votre nom complet.</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="phone">Téléphone / WhatsApp</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={fields.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={touched.phone && !fieldValidity.phone ? 'field--invalid' : ''}
              placeholder="Ex : +225 07 12 34 56 78"
            />
            {touched.phone && !fieldValidity.phone && (
              <p className="field__error">Format ivoirien attendu (ex : +225 07 12 34 56 78).</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={touched.email && !fieldValidity.email ? 'field--invalid' : ''}
              placeholder="Ex : contact@entreprise.com"
            />
            {touched.email && !fieldValidity.email && (
              <p className="field__error">Merci de renseigner une adresse email valide.</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="company">Nom de l'entreprise</label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              value={fields.company}
              onChange={(e) => handleChange('company', e.target.value)}
              onBlur={() => handleBlur('company')}
              className={touched.company && !fieldValidity.company ? 'field--invalid' : ''}
              placeholder="Ex : Koné Business Services"
            />
            {touched.company && !fieldValidity.company && (
              <p className="field__error">Merci de renseigner le nom de votre entreprise.</p>
            )}
          </div>

          {errorMessage && <p className="checkout__error">⚠️ {errorMessage}</p>}

          <button
            type="submit"
            className="button button--primary button--full"
            disabled={!formValid || submitting}
          >
            {submitting
              ? 'Connexion au paiement...'
              : `Payer ${formatFcfa(DEPOSIT_AMOUNT)} et réserver ma place`}
          </button>
        </form>
      </div>
    </section>
  )
}
