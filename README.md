
# Diagnostic de Santé des Arbres

## À propos du projet

Cette application web permet de diagnostiquer l'état de santé des arbres à partir d'images et de questions interactives.

## URL du projet

**URL de déploiement cible**: https://www.plumridge.be/diagnostic/
**Dépôt GitHub**: https://github.com/benspy2209/tree-health-diagnoser

## Comment créer et configurer ce projet

Pour créer et configurer ce projet, suivez ces étapes:

```sh
# Étape 1: Cloner le dépôt
git clone https://github.com/benspy2209/tree-health-diagnoser.git
cd tree-health-diagnoser

# Étape 2: Installer les dépendances
npm install

# Étape 3: Démarrer le serveur de développement
npm run dev
```

## Comment contribuer à ce projet

Pour contribuer à ce projet:

1. Forkez le dépôt sur GitHub: https://github.com/benspy2209/tree-health-diagnoser
2. Clonez votre fork:
   ```sh
   git clone https://github.com/VOTRE-NOM-UTILISATEUR/tree-health-diagnoser.git
   ```
3. Créez une nouvelle branche:
   ```sh
   git checkout -b ma-nouvelle-fonctionnalite
   ```
4. Faites vos modifications et committez:
   ```sh
   git add .
   git commit -m "Description de vos modifications"
   ```
5. Poussez vers votre fork:
   ```sh
   git push origin ma-nouvelle-fonctionnalite
   ```
6. Créez une Pull Request sur GitHub

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
