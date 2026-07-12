const DECAY_START = new Date('2026-07-12T17:00:00+00:00').getTime()
const DECAY_END = new Date('2026-07-12T21:15:00+00:00').getTime()
const MIN_SEATS = 1

export function getRemainingSeats(seatsStart, now = Date.now()) {
  if (now <= DECAY_START) return seatsStart
  if (now >= DECAY_END) return MIN_SEATS

  const fraction = (now - DECAY_START) / (DECAY_END - DECAY_START)
  const seats = seatsStart - (seatsStart - MIN_SEATS) * fraction
  return Math.max(MIN_SEATS, Math.round(seats))
}
