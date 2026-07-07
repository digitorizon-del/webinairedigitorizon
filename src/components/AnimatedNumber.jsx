import { useEffect, useRef, useState } from 'react'

export default function AnimatedNumber({ value, duration = 800, className = '' }) {
  const [display, setDisplay] = useState(value)
  const prevValue = useRef(value)
  const frameRef = useRef(null)

  useEffect(() => {
    const from = prevValue.current
    const to = value
    if (from === to) return

    const start = performance.now()

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(from + (to - from) * eased)
      setDisplay(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        prevValue.current = to
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [value, duration])

  return <span className={className}>{display}</span>
}
