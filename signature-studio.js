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

  // Lissage indépendant de la fréquence des événements tactiles / souris :
  // rééchantillonnage à distance constante, plusieurs passes de filtre spatial
  // puis simplification des points de contrôle. À 400 %, le filtrage est extrême.
  function resampleByDistance(points) {
    if (points.length < 3) return points;
    let length = 0;
    for (let i = 1; i < points.length; i++) {
      length += Math.hypot(points[i].x - points[i-1].x, points[i].y - points[i-1].y);
    }
    if (length < 2) return points;
    const step = Math.max(2.4, length / 1400);
    const result = [points[0]];
    let walked = 0, target = step;
    for (let i = 1; i < points.length && result.length < 1400; i++) {
      const a = points[i-1], b = points[i];
      const segment = Math.hypot(b.x - a.x, b.y - a.y);
      if (segment < 0.0001) continue;
      while (target < walked + segment && result.length < 1399) {
        const t = (target - walked) / segment;
        result.push({x:a.x + (b.x-a.x)*t, y:a.y + (b.y-a.y)*t});
        target += step;
      }
      walked += segment;
    }
    const last = points[points.length-1];
    if (Math.hypot(last.x-result[result.length-1].x, last.y-result[result.length-1].y)>0.001) result.push(last);
    return result;
  }

  // Douglas-Peucker : moins de nœuds SVG lorsque le lissage devient très fort.
  // L'algorithme garde toujours les deux extrémités du geste.
  function simplifyPoints(points, tolerance) {
    if (points.length < 3 || tolerance <= 0) return points;
    const keep = new Uint8Array(points.length);
    keep[0] = keep[points.length-1] = 1;
    const stack = [[0, points.length-1]];
    const threshold = tolerance*tolerance;
    while (stack.length) {
      const [start,end] = stack.pop();
      const a=points[start],b=points[end];
      const vx=b.x-a.x,vy=b.y-a.y, len2=vx*vx+vy*vy;
      let best=threshold,index=-1;
      for (let i=start+1;i<end;i++) {
        const p=points[i];
        const t=len2>0?clamp(((p.x-a.x)*vx+(p.y-a.y)*vy)/len2,0,1):0;
        const dx=p.x-(a.x+t*vx),dy=p.y-(a.y+t*vy);
        const d2=dx*dx+dy*dy;
        if (d2>best){best=d2;index=i;}
      }
      if (index!==-1){keep[index]=1;stack.push([start,index],[index,end]);}
    }
    return points.filter((_,i)=>keep[i]);
  }

  function smoothPoints(points) {
    const level = clamp(Number(smooth.value),0,400);
    const originals = points.map(p => ({x:p.x*surfaceWidth, y:p.y*surfaceHeight}));
    if (level===0 || originals.length<3) return originals;
    let result=resampleByDistance(originals);
    const strength=level/400;
    const passes=1+Math.round(7*Math.pow(strength,1.4));
    const radiusPx=1+42*Math.pow(strength,1.65);
    const sampleStep=Math.max(2.4,result.reduce((sum,p,i)=>i?sum+Math.hypot(p.x-result[i-1].x,p.y-result[i-1].y):0,0)/Math.max(1,result.length-1));
    const radius=Math.max(1,Math.round(radiusPx/sampleStep));
    const blend=Math.min(1,level/80);
    const first=result[0],last=result[result.length-1];
    for (let pass=0;pass<passes;pass++) {
      const sx=new Float64Array(result.length+1),sy=new Float64Array(result.length+1);
      for (let i=0;i<result.length;i++){sx[i+1]=sx[i]+result[i].x;sy[i+1]=sy[i]+result[i].y;}
      result=result.map((p,i)=>{
        if (i===0) return first;
        if (i===result.length-1) return last;
        const left=Math.max(0,i-radius),right=Math.min(result.length,i+radius+1),num=right-left;
        return {x:p.x*(1-blend)+(sx[right]-sx[left])/num*blend,
                y:p.y*(1-blend)+(sy[right]-sy[left])/num*blend};
      });
    }
    const tolerance=0.15+13*Math.pow(strength,2.15);
    return simplifyPoints(result,tolerance);
  }

  function pathFromPoints(pts) {
    if (!pts.length) return '';
    let path = `M ${fmt(pts[0].x)} ${fmt(pts[0].y)}`;
    if (pts.length === 1) return path;
    if (Number(smooth.value) === 0 || pts.length < 3) {
      for (let i = 1; i < pts.length; i++) path += ` L ${fmt(pts[i].x)} ${fmt(pts[i].y)}`;
      return path;
    }
    // Courbe de Catmull-Rom convertie en Bézier cubique.
    const tension = Math.min(1, Number(smooth.value) / 100) / 6;
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
    const paths = [], points = [], traces = [];
    for (const stroke of active ? strokeList.concat([active]) : strokeList) {
      if (!stroke.length) continue;
      const pts = smoothPoints(stroke);
      points.push(...pts);
      if (pts.length === 1) {
        paths.push(`<circle cx="${fmt(pts[0].x)}" cy="${fmt(pts[0].y)}" r="${fmt(strokeWidth() / 2)}" fill="white"/>`);
        traces.push({dot:pts[0]});
      } else {
        const d=pathFromPoints(pts);
        paths.push(`<path d="${d}" fill="none" stroke="white" stroke-width="${fmt(strokeWidth())}" stroke-linecap="round" stroke-linejoin="round"/>`);
        traces.push({d});
      }
    }
    return { paths, points, traces };
  }

  const colors=['#070B66','#1838C5','#3152F4','#6387FA','#9AB7FF'];
  const colorsRGB=colors.map(hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)));
  function progressColor(t){
    const val=clamp(t,0,1)*(colorsRGB.length-1);
    const i=Math.min(colorsRGB.length-2,Math.floor(val)),fraction=val-i;
    return '#'+[0,1,2].map(ch=>Math.round(colorsRGB[i][ch]*(1-fraction)+colorsRGB[i+1][ch]*fraction).toString(16).padStart(2,'0')).join('');
  }
  // Progression de couleur en fonction de la longueur cumulée du stylo,
  // même dans une boucle ou un déplacement vertical.
  function colorAlongLines(traces) {
    const svgNS='http://www.w3.org/2000/svg';
    const items=traces.map(trace=>{
      if(trace.dot)return {dot:trace.dot,length:0};
      const measure=document.createElementNS(svgNS,'path');
      measure.setAttribute('d',trace.d);
      return {measure,d:trace.d,length:measure.getTotalLength()};
    });
    const total=items.reduce((sum,item)=>sum+Math.max(1,item.length),0);
    const step=Math.max(1.5,Math.min(4,strokeWidth()/7));
    const defs=[],parts=[];
    if(items.length>1){
      // Soft shadow only on older painted strokes: clean outer contours.
      const blur=Math.max(.35,strokeWidth()*.052);
      const offX=Math.max(.2,strokeWidth()*.034);
      const offY=Math.max(.35,strokeWidth()*.075);
      defs.push(`<filter id="fluid-hand-cross-shadow" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="${fmt(blur)}" result="soft"/><feOffset in="soft" dx="${fmt(offX)}" dy="${fmt(offY)}" result="shift"/><feFlood flood-color="#070B66" flood-opacity=".50" result="shade"/><feComposite in="shade" in2="shift" operator="in"/></filter>`);
    }
    let covered=0;
    for(let index=0;index<items.length;index++){
      const item=items[index],shapeId='fluid-hand-shape-'+index,local=[];
      const shape=item.dot
        ? `<circle id="${shapeId}" cx="${fmt(item.dot.x)}" cy="${fmt(item.dot.y)}" r="${fmt(strokeWidth()/2)}" fill="white"/>`
        : `<path id="${shapeId}" d="${item.d}" fill="none" stroke="white" stroke-width="${fmt(strokeWidth())}" stroke-linecap="round" stroke-linejoin="round"/>`;
      defs.push(shape);
      if(index>0){
        const priorId='fluid-hand-previous-'+index;
        const previous=Array.from({length:index},(_,j)=>`<use href="#fluid-hand-shape-${j}"/>`).join('');
        defs.push(`<mask id="${priorId}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="${fmt(surfaceWidth)}" height="${fmt(surfaceHeight)}">${previous}</mask>`);
        // Painted on prior ink only, immediately underneath the newer stroke.
        parts.push(`<g mask="url(#${priorId})"><use href="#${shapeId}" filter="url(#fluid-hand-cross-shadow)"/></g>`);
      }
      if(item.dot){
        local.push(`<circle cx="${fmt(item.dot.x)}" cy="${fmt(item.dot.y)}" r="${fmt(strokeWidth()/2)}" fill="${progressColor(covered/Math.max(1,total))}"/>`);
      }else{
        for(let p=0;p<item.length;p+=step){
          const next=Math.min(item.length,p+step);
          const a=item.measure.getPointAtLength(p),b=item.measure.getPointAtLength(next);
          const color=progressColor((covered+(p+next)/2)/Math.max(1,total));
          local.push(`<path d="M ${fmt(a.x)} ${fmt(a.y)} L ${fmt(b.x)} ${fmt(b.y)}" fill="none" stroke="${color}" stroke-width="${fmt(strokeWidth())}" stroke-linecap="round" stroke-linejoin="round"/>`);
        }
      }
      parts.push(`<g>${local.join('')}</g>`);
      covered+=Math.max(1,item.length);
    }
    return {defs:defs.join(''),layers:parts.join('')};
  }

  function scheduleDraw() {
    if (!queued) queued = requestAnimationFrame(() => { queued = 0; draw(); });
  }

  function draw() {
    const { paths, traces } = inkShapes();
    maskPaths.innerHTML = paths.join('');
    const rendered=colorAlongLines(traces);
    $('drawingFlowPaths').innerHTML = '<defs>'+rendered.defs+'</defs>'+rendered.layers;
    fill.setAttribute('visibility','hidden');
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
    const { paths, points, traces } = inkShapes();
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
    const coloredPaths=colorAlongLines(traces);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${fmt(x0)} ${fmt(y0)} ${w} ${h}" role="img" aria-label="Dessin à main levée"><title>Dessin à main levée — Fluid</title><desc>Dégradé suivant les traits avec ombre subtile aux croisements.</desc><defs>${coloredPaths.defs}</defs><g>${coloredPaths.layers}</g></svg>`;
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