/* Plénée-Jugon — générateur de publications Facebook 4:5 (1080×1350).
   Utilise exclusivement Canvas, pas de dépendance ni de téléversement serveur. */
(function () {
  'use strict';
  const canvas = document.getElementById('fbCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', {alpha:false});
  if (!ctx) return;
  const $ = id => document.getElementById(id);
  const W = 1080, H = 1350;
  const NAVY = '#070B66', BLUE = '#3152F4', DEEP = '#1838C5';
  const PALE = '#E6ECFF', SKY = '#C9D6FF', AZURE = '#7C99F7', WHITE = '#FFFFFF';
  const templates = {
    annonce: {eyebrow:'INFORMATION MUNICIPALE', title:'Plénée-Jugon\nse transforme.', subtitle:'Retrouvez les informations et les projets qui font vivre notre commune.', date:'À LA UNE', footer:'PLÉNÉE-JUGON · ACTUALITÉS'},
    agenda: {eyebrow:'À VOS AGENDAS', title:'On se retrouve\nbientôt !', subtitle:'Un événement pour se rencontrer, partager et profiter ensemble.', date:'SAMEDI 28 NOV.', footer:'PLÉNÉE-JUGON · AGENDA'},
    images: {eyebrow:'RETOUR EN IMAGES', title:'Revivez les\nbeaux moments.', subtitle:'Une belle journée de rencontres et de convivialité à Plénée-Jugon.', date:'EN IMAGES', footer:'PLÉNÉE-JUGON · LA VIE LOCALE'},
    pratique: {eyebrow:'INFO PRATIQUE', title:'Une information\nà retenir.', subtitle:'Les informations essentielles pour faciliter votre quotidien.', date:'À SAVOIR', footer:'PLÉNÉE-JUGON · SERVICES'}
  };
  const fields = {eyebrow:$('fbEyebrow'),title:$('fbHeadline'),subtitle:$('fbSubtitle'),date:$('fbDate'),footer:$('fbFooter')};
  const templateButtons = [...document.querySelectorAll('[data-fb-template]')];
  const status = $('fbStatus');
  const imageField = $('fbImage');
  const removeImage = $('fbRemovePhoto');
  let current = 'annonce', uploaded = null, queued = 0;

  function setFont(size,weight='500',family='Outfit') {
    ctx.font = weight+' '+size+'px '+family+', Arial, sans-serif';
  }
  function lineArray(text,maxWidth) {
    const paragraphs=String(text||'').split(/\n/), lines=[];
    for(const paragraph of paragraphs) {
      const words=paragraph.trim().split(/\s+/).filter(Boolean);
      if(!words.length){lines.push('');continue;}
      let line='';
      for(const word of words){
        const candidate=line?line+' '+word:word;
        if(ctx.measureText(candidate).width<=maxWidth || !line) line=candidate;
        else {lines.push(line);line=word;}
      }
      lines.push(line);
    }
    return lines;
  }
  function textFit(text,x,y,maxWidth,size,minSize,maxLines,lineHeight,color,weight='500',family='Outfit') {
    let lines=[],fsize=size;
    for(;fsize>=minSize;fsize-=2){
      setFont(fsize,weight,family);
      lines=lineArray(text,maxWidth);
      if(lines.length<=maxLines&&lines.every(line=>ctx.measureText(line).width<=maxWidth))break;
    }
    fsize=Math.max(minSize,fsize);
    setFont(fsize,weight,family);
    const visible=lines.slice(0,maxLines);
    if(lines.length>maxLines&&visible.length){
      let last=visible[visible.length-1];
      while(last.length>1&&ctx.measureText(last+'…').width>maxWidth)last=last.slice(0,-1);
      visible[visible.length-1]=last+'…';
    }
    ctx.fillStyle=color;
    ctx.textBaseline='top';
    const lh=fsize*lineHeight;
    visible.forEach((line,i)=>ctx.fillText(line,x,y+i*lh));
    return y+visible.length*lh;
  }
  function rect(x,y,w,h,color) {ctx.fillStyle=color;ctx.fillRect(x,y,w,h);}
  function roundRect(x,y,w,h,r,color){
    ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();
  }
  function circle(x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function wave(y,color,thickness=55){
    ctx.beginPath();ctx.moveTo(-150,y);
    ctx.bezierCurveTo(130,y-215,315,y-215,480,y+45);
    ctx.bezierCurveTo(630,y+270,830,y+205,1000,y-28);
    ctx.bezierCurveTo(1110,y-145,1190,y-155,1240,y-55);
    ctx.strokeStyle=color;ctx.lineWidth=thickness;ctx.lineCap='round';ctx.stroke();
  }
  function wordmark(x,y,color,small=false){
    ctx.save();
    const unit=small?13:16;
    for(let row=0;row<3;row++) for(let col=0;col<3;col++) {
      if((row===0&&col===2)||(row===2&&col===0))continue;
      rect(x+col*(unit+3),y+row*(unit+3),unit,unit,(row+col)%3===0?AZURE:color);
    }
    ctx.fillStyle=color;
    setFont(small?26:31,'600','Outfit');ctx.textBaseline='top';
    ctx.fillText('PLÉNÉE — JUGON',x+(unit+3)*3+14,y+(small?5:9));
    ctx.restore();
  }
  function eyebrow(value,x,y,color=AZURE){
    setFont(25,'700','Manrope');ctx.fillStyle=color;ctx.textBaseline='top';
    ctx.fillText(String(value||'').toUpperCase().slice(0,42),x,y);
  }
  function footer(value,color,y=1243){
    rect(76,y-31,928,2,color==='white'?SKY:AZURE);
    setFont(23,'700','Manrope');ctx.fillStyle=color==='white'?WHITE:NAVY;
    ctx.textBaseline='top';ctx.fillText(String(value||'').toUpperCase().slice(0,55),76,y);
    ctx.textAlign='right';ctx.fillText('PJ / 2026',1004,y);ctx.textAlign='left';
  }
  function photoBox(x,y,w,h) {
    if(uploaded){
      const iw=uploaded.naturalWidth,ih=uploaded.naturalHeight;
      const scale=Math.max(w/iw,h/ih);
      const sw=w/scale,sh=h/scale,sx=(iw-sw)/2,sy=(ih-sh)/2;
      ctx.drawImage(uploaded,sx,sy,sw,sh,x,y,w,h);
      return;
    }
    rect(x,y,w,h,SKY);
    const grd=ctx.createLinearGradient(x,y,x+w,y+h);
    grd.addColorStop(0,DEEP);grd.addColorStop(1,AZURE);
    ctx.fillStyle=grd;ctx.fillRect(x,y,w,h);
    circle(x+w*.58,y+h*.42,240,'#C9D6FF');
    circle(x+w*.4,y+h*.65,185,BLUE);
    ctx.strokeStyle=WHITE;ctx.lineWidth=18;
    ctx.strokeRect(x+36,y+36,w-72,h-72);
    setFont(28,'700','Manrope');ctx.fillStyle=WHITE;ctx.textBaseline='top';
    ctx.fillText('AJOUTEZ VOTRE PHOTO',x+90,y+h-98);
  }
  function render() {
    const d=Object.fromEntries(Object.entries(fields).map(([key,input])=>[key,input.value.trim()]));
    ctx.clearRect(0,0,W,H);
    if(current==='annonce'){
      rect(0,0,W,H,NAVY);
      circle(1070,110,360,BLUE);
      circle(1010,165,240,NAVY);
      wave(190,DEEP,76);
      wordmark(76,70,WHITE);
      eyebrow(d.eyebrow,76,363,SKY);
      const bottom=textFit(d.title,76,444,930,108,57,4,1.04,WHITE,'500');
      textFit(d.subtitle,79,Math.min(bottom+46,910),920,39,29,4,1.35,PALE,'500','Manrope');
      roundRect(76,1104,928,90,0,BLUE);
      setFont(28,'700','Manrope');ctx.fillStyle=WHITE;ctx.textBaseline='middle';
      ctx.fillText(d.date.toUpperCase().slice(0,42),110,1148);
      footer(d.footer,'white');
    } else if(current==='agenda'){
      rect(0,0,W,H,BLUE);
      circle(1010,225,400,NAVY);
      circle(1010,225,282,BLUE);
      wave(350,AZURE,52);
      wordmark(76,74,WHITE);
      eyebrow(d.eyebrow,76,337,WHITE);
      const bottom=textFit(d.title,76,418,930,108,58,4,1.04,WHITE,'500');
      textFit(d.subtitle,79,Math.min(bottom+34,855),910,39,28,3,1.35,PALE,'500','Manrope');
      roundRect(76,1024,928,150,0,NAVY);
      setFont(45,'600','Outfit');ctx.fillStyle=WHITE;ctx.textBaseline='middle';
      ctx.fillText(d.date.toUpperCase().slice(0,34),109,1102);
      footer(d.footer,'white');
    } else if(current==='images'){
      rect(0,0,W,H,NAVY);
      photoBox(0,0,1080,740);
      rect(0,0,1080,124,NAVY);
      wordmark(76,35,WHITE,true);
      roundRect(76,676,400,96,0,BLUE);
      setFont(30,'700','Manrope');ctx.fillStyle=WHITE;ctx.textBaseline='middle';
      ctx.fillText(d.date.toUpperCase().slice(0,21),106,723);
      eyebrow(d.eyebrow,76,824,AZURE);
      const bottom=textFit(d.title,76,894,920,76,47,3,1.08,WHITE,'500');
      textFit(d.subtitle,76,Math.min(bottom+25,1130),920,29,22,2,1.35,PALE,'500','Manrope');
      footer(d.footer,'white',1283);
    } else {
      rect(0,0,W,H,PALE);
      rect(0,0,50,H,BLUE);
      roundRect(700,64,445,425,220,SKY);
      circle(988,202,142,BLUE);
      wordmark(94,70,NAVY);
      roundRect(94,292,455,88,0,NAVY);
      setFont(26,'700','Manrope');ctx.fillStyle=WHITE;ctx.textBaseline='middle';
      ctx.fillText(d.eyebrow.toUpperCase().slice(0,24),124,338);
      const bottom=textFit(d.title,94,462,910,104,56,4,1.06,NAVY,'500');
      textFit(d.subtitle,97,Math.min(bottom+52,955),885,37,28,4,1.35,NAVY,'500','Manrope');
      roundRect(94,1105,894,92,0,BLUE);
      setFont(29,'700','Manrope');ctx.fillStyle=WHITE;ctx.textBaseline='middle';
      ctx.fillText(d.date.toUpperCase().slice(0,34),128,1152);
      footer(d.footer,'navy');
    }
    status.textContent='Aperçu actualisé · 1080 × 1350 px';
  }
  function schedule(){if(!queued)queued=requestAnimationFrame(()=>{queued=0;render();});}
  function choose(template) {
    if(!templates[template])return;
    current=template;
    for(const [key,field] of Object.entries(fields))field.value=templates[template][key];
    templateButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.fbTemplate===template)));
    schedule();
  }
  templateButtons.forEach(button=>button.addEventListener('click',()=>choose(button.dataset.fbTemplate)));
  Object.values(fields).forEach(input=>input.addEventListener('input',schedule));
  imageField.addEventListener('change',()=>{
    const file=imageField.files&&imageField.files[0];
    if(!file){uploaded=null;schedule();return;}
    if(!/^image\/(jpeg|png|webp)$/.test(file.type)||file.size>12*1024*1024){
      status.textContent='Image refusée : JPEG, PNG ou WebP (12 Mo maximum).';imageField.value='';return;
    }
    const reader=new FileReader();
    reader.onload=()=>{const img=new Image();img.onload=()=>{uploaded=img;schedule();};
      img.onerror=()=>{status.textContent='Image illisible.';};img.src=reader.result;};
    reader.readAsDataURL(file);
  });
  removeImage.addEventListener('click',()=>{uploaded=null;imageField.value='';schedule();});
  $('fbReset').addEventListener('click',()=>{uploaded=null;imageField.value='';choose(current);});
  $('fbExport').addEventListener('click',()=>{
    render();
    canvas.toBlob(blob=>{
      if(!blob){status.textContent="Impossible de générer le PNG.";return;}
      const url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;a.download='plenee-jugon-facebook-'+current+'-1080x1350.png';
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
      status.textContent='PNG 1080 × 1350 généré';
    },'image/png');
  });
  choose('annonce');
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(schedule);
})();
