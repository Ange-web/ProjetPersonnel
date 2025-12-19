# Projet Personnel - Plateforme de Services de Sécurité

Une application web React moderne offrant des services de sécurité et d'analyse pour les utilisateurs.

## 🚀 Fonctionnalités

### Authentification
- **Inscription** : Création de compte utilisateur avec validation
- **Connexion** : Authentification sécurisée
- **Redirection automatique** : Après inscription réussie, redirection vers la page de connexion

### Services de Sécurité
- **Scan d'URL** : Analyse de sécurité des URLs
- **Scan d'IP** : Vérification et analyse des adresses IP
- **Scan de ports** : Détection des ports ouverts
- **Analyse EXIF** : Extraction et analyse des métadonnées d'images

## 🛠️ Technologies Utilisées

- **Frontend** : React 19, Vite
- **Routing** : React Router DOM
- **HTTP Client** : Axios
- **Styling** : CSS3
- **Linting** : ESLint

## 📦 Installation

1. **Cloner le repository**
   ```bash
   git clone <votre-repo-url>
   cd ProjetPersonnel
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:5173
   ```

## 🏗️ Structure du Projet

```
src/
├── assets/
│   ├── components/
│   │   ├── acceuil/          # Page d'accueil
│   │   ├── log/              # Authentification (login/inscription)
│   │   └── service/          # Services de sécurité
│   └── images/               # Images et assets
├── App.jsx                   # Configuration des routes
└── main.jsx                  # Point d'entrée
```

## 🚦 Scripts Disponibles

- `npm run dev` : Lance le serveur de développement


## 🔗 Routes Disponibles

- `/` : Page d'accueil
- `/signup` : Inscription
- `/Login` : Connexion
- `/servicehome` : Page des services
- `/scanurl` : Scanner d'URL
- `/scanip` : Scanner d'IP
- `/scanport` : Scanner de ports
- `/scanexif` : Analyseur EXIF

## 🔧 Configuration

### Variables d'environnement

L'application utilise des variables d'environnement pour la configuration de l'API. Créez un fichier `.env` à la racine du projet :

```bash
# Copier le fichier d'exemple
cp .env.example .env
```

Puis modifiez le fichier `.env` avec vos paramètres :

```env
VITE_API_URL=https://ec2-16-171-143-46.eu-north-1.compute.amazonaws.com:8443
```

**Note** : Le fichier `.env` est ignoré par Git pour des raisons de sécurité. Le fichier `.env.example` contient un exemple de configuration.

## 📝 Fonctionnalités Récentes

- ✅ Redirection automatique après inscription réussie
- ✅ Gestion d'erreurs améliorée
- ✅ Configuration via variables d'environnement
- ✅ Interface utilisateur moderne et responsive
- ✅ Services de sécurité intégrés

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Projet personnel développé avec React et Vite.

---

*Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue.*
