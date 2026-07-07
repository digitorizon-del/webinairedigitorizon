const MONEYFUSION_ENDPOINT =
  'https://pay.moneyfusion.net/Webinaire_Digitorizon/2742ead9add4277d/pay/'

export async function initiatePayment({ offer, depositAmount, customer }) {
  const payload = {
    totalPrice: depositAmount,
    article: [{ 'Offre choisie': offer.name }],
    numeroSend: customer.phone,
    nomclient: customer.fullName,
    personal_Info: [
      {
        email: customer.email,
        entreprise: customer.company,
        offre: offer.name,
        prixTotal: offer.price,
      },
    ],
    return_url: `${window.location.origin}/succes`,
  }

  let response
  try {
    response = await fetch(MONEYFUSION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      'Impossible de contacter le service de paiement. Vérifiez votre connexion internet et réessayez.'
    )
  }

  if (!response.ok) {
    throw new Error(
      `Le service de paiement est momentanément indisponible (erreur ${response.status}). Merci de réessayer dans quelques instants.`
    )
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('Réponse inattendue du service de paiement. Merci de réessayer.')
  }

  if (!data || !data.url) {
    throw new Error('Réponse inattendue du service de paiement. Merci de réessayer.')
  }

  return data.url
}
