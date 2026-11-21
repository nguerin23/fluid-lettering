/* 300 pictogrammes Lucide / ISC, voir PICTOGRAMMES-LUCIDE-LICENSE.txt. */
(() => {
  'use strict';
  const icons = window.PJ_PICTOGRAMS;
  if (!Array.isArray(icons) || icons.length !== 300) {
    const error = document.getElementById('pictoCount');
    if (error) error.textContent = 'Le catalogue est indisponible.';
    return;
  }
  const $ = id => document.getElementById(id);
  const search = $('pictoSearch'), theme = $('pictoTheme'), grid = $('pictoGrid');
  const count = $('pictoCount'), more = $('pictoMore'), clear = $('pictoClear'), empty = $('pictoEmpty');
  const dialog = $('pictoDialog'), dialogIcon = $('pictoDialogIcon'), dialogName = $('pictoDialogName');
  const dialogTags = $('pictoDialogTags'), status = $('pictoDialogStatus');
  const copy = $('pictoCopy'), download = $('pictoDownload'), close = $('pictoClose');
  const normalize = x => String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const themes = [...new Set(icons.map(x => x.theme))];
  const index = new Map(icons.map(x => [x.id, x]));
  let matches = icons, visibleCount = 48, selected = null;
  for (const title of themes) {
    const option = document.createElement('option');
    option.value = title;
    option.textContent = title;
    theme.append(option);
  }
  const svg = (item, downloadable = false) =>
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
    (downloadable ? 'width="240" height="240" ' : '') +
    'style="color:#070B66" aria-label="' + escape(item.name) + '">' + item.svg + '</svg>';
  const card = item => {
    const tags = item.tags.slice(0,3).map(t => '<button class="picto-tag" type="button" data-tag="' + escape(t) + '" title="Rechercher : ' + escape(t) + '">' + escape(t) + '</button>').join('');
    return '<article class="picto-card"><button class="picto-select" type="button" data-icon="' +
      escape(item.id) + '" aria-label="Voir et télécharger ' + escape(item.name) + '">' +
      svg(item) + '<span class="picto-name">' + escape(item.name) + '</span></button>' +
      '<div class="picto-tags">' + tags + '</div></article>';
  };
  function render(reset = false) {
    if (reset) visibleCount = 48;
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    const chosenTheme = theme.value;
    matches = icons.filter(item => {
      if (chosenTheme && item.theme !== chosenTheme) return false;
      const haystack = normalize([item.name, item.id, item.theme, ...item.tags].join(' '));
      return terms.every(t => haystack.includes(t));
    });
    const shown = matches.slice(0, visibleCount);
    grid.innerHTML = shown.map(card).join('');
    count.textContent = matches.length + ' pictogramme' + (matches.length > 1 ? 's' : '') +
      ' · ' + (shown.length < matches.length ? shown.length + ' affichés' : 'sur 300 au total');
    more.hidden = shown.length >= matches.length;
    more.textContent = 'Afficher ' + Math.min(48, matches.length - shown.length) + ' pictogrammes de plus';
    empty.hidden = matches.length !== 0;
    clear.hidden = !search.value.trim() && !theme.value;
  }
  function openDetail(item) {
    selected = item;
    dialogIcon.innerHTML = svg(item);
    dialogName.textContent = item.name;
    dialogTags.replaceChildren(...item.tags.slice(0,3).map(tag => {
      const el = document.createElement('span');
      el.textContent = tag;
      return el;
    }));
    status.textContent = 'SVG vectoriel · trait 1,5 · bleu nuit #070B66';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
  }
  function saveFile(name, content) {
    const blob = new Blob([content], {type:'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  search.addEventListener('input', () => render(true));
  theme.addEventListener('change', () => render(true));
  clear.addEventListener('click', () => {
    search.value = '';
    theme.value = '';
    render(true);
    search.focus();
  });
  more.addEventListener('click', () => {
    visibleCount += 48;
    render();
  });
  grid.addEventListener('click', event => {
    const tag = event.target.closest('button[data-tag]');
    if (tag) {
      const value = tag.dataset.tag;
      if (themes.includes(value)) {
        theme.value = value; search.value = '';
      } else {
        theme.value = ''; search.value = value;
      }
      render(true);
      search.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    const button = event.target.closest('button[data-icon]');
    const item = button && index.get(button.dataset.icon);
    if (item) openDetail(item);
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  copy.addEventListener('click', async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(svg(selected, true));
      status.textContent = 'Code SVG copié.';
    } catch (err) {
      status.textContent = 'Copie indisponible : utilisez le téléchargement SVG.';
    }
  });
  download.addEventListener('click', () => {
    if (!selected) return;
    saveFile('pj-picto-' + selected.id + '.svg', svg(selected,true));
    status.textContent = 'Fichier SVG généré.';
  });
  render(true);
})();
