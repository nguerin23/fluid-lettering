# Plénée-Jugon — Charte graphique simplifiée

**Site :** https://nguerin23.github.io/fluid-lettering/

Une **proposition graphique non officielle** de Plénée-Jugon, organisée en **6 pages courtes** :

1. **Logo** — le logo fourni en source, avec versions monochromes bleu nuit / blanc ; téléchargement SVG.
2. **Typographies** — Outfit pour les titres, Manrope pour le texte. Inspiration du style géométrique de Nuuday 2025 ; Nuu Type (police propriétaire) n'est pas distribuée.
3. **Couleurs** — six nuances de bleu avec codes HEX copiables.
4. **Pictogrammes** — **300 icônes SVG distinctes**, regroupées en **20 thématiques municipales**, chacune avec **3 tags au maximum**. Recherche par nom, tag ou thématique. Aperçu détaillé, copie du SVG et téléchargement indépendant.
5. **Facebook 4:5** — **2 modèles uniquement** : **« Événements à venir »**, avec photo, titre, frise verticale et de 1 à 8 événements (date, heure, lieu, titre et description), et **« Info pratique »**, avec photo pleine largeur en haut, **3 balises de mots-clés** et **exactement 3 lignes de texte** personnalisables. Export PNG **1080 × 1350** local.
6. **Fluid** — générateur Pacifico et studio de dessin libre avec lissage, épaisseur, dégradé bleu et exports SVG/PNG. Les contrôles et le rendu d'origine sont conservés, mais l'affichage embarqué masque le second en-tête.

La navigation est horizontale et adaptée au mobile. Le site s'ouvre directement sur **Logo**. Les anciens liens d'accueil redirigent vers cette page.

## Fichiers

- `index.html` — site principal, 6 pages, navigation et palette.
- `pictogrammes-data.js` — 300 tracés SVG Lucide sélectionnés, noms français, 3 tags au maximum, 15 icônes dans chacune des 20 thématiques.
- `pictogrammes.js`, `pictogrammes.css` — recherche par tags, filtres, affichage progressif (48 à la fois), copie et téléchargement SVG.
- `PICTOGRAMMES-LUCIDE-LICENSE.txt` — mentions de la licence libre ISC et attribution Lucide.
- `facebook-posts.css`, `facebook-posts.js` — deux modèles Facebook, formulaires et export PNG.
- `facebook-evenements.js` — frise « Événements à venir », saisie de 1 à 8 dates/horaires/lieux/titres/descriptions, alternance gauche/droite et affichage adapté.
- `fluid-lettering.html`, `signature-studio.js`, `signature-studio.css` — atelier de lettrage et dessin libre.
- `logo-plenee-jugon-monochrome-bleu-nuit.svg` — logo vectoriel issu du PDF fourni, intégralement bleu nuit (#070B66).
- `logo-plenee-jugon-monochrome-blanc.svg` — le même logo vectoriel, intégralement blanc pour fond bleu nuit.
- `logo-plenee-jugon-concept.svg` — ancien lien conservé pour compatibilité (redirigé graphiquement vers le logo source).

Le logo source fourni, incluant le lettrage **Plénée-Jugon** et ses **cinq pictogrammes**, remplace le monogramme pixelisé provisoire dans l'en-tête et dans les deux cartes de la rubrique Logo. Les visuels Facebook utilisent aussi ces fichiers SVG monochromes.

## Identité visuelle

Palette **inspirée** du rapport Nuuday 2025, sans revendiquer les valeurs officielles : bleu nuit `#070B66`, bleu électrique `#3152F4`, azur `#7C99F7`, pastel `#C9D6FF`, brume `#E6ECFF`, givré `#F7F9FF`.

Les polices d'interface sont chargées via Google Fonts (Outfit et Manrope). Le projet reste un prototype créatif public, **non validé par la commune**. Les visuels tiers éventuels doivent faire l'objet d'une vérification de droits avant publication.

## Publication

Site statique GitHub Pages depuis la branche `main`. `fluid-lettering.html` est aussi accessible seul ; avec `?embed=1`, il affiche sa version minimaliste pour intégration.

## Source et style des pictogrammes

Le catalogue de 300 icônes a été sélectionné dans [Lucide](https://lucide.dev/icons), collection vectorielle sous licence [ISC](PICTOGRAMMES-LUCIDE-LICENSE.txt). Les données SVG ont été récupérées depuis [le miroir libre Iconify](https://github.com/iconify/icon-sets/blob/master/json/lucide.json).

Les pictogrammes sont **harmonisés en bleu nuit** (`#070B66`), avec une épaisseur de **1,5 unité sur une grille 24 × 24**, sans remplissage et avec des extrémités et jointures arrondies. Ce traitement évoque la finesse des cinq pictogrammes du logo fourni, mais les 300 motifs sont ceux de Lucide, **pas des dessins originaux de la commune**.

Les tags servent à rechercher par exemple `mairie`, `conseil`, `école`, `EHPAD`, `commerces`, `agriculture`, `eau`, `bâtiments`, `santé`, `travaux`, `mobilité`, `nature`, etc. Une sélection affiche jusqu'à 48 résultats, puis un bouton « Afficher plus » permet de parcourir le reste du catalogue.

## Modèle Facebook « Événements à venir »

Le haut du visuel 4:5 réserve toute la largeur à une **photo de couverture** (facultative) puis à un **titre**, avant le départ de la frise. Chaque événement est disposé alternativement à gauche ou à droite de la ligne verticale. Un marqueur et un connecteur horizontal matérialisent sa position.

L'éditeur propose jusqu'à **8 événements**. Les champs sont **Date**, **Heure**, **Titre de l’événement**, **Lieu** et **Description brève**. Les événements sont triés automatiquement selon la date et l'heure dans l'image, tout en préservant l'ordre de saisie dans le formulaire. Les champs restent entièrement modifiables. Trois **exemples fictifs** sont préremplis pour montrer la composition ; remplacez-les par les informations réelles avant publication. Pour les séries de 6 à 8 événements, les tailles de caractères et la longueur du texte affiché sont automatiquement ajustées (les descriptions longues sont abrégées dans l'aperçu).

Une signature monochrome issue du vrai logo Plénée-Jugon figure en bas à gauche. Aucun événement ni aucune photo n'est envoyé à un serveur : tout est calculé localement dans le navigateur, puis exporté en PNG 1080 × 1350.

## Modèle Facebook « Info pratique »

Cette publication comporte uniquement, dans cet ordre : **photo de couverture pleine largeur** (ou visuel de remplacement), **trois balises de mots-clés**, puis **trois lignes d'information** saisies individuellement. Une signature monochrome du logo communal reste discrètement en pied de visuel. Les trois balises et les trois lignes sont modifiables ; leurs tailles s'ajustent pour tenir sur chaque ligne. Aucun titre, texte supplémentaire, date ou encart ne vient encombrer cette composition. Le format exporté est 1080 × 1350 px.

L'éditeur Facebook ne propose plus que les deux modèles `evenements` et `pratique`. Les anciens modèles « Annonce », « Événement » et « En images » ont été retirés de l'interface.
