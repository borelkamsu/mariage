# RSVP - Mariage de Q & C

Application de confirmation de présence avec formulaire invité,
accompagnateurs dynamiques, stockage MongoDB Atlas et tableau de bord privé.

## Installation locale

1. Installez les dépendances :

   ```bash
   npm install
   ```

2. Copiez `.env.example` vers `.env.local` et renseignez les variables.

3. Lancez le site :

   ```bash
   npm run dev
   ```

Le formulaire est disponible sur `http://localhost:3000` et l’administration
sur `http://localhost:3000/admin`.

## Mise en ligne gratuite

Le projet peut être hébergé gratuitement sur Vercel avec MongoDB Atlas.

Variables à ajouter dans Vercel :

- `MONGODB_URI`
- `ADMIN_PASSWORD`
- `AUTH_SECRET`

Ne configurez pas `MONGODB_TLS_ALLOW_INVALID_CERTIFICATES` sur Vercel. Cette
option sert uniquement au réseau local actuel.

Après le déploiement, le formulaire est disponible à la racine du domaine et
le tableau de bord privé sur `/admin`.
