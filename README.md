# Fluid — EMS Allure Smooth

Générateur de lettering SVG fondé sur les véritables courbes monolinéaires de **EMS Allure Smooth**, version retravaillée par Ellen Wasbø (Cutlings), dérivée de EMS Allure / Allura. Les données des glyphes sont sous licence **SIL Open Font License 1.1**.

**Démo :** https://nguerin23.github.io/fluid-lettering/

**Sources :**
- https://cutlings.datafil.no/smoothed-single-line-fonts/
- https://github.com/msurguy/watercolor-playground/blob/main/public/fonts/single-line/Cutlings/EMS_Allure_Smooth.svg

## Fonctions

- Prévisualisation en direct pour un mot de 22 caractères maximum.
- Courbes SVG à lignes centrales ouvertes issues du SVG de la police, **sans squelettisation** et **sans raccords ajoutés artificiellement**.
- **Épaisseur** : règle `stroke-width`.
- **Espacement** : −200 à +180 ; valeurs négatives pour superposer les lettres.
- Dégradé violet → bleu → turquoise → vert **continu à l’échelle de tout le mot**. Les coordonnées des dégradés compensent le décalage de chaque glyphe pour éviter toute rupture de couleur aux changements de lettre.
- Exports **SVG et PNG** sans police installée ni serveur.
- Accents pris en charge quand les glyphes sont présents dans la police (notamment `é`, `è`, `à`, `ç`). Les autres caractères utilisent un repli approximatif.

## Fichiers actifs

- `index.html` : application et rendu SVG.
- `ems-allure-smooth.js` : 205 glyphes de la vraie police single-line lissée.
- `EMS-ALLURE-OFL.txt` : crédit des créateurs et texte de la licence.

Le bouton **Animer l’écriture** révèle les chemins dans l’ordre de tracé ; les exports SVG et PNG restent statiques. Le mot par défaut est **bonjour**.

Le site est statique, hébergé sur GitHub Pages. Pour une installation hors ligne, placer ces trois fichiers dans le même dossier.

## Attribution

Allura par Rob Leuschke (TypeSETit), EMS Allure par Sheldon B. Michaels, conversion SVG par Windell H. Oskay, lissage et ajustements par Ellen Wasbø (Cutlings). Voir `EMS-ALLURE-OFL.txt`.

**Note :** les fichiers historiques de Pecita et Mistral sont conservés dans le dépôt mais ne sont plus chargés par le site. EMS Allure Smooth ne garantit pas une liaison physique entre toutes les lettres ; la continuité visuelle dépend de l'espacement.
