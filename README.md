# Digitorizon — Landing page webinaire

Landing page one-page (offres + paiement d'acompte) pour le webinaire Digitorizon
du 12 juillet 2026. React + Vite, 100% statique, sans backend. Le paiement de
l'acompte de 10 000 FCFA passe directement du navigateur vers l'API MoneyFusion.

## Stack

- React 18 + Vite
- React Router (route `/` et `/succes`)
- Tailwind CSS (design system futuriste/premium : gradients, glassmorphism, glow, animations)
- Aucun backend, aucune base de données, aucun stockage de données sensibles

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:5173`.

## Build de production

```bash
npm run build
npm run preview   # pour prévisualiser le build localement
```

Le build est généré dans `dist/`.

## Déploiement sur Netlify (via GitHub)

1. Pousser ce dépôt sur GitHub.
2. Sur [Netlify](https://app.netlify.com), cliquer sur **Add new site → Import an
   existing project**, puis sélectionner le dépôt GitHub.
3. Netlify détecte automatiquement `netlify.toml` :
   - Build command : `npm run build`
   - Publish directory : `dist`
4. Déployer. Les redirections SPA (nécessaires pour la route `/succes`) sont
   déjà configurées dans `netlify.toml`.

Aucune variable d'environnement n'est nécessaire : l'endpoint MoneyFusion est
appelé directement depuis le frontend.

## Logo

Le vrai logo Digitorizon est intégré dans `src/assets/logo.png` et utilisé par
`src/components/Logo.jsx`. Le fichier a un fond transparent avec le texte
"torizon" en blanc : sur fond sombre (header) il s'affiche directement, sur
fond clair (footer, page succès) il est automatiquement placé dans une
pastille navy pour rester lisible (`variant="dark"`, valeur par défaut du
composant). Pour remplacer le fichier, il suffit d'écraser `src/assets/logo.png`.

## Paiement MoneyFusion

- Endpoint appelé : `https://pay.moneyfusion.net/Webinaire_Digitorizon/2742ead9add4277d/pay/`
- Au clic sur le bouton de paiement (dans le pop-up de réservation), le
  frontend envoie une requête `POST` avec les informations du client et de
  l'offre, puis redirige vers l'URL de paiement renvoyée par MoneyFusion
  (`data.url`). MoneyFusion ajoute automatiquement le token de la transaction
  en paramètre de la `return_url` fournie (`?token=...`).
- La page `/succes` lit ce token dans l'URL et appelle
  `GET https://www.pay.moneyfusion.net/paiementNotif/{token}` pour vérifier le
  statut réel de la transaction (`src/utils/payment.js`,
  fonction `checkPaymentStatus`). Elle affiche ensuite un état différent selon
  le statut retourné : succès (`paid`), en attente (`pending`), échec
  (`failed` / `no paid`), ou erreur générique si le token est absent/invalide
  ou l'appel échoue.

## Offre mise en avant

La carte "Croissance Digitale" est marquée `featured: true` dans
`src/data/offers.js` : badge "⭐ Offre recommandée", carte surélevée/agrandie
et bordure lumineuse plus marquée. Pour changer l'offre mise en avant, déplacer
le flag `featured` sur une autre entrée du tableau.

## Preuve sociale

Un petit toast ("Untel vient de réserver l'offre X") apparaît périodiquement
en bas à gauche de l'écran (`src/components/SocialProofToast.jsx`). C'est une
simulation 100% côté client (noms et offres tirés au hasard, intervalle
aléatoire) — aucune vraie donnée de réservation n'est utilisée.

## Structure du projet

```
src/
  components/   Header, Footer, Logo, OfferCard, OfferSelection, Modal,
                CustomerForm, Reveal (animation au scroll),
                SocialProofToast, BackgroundFX (fonds décoratifs)
  pages/        Home (page principale), Success (/succes)
  data/         offers.js (contenu des 3 offres)
  hooks/        useReveal.js (IntersectionObserver pour les animations au scroll)
  utils/        validation.js, payment.js (création + vérification du paiement)
  styles/       index.css (directives Tailwind + styles globaux)
```
