# Plénée-Jugon — Charte graphique et Fluid Lettering

**Site interactif :** https://nguerin23.github.io/fluid-lettering/

Ce dépôt héberge la **charte graphique expérimentale de Plénée-Jugon**, simplifiée à **5 onglets**, ainsi que le générateur Fluid Lettering intégré à son cinquième onglet.

## Identité visuelle — inspiration Nuuday 2025

La version actuelle reprend **l'univers de bleus et la typographie géométrique** observés dans le document *Nuuday Annual Report 2025* fourni pour ce projet (pages d'introduction, sommaire et contenus chiffrés). Il s'agit d'une **interprétation**, et non d'une reproduction certifiée de la charte Nuuday ; les codes ci-dessous ne sont pas présentés comme des valeurs officielles.

### Palette numérique (HEX)

| Couleur | HEX | Utilisation |
| --- | --- | --- |
| Bleu nuit | `#070B66` | Texte, boutons primaires, sections sombres |
| Bleu électrique | `#3152F4` | Accents, navigation et appels |
| Bleu azur | `#7C99F7` | Éléments secondaires |
| Bleu pastel | `#C9D6FF` | Surfaces graphiques et blocs |
| Bleu brume | `#E6ECFF` | Fonds secondaires |
| Bleu givré | `#F7F9FF` | Fond principal |

Les dégradés de l'atelier Fluid et des traits manuscrits SVG ont également été adaptés à une gamme exclusivement bleue. La logique du tracé, du lissage, de l'épaisseur, des exports et de l'ombre aux intersections demeure inchangée.

### Typographies

- **Outfit** : titres, grands intertitres, signature et navigation.
- **Manrope** : textes courants, formulaires et commandes.
- **Pacifico** : police de dessin du mot dans l'atelier Fluid (inchangée).

Nuuday a une fonte sur mesure appelée **Nuu Type**. Cette fonte propriétaire n'a pas été incluse dans les fichiers accessibles pour le site. Outfit et Manrope sont des alternatives web courantes, choisies pour une proximité d'ambiance et non pour prétendre reproduire la police originale. Ces deux fontes sont servies via Google Fonts avec des polices système de secours.

La navigation présente désormais **5 rubriques uniquement**. Les anciennes rubriques sont masquées dans l'interface pour préserver la compatibilité des composants existants. La charte de Plénée-Jugon demeure un **prototype non officiel**.

## Navigation — 5 onglets

1. **Logo** (`#section-2`) : signature typographique, monogramme pixelisé, version claire et inversée, téléchargement du concept SVG.
2. **Typographies** (`#section-4`) : inspiration du PDF Nuuday 2025, Outfit pour les titres et Manrope pour les textes.
3. **Couleurs** (`#section-3`) : nuancier de six bleus inspirés de Nuuday, valeurs HEX, RVB et CMJN indicatifs.
4. **Publications Facebook** (`#section-facebook`) : outil interactif avec quatre modèles au format vertical 4:5.
5. **Générateur Fluid** (`#section-16`) : atelier Pacifico, lissage et dessin à main levée, export SVG/PNG.

L'ouverture de `index.html` affiche directement l'onglet **Logo**. La navigation et la pagination sont limitées aux cinq rubriques ; les anciens liens d'accueil sont redirigés vers le logo.

## Modèles Facebook 4:5

- **Annonce** — communication institutionnelle.
- **Événement** — dates, manifestations et rendez-vous.
- **En images** — photo facultative ajoutée depuis l'ordinateur / téléphone.
- **Info pratique** — services, consignes et alertes.

Les cinq champs textuels sont modifiables. **Télécharger le PNG 4:5** produit un fichier **1080 × 1350 px** avec une mise en page en bleus et des textes composés en Outfit / Manrope. Le rendu est dessiné localement avec Canvas : aucun contenu n'est téléversé.

Les fichiers dédiés sont `facebook-posts.js` (rendu Canvas, personnalisation, export PNG) et `facebook-posts.css` (interface responsive).

## Fichiers

- `index.html` — charte interactive, cinq onglets, nuancier, logo, typo et module Facebook.
- `fluid-lettering.html` — éditeur de lettering autonome, également embarqué dans le cinquième onglet.
- `logo-plenee-jugon-concept.svg` — monogramme conceptuel vectoriel (non officiel).

## Fluid Lettering

- Police unique **Pacifico** — `font-packs/pacifico.json`.
- Texte initial **bonjour** ; l'exemple **Make** reste disponible.
- Épaisseur par défaut **255**, espacement par défaut **−115**, réglages conservés.
- Dégradé qui suit la longueur estimée des traits et les courbes de la police.
- Ombre sur les chevauchements à **50 %** pour le relief, sans halo extérieur.
- Dessin libre au doigt/souris/stylet, exports **SVG** et **PNG**.

Les scripts de dessin et les ressources Pacifico sont préservés ; le studio a uniquement reçu les nouvelles couleurs et typographies d'interface. Les licences restent détaillées dans `FONT-LICENSES.md`.

## Statut et visibilité

La charte est un **prototype créatif non officiel, à valider** ; elle ne constitue pas la charte approuvée de la commune. Les photographies et autres contenus tiers requièrent une vérification de leurs droits avant réutilisation.

**Attention : ce dépôt est public.** La version de la charte intégrée depuis `charte-plenee-jugon` (dépôt source privé, laissé inchangé) est donc visible publiquement sur ce site.

## Publication

Site statique compatible avec GitHub Pages, depuis la branche `main` et le dossier racine `/`. Depuis le répertoire du dépôt, ouvrir `index.html` pour consulter la charte, ou `fluid-lettering.html` pour l'atelier autonome.
