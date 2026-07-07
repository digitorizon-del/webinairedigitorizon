export function isValidName(value) {
  return value.trim().length >= 3
}

export function isValidPhone(value) {
  const cleaned = value.replace(/[\s.-]/g, '')
  // Format ivoirien : +225XXXXXXXXXX / 00225XXXXXXXXXX (10 chiffres) ou 0XXXXXXXXX (10 chiffres, local)
  return /^(\+225|00225)\d{10}$/.test(cleaned) || /^0\d{9}$/.test(cleaned)
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function isValidCompany(value) {
  return value.trim().length >= 2
}

export function validateForm(fields) {
  return {
    fullName: isValidName(fields.fullName),
    phone: isValidPhone(fields.phone),
    email: isValidEmail(fields.email),
    company: isValidCompany(fields.company),
  }
}

export function isFormValid(fields) {
  const results = validateForm(fields)
  return Object.values(results).every(Boolean)
}
