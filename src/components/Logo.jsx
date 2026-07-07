export default function Logo({ size = 'default', variant = 'dark' }) {
  const isSmall = size === 'small'
  const isLight = variant === 'light'

  return (
    <div className="inline-flex items-center gap-2.5">
      <div
        className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-orange to-orange-dark text-navy font-extrabold shadow-glow ${
          isSmall ? 'w-8 h-8 text-base rounded-lg' : 'w-10 h-10 text-xl'
        }`}
      >
        D
      </div>
      <span
        className={`font-extrabold tracking-tight ${isSmall ? 'text-base' : 'text-lg'} ${
          isLight ? 'text-white' : 'text-navy'
        }`}
      >
        Digitorizon
      </span>
    </div>
  )
}
