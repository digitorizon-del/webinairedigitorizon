import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo size="small" />
        <div className="footer__contact">
          <a href="mailto:contact@digitorizon.com">contact@digitorizon.com</a>
          <a href="tel:+2250500259286">+225 05 00 25 92 86</a>
        </div>
        <p className="footer__copy">Digitorizon © 2026</p>
      </div>
    </footer>
  )
}
