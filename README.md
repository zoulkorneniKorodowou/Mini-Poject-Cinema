# Mini-Projet Cinéma: Ciné WONOU

Projet académique réalisé seul.

## Contexte du projet

Un cinéma d'un petit village isolé souhaite proposer des films à l'affiche pour attirer plus de jeunes des villages alentours.
L'objectif est de concevoir une application web permettant aux clients de visualiser les films disponibles, de chercher des titres spécifiques et d'accéder aux détails de chaque œuvre.

## Fonctionnalités

### 1. Page d'accueil : index.html
- Section "À la 1e" mettant en avant une sélection de films à l'affiche.
- Section "Autres" proposant une liste de films complémentaires.
- Bouton "Charger plus de films" pour ajouter des résultats supplémentaires sans recharger la page.
- Bouton "En savoir plus" sur chaque carte pour ouvrir la fiche détaillée du film.

### 2. Page de recherche : pages/search.html
- Champ de recherche permettant de chercher des films par mot-clé via l'API OMDb.
- Affichage des résultats sous forme de grille de cartes.
- Bouton pour charger les pages de résultats suivantes.
- Message explicite affiché lorsqu'aucun film n'est trouvé.

### 3. Fiche détaillée du film : pages/movie.html
- Récupération dynamique de l'identifiant du film via les paramètres d'URL (`?id=...`).
- Affichage des informations complètes : affiche, titre, résumé, genre, acteurs, note IMDb et date de sortie DVD convertie au format français jj/mm/aaaa.

### 4. Gestion des erreurs et images manquantes
- Pour éviter les liens morts et les affiches brisées, une image d'erreur 404 de remplacement est automatiquement appliquée lorsque l'API ne retourne pas d'affiche valide (`N/A`).
- Gestion des erreurs réseau lors des requêtes vers l'API.

### 5. Responsive design
- L'interface s'adapte automatiquement à toutes les résolutions d'écran : mobile, tablette et ordinateur de bureau.

## Technologies utilisées

- HTML5
- CSS3 
- JavaScript ES6 
- API OMDb

## Structure du projet

```text
Mini-Poject-Cinema/
├── index.html                 # Page d'accueil
├── pages/
│   ├── 404.html             # Page d'erreur 404
│   ├── movie.html             # Fiche détaillée
│   └── search.html            # Moteur de recherche
├── src/
│   ├── css/
│   │   └── style_file.css     # Feuille de style responsive
│   ├── images/                # Logos et icônes
│   └── js/
│       ├── api.js             # Requêtes API OMDb
│       ├── home.js            # Logique page d'accueil
│       ├── movie.js           # Logique fiche film
│       ├── movieModel.js      # Classe Movie et gestion de certains erreurs de retour
│       └── search.js          # Logique de recherche
├── package.json
└── README.md
```

## Lancement du projet

1. Cloner le projet :
   ```bash
   git clone https://github.com/zoulkorneniKorodowou/Mini-Poject-Cinema.git
   cd Mini-Poject-Cinema
   ```

2. Ouvrir le projet :
   - Utiliser **Live Server** de VS Code (clic droit sur `index.html` > *Open with Live Server*).
   

## Auteur

Zoulkorneni Korodowou - SUPINFO
