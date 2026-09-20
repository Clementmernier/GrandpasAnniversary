# 🎉 Site anniversaire — 60 ans

Petit site web statique pour un jeu de trois énigmes.

## Fonctionnement

- Les trois énigmes ne sont pas affichées sur le site.
- Chaque réponse possède son propre champ et son propre bouton.
- Les réponses sont insensibles aux majuscules/minuscules.
- Les accents sont ignorés.
- Les espaces superflus sont ignorés.
- Une énigme trouvée reste validée après fermeture/rechargement de la page.
- Le message final apparaît lorsque les trois énigmes sont résolues.
- Aucun serveur ou backend n'est nécessaire.

## Configuration

Ouvre `script.js` et modifie :

```js
answers: {
  1: ["REPONSE1"],
  2: ["REPONSE2"],
  3: ["REPONSE3"]
}
```

Tu peux mettre plusieurs réponses acceptées :

```js
answers: {
  1: ["MARIE", "MARIE-MADELEINE"],
  2: ["TOULOUSE"],
  3: ["1966"]
}
```

Puis modifie :

```js
finalMessage: `
  <h2>Votre message ❤️</h2>
  <p>...</p>
`
```

## Attention à la confidentialité des réponses

Ce site fonctionne entièrement dans le navigateur. Les réponses attendues sont donc présentes dans le fichier JavaScript envoyé au navigateur.

Cela signifie qu'une personne techniquement curieuse pourrait inspecter le code source et trouver les réponses.

Pour un jeu familial où l'objectif est simplement d'éviter d'afficher les énigmes et les réponses directement à l'écran, c'est généralement suffisant.

## Déploiement sur GitHub Pages

1. Crée un dépôt GitHub.
2. Mets `index.html`, `style.css`, `script.js` et `README.md` à la racine.
3. Dans le dépôt : **Settings → Pages**.
4. Dans **Build and deployment**, choisis :
   - Source : `Deploy from a branch`
   - Branch : `main`
   - Folder : `/ (root)`
5. Enregistre.

GitHub Pages fournira alors une adresse du type :

`https://TON-COMPTE.github.io/NOM-DU-DEPOT/`

## Réinitialiser le jeu

La progression est stockée dans le `localStorage` du navigateur.

Pour recommencer :

- soit utiliser un autre navigateur/appareil ;
- soit ouvrir les outils développeur et supprimer le stockage du site ;
- soit changer `storageKey` dans `script.js`.

Exemple :

```js
storageKey: "anniversaire-60-ans-progression-v2"
```

Cela crée une nouvelle progression.
