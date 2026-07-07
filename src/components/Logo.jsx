import logoImg from '../assets/logo.png'

export default function Logo({ size = 'default', variant = 'dark' }) {
  const isSmall = size === 'small'
  const onDarkBackground = variant === 'light'

  const image = (
    <img
      src={logoImg}
      alt="Digitorizon"
      className={`w-auto object-contain ${isSmall ? 'h-7' : 'h-9 md:h-10'}`}
    />
  )

  if (onDarkBackground) {
    return image
  }

  return (
    <div
      className={`inline-flex items-center rounded-xl bg-navy shadow-navy-glow ${
        isSmall ? 'px-3 py-1.5' : 'px-4 py-2.5'
      }`}
    >
      {image}
    </div>
  )
}
