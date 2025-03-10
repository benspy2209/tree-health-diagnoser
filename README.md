
# Diagnostic de Santé des Arbres

## À propos du projet

Cette application web permet de diagnostiquer l'état de santé des arbres à partir d'images et de questions interactives.

## URL du projet

**URL Lovable**: https://lovable.dev/projects/b32908dd-8204-4a8a-a6df-93ca10515111
**URL GitHub**: https://github.com/Benspy22/plumeok

## Comment cloner correctement ce projet

Pour cloner et exécuter ce projet, suivez ces étapes précises :

```sh
# Étape 1: Cloner le dépôt dans un nouveau dossier
# Assurez-vous de ne pas être déjà dans un dossier "plumeok"
git clone https://github.com/Benspy22/plumeok.git

# Étape 2: Aller dans le répertoire du projet
cd plumeok

# Étape 3: S'assurer que package.json contient tous les scripts nécessaires
# Si le fichier package.json ne contient pas de script "dev", ajoutez-le :
# {
#   "scripts": {
#     "dev": "vite",
#     "build": "vite build",
#     "preview": "vite preview"
#   }
# }

# Étape 4: Installer les dépendances
npm install

# Étape 5: Démarrer le serveur de développement
npm run dev
```

Si vous rencontrez l'erreur "Missing script: dev", c'est que votre package.json ne contient pas ce script. Vous devez l'ajouter manuellement ou télécharger directement le code source depuis Lovable.

## Comment connecter ce projet à GitHub

Pour connecter ce projet à votre dépôt GitHub:

1. Dans l'interface Lovable, cliquez sur l'icône **Share** (Partager) en haut à droite de l'écran
2. Sélectionnez l'option **GitHub** ou **Export to GitHub**
3. Suivez les instructions pour autoriser Lovable à accéder à votre compte GitHub
4. Sélectionnez le dépôt existant: https://github.com/Benspy22/plumeok

## Technologies utilisées

Ce projet utilise:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion

## Déploiement

Pour déployer ce projet:

1. Ouvrez [Lovable](https://lovable.dev/projects/b32908dd-8204-4a8a-a6df-93ca10515111)
2. Cliquez sur Partager -> Publier

## Utilisation d'un domaine personnalisé

Si vous souhaitez déployer ce projet sous votre propre domaine, nous recommandons d'utiliser Netlify. Consultez notre documentation pour plus de détails: [Domaines personnalisés](https://docs.lovable.dev/tips-tricks/custom-domain/)
