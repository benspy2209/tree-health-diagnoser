
# Diagnostic de Santé des Arbres

## À propos du projet

Cette application web permet de diagnostiquer l'état de santé des arbres à partir d'images et de questions interactives.

## URL du projet

**URL de déploiement cible**: https://www.plumridge.be/diagnostic/

**Note sur le dépôt GitHub**: Le dépôt GitHub n'est pas encore créé ou accessible publiquement. Les instructions ci-dessous concernent la configuration locale du projet.

## Comment créer et configurer ce projet localement

Pour créer et configurer ce projet localement, suivez ces étapes:

```sh
# Étape 1: Créer un dossier pour le projet
mkdir tree-health-diagnoser
cd tree-health-diagnoser

# Étape 2: Initialiser le projet
git init
npm init -y

# Étape 3: Installer les dépendances
npm install react react-dom react-router-dom vite @vitejs/plugin-react-swc framer-motion tailwindcss postcss autoprefixer

# Étape 4: Démarrer le serveur de développement
npm run dev
```

## Comment créer le dépôt GitHub pour ce projet

Pour créer un nouveau dépôt GitHub pour ce projet:

1. Connectez-vous à votre compte GitHub
2. Cliquez sur "New repository" (Nouveau dépôt)
3. Nommez le dépôt "tree-health-diagnoser"
4. Choisissez les paramètres de visibilité (public ou privé)
5. Cliquez sur "Create repository" (Créer le dépôt)
6. Suivez les instructions pour pousser un dépôt existant:
   ```sh
   git remote add origin https://github.com/VOTRE-NOM-UTILISATEUR/tree-health-diagnoser.git
   git branch -M main
   git push -u origin main
   ```

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

1. Ouvrez l'interface Lovable de ce projet
2. Cherchez les trois points (**...**) en haut à droite
3. Sélectionnez l'option **Déployer** ou **Publier**

### Déploiement sur plumridge.be

Pour déployer sur votre site à l'URL https://www.plumridge.be/diagnostic/ :

1. Exécutez `npm run build` pour générer les fichiers de production dans le dossier `dist`
2. Transférez tout le contenu du dossier `dist` vers le sous-répertoire `/diagnostic/` de votre serveur web
3. Assurez-vous que votre serveur web est configuré pour servir correctement les applications SPA (Single Page Application)
   - Si vous utilisez Apache, créez un fichier `.htaccess` avec:
     ```
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /diagnostic/
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /diagnostic/index.html [L]
     </IfModule>
     ```
   - Si vous utilisez Nginx, ajoutez dans votre configuration:
     ```
     location /diagnostic/ {
       try_files $uri $uri/ /diagnostic/index.html;
     }
     ```

## Utilisation d'un domaine personnalisé

Si vous souhaitez déployer ce projet sous un autre domaine, nous recommandons d'utiliser Netlify ou Vercel. Consultez la documentation Lovable pour plus de détails: [Domaines personnalisés](https://docs.lovable.dev/tips-tricks/custom-domain/)
