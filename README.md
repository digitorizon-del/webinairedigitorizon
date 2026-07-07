# Digitorizon — Landing page webinaire

Landing page one-page (offres + paiement d'acompte) pour le webinaire Digitorizon
du 12 juillet 2026. React + Vite, 100% statique, sans backend. Le paiement de
l'acompte de 10 000 FCFA passe directement du navigateur vers l'API MoneyFusion.

## Stack

- React 18 + Vite
- React Router (route `/` et `/succes`)
- CSS pur (aucune dépendance UI), charte graphique Digitorizon
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

Le header/footer utilise actuellement un logo texte généré (`src/components/Logo.jsx`).
Pour utiliser le vrai logo Digitorizon :

1. Déposer le fichier (SVG ou PNG) dans `src/assets/logo.svg` (ou `.png`).
2. Dans `src/components/Logo.jsx`, remplacer le contenu par une balise `<img>`
   pointant vers ce fichier.

## Compteur de places restantes

Le compteur affiché sur chaque carte d'offre est **fictif** (aucune base de
données) : il décroît linéairement en fonction du temps entre la mise en ligne
du site et la date du webinaire, jusqu'à un minimum de 1 place. La logique est
dans `src/utils/seats.js` — les dates de référence (mise en ligne / webinaire)
y sont codées en dur et modifiables si besoin.

## Paiement MoneyFusion

- Endpoint appelé : `https://pay.moneyfusion.net/Webinaire_Digitorizon/2742ead9add4277d/pay/`
- Au clic sur le bouton de paiement, le frontend envoie une requête `POST`
  avec les informations du client et de l'offre, puis redirige vers l'URL de
  paiement renvoyée par MoneyFusion (`data.url`).
- La page `/succes` (`return_url`) affiche un message de remerciement
  générique, car MoneyFusion ne transmet pas de façon fiable le statut du
  paiement dans les paramètres d'URL de retour. Pour une vérification fiable
  du statut réel du paiement, l'endpoint
  `GET https://www.pay.moneyfusion.net/paiementNotif/{token}` peut être
  utilisé (non implémenté ici, cf. logique dans `src/utils/payment.js` si vous
  souhaitez l'ajouter).

## Structure du projet

```
src/
  components/   Header, Footer, Logo, OfferCard, OfferSelection, CustomerForm
  pages/        Home (page principale), Success (/succes)
  data/         offres.js (contenu des 3 offres)
  utils/        seats.js (compteur de places), validation.js, payment.js
  styles/       index.css (design system Digitorizon)
```
