import Logo from './Logo'

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />
      </div>
      <div className="container header__hero">
        <h1 className="header__title">
          Réservez votre place — Offres spéciales webinaire
        </h1>
        <p className="header__subtitle">
          Tarifs exclusifs réservés aux participants du webinaire du 12 juillet 2026
        </p>
      </div>
    </header>
  )
}
