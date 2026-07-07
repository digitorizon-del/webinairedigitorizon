import Logo from '../components/Logo'
import Footer from '../components/Footer'

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/GN6Ama0kBl3LWHUlFt7O8U'

export default function Success() {
  return (
    <>
      <div className="success">
        <div className="container success__inner">
          <Logo />
          <div className="success__check">
            <svg viewBox="0 0 52 52" className="success__check-svg">
              <circle className="success__check-circle" cx="26" cy="26" r="24" fill="none" />
              <path
                className="success__check-mark"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          <h1 className="success__title">Votre place est réservée !</h1>
          <p className="success__text">
            Nous vous contactons sous 24h pour démarrer votre projet.
          </p>
          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary"
          >
            Rejoindre le groupe WhatsApp du webinaire
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}
