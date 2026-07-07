const LAUNCH_DATE = new Date('2026-07-08T08:00:00+00:00').getTime()
const WEBINAR_DATE = new Date('2026-07-12T20:00:00+00:00').getTime()
const MIN_SEATS = 1

export function getRemainingSeats(seatsStart, now = Date.now()) {
  if (now <= LAUNCH_DATE) return seatsStart
  if (now >= WEBINAR_DATE) return MIN_SEATS

  const elapsed = now - LAUNCH_DATE
  const totalDuration = WEBINAR_DATE - LAUNCH_DATE
  const fraction = elapsed / totalDuration

  const seats = seatsStart - (seatsStart - MIN_SEATS) * fraction
  return Math.max(MIN_SEATS, Math.round(seats))
}
