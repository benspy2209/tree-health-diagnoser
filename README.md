
# Diagnostic de Santé des Arbres

## À propos du projet

Cette application web permet de diagnostiquer l'état de santé des arbres à partir d'images et de questions interactives.

## URL du projet

**URL de déploiement cible**: https://www.plumridge.be/diagnostic/
**URL GitHub**: https://github.com/benspy2209/tree-health-diagnoser

## Comment cloner correctement ce projet

Pour cloner et exécuter ce projet, suivez ces étapes précises :

```sh
# Étape 1: Cloner le dépôt dans un nouveau dossier
# Assurez-vous de ne pas être déjà dans un dossier "tree-health-diagnoser"
git clone https://github.com/benspy2209/tree-health-diagnoser.git

# Étape 2: Aller dans le répertoire du projet
cd tree-health-diagnoser

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

1. Dans l'interface Lovable, cherchez les trois points (**...**) ou le bouton de menu en haut à droite de l'écran
2. Dans le menu déroulant, sélectionnez **Exporter vers GitHub** ou une option similaire
3. Suivez les instructions pour autoriser Lovable à accéder à votre compte GitHub
4. Sélectionnez le dépôt existant: https://github.com/benspy2209/tree-health-diagnoser

## Technologies utilisées

Ce projet utilise:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion

## Déploiement

### Déploiement via Lovable

Pour déployer ce projet via Lovable:

1. Ouvrez [Lovable](https://lovable.dev/projects/b32908dd-8204-4a8a-a6df-93ca10515111)
2. Cherchez les trois points (**...**) ou le bouton de menu en haut à droite
3. Sélectionnez l'option **Déployer** ou **Publier**

Si vous ne voyez pas ces options, essayez de:
- Vérifier si votre navigateur affiche tous les éléments de l'interface (zoom, extensions, etc.)
- Rafraîchir la page et vous reconnecter si nécessaire
- Contacter le support de Lovable via leur Discord pour obtenir de l'aide spécifique

### Déploiement sur plumridge.be

Pour déployer sur votre site à l'URL https://www.plumridge.be/diagnostic/ :

1. Exécutez `npm run build` pour générer les fichiers de production dans le dossier `dist`
2. Transférez tout le contenu du dossier `dist` vers le sous-répertoire `/diagnostic/` de votre serveur web
3. Assurez-vous que votre serveur web est configuré pour servir correctement les applications SPA (Single Page Application)
   - Si vous utilisez Apache, assurez-vous d'avoir un fichier `.htaccess` qui redirige les requêtes vers `index.html`
   - Si vous utilisez Nginx, configurez le serveur pour rediriger vers `index.html` pour les routes non trouvées

## Utilisation d'un domaine personnalisé

Si vous souhaitez déployer ce projet sous un autre domaine, nous recommandons d'utiliser Netlify. Consultez notre documentation pour plus de détails: [Domaines personnalisés](https://docs.lovable.dev/tips-tricks/custom-domain/)
