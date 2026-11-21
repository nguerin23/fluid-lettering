# Plénée-Jugon — Charte graphique simplifiée

**Site :** https://nguerin23.github.io/fluid-lettering/

Une **proposition graphique non officielle** de Plénée-Jugon, organisée en **6 pages courtes** :

1. **Logo** — le logo fourni en source, avec versions monochromes bleu nuit / blanc ; téléchargement SVG.
2. **Typographies** — Outfit pour les titres, Manrope pour le texte. Inspiration du style géométrique de Nuuday 2025 ; Nuu Type (police propriétaire) n'est pas distribuée.
3. **Couleurs** — six nuances de bleu avec codes HEX copiables.
4. **Pictogrammes** — **300 icônes SVG distinctes**, regroupées en **20 thématiques municipales**, chacune avec **3 tags au maximum**. Recherche par nom, tag ou thématique. Aperçu détaillé, copie du SVG et téléchargement indépendant.
5. **Facebook 4:5** — **2 maquettes fixes, sans saisie** : **« Événements à venir »** avec 8 événements fictifs (date, heure, lieu, titre, courte description) sur une frise verticale alternée, et **« Info pratique »** avec photo pleine largeur, 3 balises et 3 lignes de texte alignées à gauche. Le logo communal figure en bas à droite dans les deux visuels. Export PNG **1080 × 1350**.
6. **Fluid** — générateur Pacifico et studio de dessin libre avec lissage, épaisseur, dégradé bleu et exports SVG/PNG. Les contrôles et le rendu d'origine sont conservés, mais l'affichage embarqué masque le second en-tête.

La navigation est horizontale et adaptée au mobile. Le site s'ouvre directement sur **Logo**. Les anciens liens d'accueil redirigent vers cette page.

## Fichiers

- `index.html` — site principal, 6 pages, navigation et palette.
- `pictogrammes-data.js` — 300 tracés SVG Lucide sélectionnés, noms français, 3 tags au maximum, 15 icônes dans chacune des 20 thématiques.
- `pictogrammes.js`, `pictogrammes.css` — recherche par tags, filtres, affichage progressif (48 à la fois), copie et téléchargement SVG.
- `PICTOGRAMMES-LUCIDE-LICENSE.txt` — mentions de la licence libre ISC et attribution Lucide.
- `facebook-posts.css`, `facebook-posts.js` — sélecteur de deux modèles fixes, dessin Canvas et export PNG.
- `facebook-fluid.js` — trait Fluid unique, épais et bleu nuit, sur toute la largeur en bas des deux publications Facebook.
- `facebook-evenements.js` — huit événements de démonstration fixes et moteur de rendu d’une frise verticale alternée.
- `images/plenee-jugon-mediatheque-banniere.jpg` — photographie source fournie par l’utilisateur (IMG_5143.jpeg), recadrée pour les couvertures des deux publications.
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

## Maquettes Facebook fixes

Les deux modèles utilisent la **même photographie source de Plénée-Jugon**, montrant la médiathèque et sa fontaine (`IMG_5143.jpeg`), recadrée en JPEG pour le site. Le logo vectoriel de la commune apparaît en **blanc sur le large ruban Fluid bleu nuit**, en bas à droite.

- **Événements à venir** : photo pleine largeur raccourcie à **218 px** sur 1350, puis un bandeau titre bleu nuit **moins large (948 px) et moins haut (116 px)**. Les **huit événements fictifs** alternent gauche/droite. Date, heure et lieu sont sur la même ligne avec des séparateurs `|` davantage espacés, des couleurs distinctes et des caractères renforcés. Le titre est suivi d'une **description sur deux à trois lignes**, avec retour à la ligne automatique. « Agenda | Événements fictifs » figure en blanc sur le ruban inférieur.
- **Info pratique** : couverture photographique pleine largeur raccourcie à 500 px, puis **3 petites balises fixes** (`INFORMATION`, `SERVICES`, `MAIRIE`) **alignées à gauche**. Sous les balises, une information fictive est composée sur **3 lignes alignées à gauche** : « Accueil exceptionnellement fermé », « jeudi après-midi à la mairie », « Merci de votre compréhension. ». Une mention discrète « Exemple fictif » reste visible.

Les deux modèles se terminent par **un seul ruban Fluid monochrome bleu nuit** (`#070B66`), désormais **plus épais (166 px)** et occupant toute la largeur. Les dégradés, courbes secondaires, ombres et fonds décoratifs restent supprimés. Le **logo officiel blanc est directement posé sur ce ruban**, en bas à droite, tandis que les mentions de maquette figurent à gauche en blanc. Le ruban commence sous les événements.

**Aucune saisie, aucun téléversement d’image et aucun bouton d’ajout ou de suppression** n’apparaissent dans la rubrique : seul le choix entre les deux modèles et le téléchargement PNG 1080 × 1350 sont disponibles. Le rendu s’effectue localement dans le navigateur.

Ces contenus sont des **maquettes fictives** et ne doivent pas être publiés comme des informations réelles sans remplacement préalable des textes dans le code.
