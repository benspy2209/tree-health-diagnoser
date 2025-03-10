
# Diagnostic de Santé des Arbres

## À propos du projet

Cette application web permet de diagnostiquer l'état de santé des arbres à partir d'images et de questions interactives.

## URL du projet

**URL de déploiement cible**: https://www.plumridge.be/diagnostic/

## Comment créer et configurer ce projet

Pour créer et configurer ce projet, suivez ces étapes:

```sh
# Étape 1: Créer un nouveau dossier pour votre projet
mkdir diagnostic-sante-arbres
cd diagnostic-sante-arbres

# Étape 2: Initialiser un nouveau dépôt Git
git init

# Étape 3: Créer un fichier package.json basique
npm init -y

# Étape 4: Installer les dépendances de base
npm install react react-dom react-router-dom vite @vitejs/plugin-react-swc

# Étape 5: Ajouter les scripts nécessaires à package.json
# {
#   "scripts": {
#     "dev": "vite",
#     "build": "vite build",
#     "preview": "vite preview"
#   }
# }

# Étape 6: Démarrer le serveur de développement
npm run dev
```

## Comment exporter ce projet vers GitHub

Pour exporter ce projet vers un dépôt GitHub:

1. Créez un nouveau dépôt sur GitHub
2. Liez votre dépôt local au dépôt distant:
   ```sh
   git remote add origin https://github.com/VOTRE-NOM-UTILISATEUR/VOTRE-DEPOT.git
   ```
3. Ajoutez vos fichiers:
   ```sh
   git add .
   ```
4. Committez vos changements:
   ```sh
   git commit -m "Premier commit"
   ```
5. Poussez vers GitHub:
   ```sh
   git push -u origin main
   ```

Si vous utilisez Lovable:
1. Dans l'interface Lovable, cherchez les trois points (**...**) ou le bouton de menu en haut à droite
2. Sélectionnez **Exporter vers GitHub**
3. Suivez les instructions pour créer ou sélectionner un dépôt

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
