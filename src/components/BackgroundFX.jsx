export function HeroBackgroundFX() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-mesh-hero" />
      <div
        className="absolute inset-0 opacity-[0.35] [background-size:44px_44px] bg-grid-pattern"
        style={{ maskImage: 'linear-gradient(180deg, black, transparent)' }}
      />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange/30 blur-3xl animate-float" />
      <div
        className="absolute top-1/3 -right-16 w-80 h-80 rounded-full bg-orange/20 blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
    </div>
  )
}

export function SectionBackgroundFX() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-orange/[0.07] blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-navy/[0.06] blur-3xl" />
    </div>
  )
}
