/* Fluid Lettering — studio de dessin à main levée (SVG, sans dépendance).
 * Les traits sont combinés dans un masque SVG ; le dégradé n'est appliqué
 * qu'une seule fois. Ainsi, les croisements restent opaques et uniformes.
 */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const dialog = $('drawingDialog');
  const pad = $('drawingPad');
  if (!dialog || !pad) return;
  if (!('PointerEvent' in window)) { $('openDrawing').disabled = true; return; }

  const maskPaths = $('drawingMaskPaths');
  const mask = $('drawingInkMask');
  const gradient = $('drawingGradient');
  const fill = $('drawingInkFill');
  const emptyLabel = $('drawingEmpty');
  const smooth = $('drawingSmooth');
  const smoothValue = $('drawingSmoothValue');
  const widthInput = $('drawingWidth');
  const widthValue = $('drawingWidthValue');
  const undo = $('drawingUndo');
  const erase = $('drawingErase');
  const apply = $('drawingApply');
  const save = $('drawingSave');
  const strokeList = [];
  let active = null;
  let pointerId = null;
  let queued = 0;
  let surfaceWidth = 800;
  let surfaceHeight = 350;

  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const fmt = x => Number(x.toFixed(2)).toString();
  const strokeWidth = () => Number(widthInput.value);
  const smoothFactor = () => Number(smooth.value) / 100;

  function resizeSurface() {
    if (!dialog.open) return;
    const box = pad.getBoundingClientRect();
    surfaceWidth = Math.max(1, box.width);
    surfaceHeight = Math.max(1, box.height);
    pad.setAttribute('viewBox', `0 0 ${fmt(surfaceWidth)} ${fmt(surfaceHeight)}`);
    mask.setAttribute('x', '0');
    mask.setAttribute('y', '0');
    mask.setAttribute('width', fmt(surfaceWidth));
    mask.setAttribute('height', fmt(surfaceHeight));
    gradient.setAttribute('x2', fmt(surfaceWidth));
    fill.setAttribute('width', fmt(surfaceWidth));
    fill.setAttribute('height', fmt(surfaceHeight));
    scheduleDraw();
  }

  function pointerPosition(event) {
    const rect = pad.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1),
      y: clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1)
    };
  }

  function addPoint(event) {
    if (!active || active.length >= 5000) return;
    const point = pointerPosition(event);
    const last = active[active.length - 1];
    const dx = (point.x - last.x) * surfaceWidth;
    const dy = (point.y - last.y) * surfaceHeight;
    if (dx * dx + dy * dy >= .75 * .75) active.push(point);
  }

  function smoothPoints(points) {
    const strength = smoothFactor();
    const pts = points.map(p => ({ x: p.x * surfaceWidth, y: p.y * surfaceHeight }));
    if (strength < .01 || pts.length < 3) return pts;
    // Moyenne locale progressive : les extrémités restent fixes.
    const span = Math.max(1, Math.round(strength * 5));
    return pts.map((p, i) => {
      if (i === 0 || i === pts.length - 1) return p;
      let weight = 0, x = 0, y = 0;
      for (let j = Math.max(0, i - span); j <= Math.min(pts.length - 1, i + span); j++) {
        const w = span + 1 - Math.abs(j - i);
        x += pts[j].x * w;
        y += pts[j].y * w;
        weight += w;
      }
      const k = strength * .87;
      return { x: p.x * (1 - k) + x / weight * k, y: p.y * (1 - k) + y / weight * k };
    });
  }

  function pathFromPoints(pts) {
    if (!pts.length) return '';
    let path = `M ${fmt(pts[0].x)} ${fmt(pts[0].y)}`;
    if (pts.length === 1) return path;
    if (smoothFactor() < .01 || pts.length < 3) {
      for (let i = 1; i < pts.length; i++) path += ` L ${fmt(pts[i].x)} ${fmt(pts[i].y)}`;
      return path;
    }
    // Courbe de Catmull-Rom convertie en Bézier cubique.
    const tension = smoothFactor() / 6;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const a = { x: p1.x + (p2.x - p0.x) * tension, y: p1.y + (p2.y - p0.y) * tension };
      const b = { x: p2.x - (p3.x - p1.x) * tension, y: p2.y - (p3.y - p1.y) * tension };
      path += ` C ${fmt(a.x)} ${fmt(a.y)} ${fmt(b.x)} ${fmt(b.y)} ${fmt(p2.x)} ${fmt(p2.y)}`;
    }
    return path;
  }

  function inkShapes() {
    const paths = [];
    const points = [];
    for (const stroke of active ? strokeList.concat([active]) : strokeList) {
      if (!stroke.length) continue;
      const pts = smoothPoints(stroke);
      points.push(...pts);
      if (pts.length === 1) {
        paths.push(`<circle cx="${fmt(pts[0].x)}" cy="${fmt(pts[0].y)}" r="${fmt(strokeWidth() / 2)}" fill="white"/>`);
      } else {
        paths.push(`<path d="${pathFromPoints(pts)}" fill="none" stroke="white" stroke-width="${fmt(strokeWidth())}" stroke-linecap="round" stroke-linejoin="round"/>`);
      }
    }
    return { paths, points };
  }

  function scheduleDraw() {
    if (!queued) queued = requestAnimationFrame(() => { queued = 0; draw(); });
  }

  function draw() {
    const { paths } = inkShapes();
    maskPaths.innerHTML = paths.join('');
    emptyLabel.hidden = paths.length > 0;
    undo.disabled = strokeList.length === 0;
    erase.disabled = strokeList.length === 0 && !active;
    apply.disabled = paths.length === 0;
    save.disabled = paths.length === 0;
  }

  function finishPointer(event) {
    if (!active || event.pointerId !== pointerId) return;
    if (event.type === 'pointerup') addPoint(event);
    strokeList.push(active);
    active = null;
    pointerId = null;
    scheduleDraw();
  }

  pad.addEventListener('pointerdown', event => {
    if (active || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault();
    active = [pointerPosition(event)];
    pointerId = event.pointerId;
    try { pad.setPointerCapture(event.pointerId); } catch (_) {}
    scheduleDraw();
  });
  pad.addEventListener('pointermove', event => {
    if (!active || event.pointerId !== pointerId) return;
    event.preventDefault();
    const events = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : [];
    for (const e of events.length ? events : [event]) addPoint(e);
    scheduleDraw();
  });
  pad.addEventListener('pointerup', finishPointer);
  pad.addEventListener('pointercancel', finishPointer);
  pad.addEventListener('lostpointercapture', finishPointer);

  function clearActive() {
    if (active && pointerId !== null) {
      try { pad.releasePointerCapture(pointerId); } catch (_) {}
    }
    active = null;
    pointerId = null;
  }

  smooth.addEventListener('input', () => {
    smoothValue.textContent = smooth.value + ' %';
    scheduleDraw();
  });
  widthInput.addEventListener('input', () => {
    widthValue.textContent = widthInput.value + ' px';
    scheduleDraw();
  });
  undo.addEventListener('click', () => { if (strokeList.length) strokeList.pop(); scheduleDraw(); });
  erase.addEventListener('click', () => { clearActive(); strokeList.length = 0; scheduleDraw(); });
  $('openDrawing').addEventListener('click', () => { dialog.showModal(); resizeSurface(); });
  $('drawingClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { clearActive(); scheduleDraw(); });
  // L'observateur recalcule la géométrie après un changement d'orientation.
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => { if (dialog.open) resizeSurface(); }).observe(pad);
  } else window.addEventListener('resize', resizeSurface);

  function exportSVG() {
    if (active) finishPointer({pointerId, type:'pointercancel'});
    const { paths, points } = inkShapes();
    if (!paths.length) return null;
    const padding = Math.max(25, strokeWidth() + 18);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points) {
      minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
    }
    const x0 = minX - padding;
    const y0 = minY - padding;
    const x1 = maxX + padding;
    const y1 = maxY + padding;
    const w = Math.max(1, Math.ceil(x1 - x0));
    const h = Math.max(1, Math.ceil(y1 - y0));
    const colors = ['#6150f7', '#5e7bed', '#53b4cf', '#56dba2', '#55fa78'];
    const stops = colors.map((color, i) => `<stop offset="${i * 25}%" stop-color="${color}"/>`).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${fmt(x0)} ${fmt(y0)} ${w} ${h}" role="img" aria-label="Dessin à main levée"><title>Dessin à main levée — Fluid</title><defs><linearGradient id="fluid-hand-gradient" gradientUnits="userSpaceOnUse" x1="${fmt(x0)}" y1="0" x2="${fmt(x0 + w)}" y2="0">${stops}</linearGradient><mask id="fluid-hand-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="${fmt(x0)}" y="${fmt(y0)}" width="${w}" height="${h}"><g>${paths.join('')}</g></mask></defs><rect x="${fmt(x0)}" y="${fmt(y0)}" width="${w}" height="${h}" fill="url(#fluid-hand-gradient)" mask="url(#fluid-hand-mask)"/></svg>`;
    return { svg, width:w, height:h };
  }

  save.addEventListener('click', () => {
    const data = exportSVG();
    if (!data) return;
    const url = URL.createObjectURL(new Blob([data.svg], { type:'image/svg+xml;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fluid-dessin-main-levee.svg';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  apply.addEventListener('click', () => {
    const data = exportSVG();
    if (!data) return;
    document.dispatchEvent(new CustomEvent('fluid:apply-drawing', { detail:data }));
    dialog.close();
  });

  draw();
})();