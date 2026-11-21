/* Plénée-Jugon · 2 modèles Facebook verticaux 4:5 : frise et information pratique. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas = $('fbCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', {alpha:false});
  if (!ctx) return;

  const W=1080,H=1350;
  const NAVY='#070B66',BLUE='#3152F4',SKY='#C9D6FF',PALE='#E6ECFF',WHITE='#FFFFFF';
  const timeline=window.PJ_FB_TIMELINE;
  const controls={
    title:$('fbHeadline'),photo:$('fbImage'),removePhoto:$('fbRemovePhoto'),
    practical:$('fbPracticalEditor'),timeline:$('fbTimelineEditor'),titleRow:$('fbTitleRow'),
    status:$('fbStatus'),tags:[$('fbTag1'),$('fbTag2'),$('fbTag3')],
    lines:[$('fbLine1'),$('fbLine2'),$('fbLine3')]
  };
  const defaultPractical={
    tags:['INFORMATION','SERVICES','COMMUNE'],
    lines:['Votre information','s’affiche ici','sur trois lignes.']
  };
  const buttons=[...document.querySelectorAll('[data-fb-template]')];
  const logo=new Image();
  let current='evenements',uploaded=null,queue=0;
  logo.addEventListener('load',schedule);
  logo.addEventListener('error',()=>{controls.status.textContent='Logo indisponible : texte de secours affiché.';});
  logo.src='logo-plenee-jugon-monochrome-bleu-nuit.svg';

  function setFont(size,weight='500',family='Outfit'){
    ctx.font=weight+' '+size+'px '+family+', Arial, sans-serif';
  }
  function fitOneLine(value,x,y,maxW,baseSize,minSize,color,weight='500',align='left',family='Outfit'){
    const content=String(value||'—').replace(/\s+/g,' ').trim()||'—';
    let size=baseSize;
    for(;size>minSize;size-=2){
      setFont(size,weight,family);
      if(ctx.measureText(content).width<=maxW)break;
    }
    size=Math.max(minSize,size);
    setFont(size,weight,family);
    let clipped=content;
    while(clipped.length>1&&ctx.measureText(clipped).width>maxW){
      clipped=clipped.slice(0,-1);
    }
    if(clipped!==content){clipped=clipped.trimEnd();while(clipped.length>1&&ctx.measureText(clipped+'…').width>maxW)clipped=clipped.slice(0,-1);clipped+='…';}
    ctx.textAlign=align;ctx.textBaseline='top';ctx.fillStyle=color;
    ctx.fillText(clipped,x,y);
    ctx.textAlign='left';
  }
  function imageCover(img,x,y,w,h){
    const iw=img.naturalWidth,ih=img.naturalHeight;
    const scale=Math.max(w/iw,h/ih);
    const cropW=w/scale,cropH=h/scale;
    ctx.drawImage(img,(iw-cropW)/2,(ih-cropH)/2,cropW,cropH,x,y,w,h);
  }
  function coverPhoto(){
    if(uploaded&&uploaded.naturalWidth&&uploaded.naturalHeight){
      imageCover(uploaded,0,0,W,605);
      return;
    }
    const gradient=ctx.createLinearGradient(0,0,W,605);
    gradient.addColorStop(0,NAVY);gradient.addColorStop(1,BLUE);
    ctx.fillStyle=gradient;ctx.fillRect(0,0,W,605);
    ctx.strokeStyle=SKY;ctx.lineWidth=8;ctx.beginPath();
    ctx.arc(830,255,240,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.arc(830,255,162,0,Math.PI*2);ctx.stroke();
    fitOneLine('AJOUTEZ UNE PHOTO DE COUVERTURE',77,525,915,29,21,WHITE,'700','left','Manrope');
  }
  function renderPractical(){
    ctx.fillStyle=WHITE;ctx.fillRect(0,0,W,H);
    // Photo pleine largeur, puis trois balises et trois lignes : rien d'autre au centre.
    coverPhoto();
    ctx.fillStyle=PALE;ctx.fillRect(0,605,W,745);

    controls.tags.forEach((input,i)=>{
      const x=74+i*312,y=679,w=292,h=72;
      ctx.fillStyle=WHITE;
      ctx.beginPath();ctx.roundRect(x,y,w,h,14);ctx.fill();
      ctx.strokeStyle=SKY;ctx.lineWidth=2;ctx.stroke();
      fitOneLine(input.value||'MOT-CLÉ',x+w/2,y+22,w-30,25,15,BLUE,'750','center','Manrope');
    });
    const lines=controls.lines.map(x=>x.value.trim());
    lines.forEach((line,i)=>{
      fitOneLine(line||'—',W/2,827+i*110,936,77,38,NAVY,'600','center','Outfit');
    });

    // Signature discrète à l'extrémité basse, sans quatrième ligne d'information.
    ctx.fillStyle=SKY;ctx.fillRect(75,1225,930,2);
    if(logo.complete&&logo.naturalWidth>0){
      ctx.drawImage(logo,76,1250,174,174*88/246);
    }else fitOneLine('Plénée-Jugon',77,1258,330,32,22,NAVY,'600');
  }
  function render(){
    ctx.clearRect(0,0,W,H);
    if(current==='evenements'){
      timeline.draw(ctx,{title:controls.title.value.trim(),photo:uploaded,logo});
    }else{
      renderPractical();
    }
    controls.status.textContent='Aperçu actualisé · 1080 × 1350 px';
  }
  function schedule(){
    if(queue)return;
    queue=requestAnimationFrame(()=>{queue=0;render();});
  }
  function choose(mode){
    if(mode!=='evenements'&&mode!=='pratique')return;
    current=mode;
    controls.practical.hidden=mode!=='pratique';
    controls.timeline.hidden=mode!=='evenements';
    controls.titleRow.hidden=mode!=='evenements';
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.fbTemplate===mode)));
    schedule();
  }
  function reset(){
    uploaded=null;
    controls.photo.value='';
    if(current==='evenements'){
      controls.title.value='Événements à venir';
      timeline.reset();
    }else{
      controls.tags.forEach((node,i)=>node.value=defaultPractical.tags[i]);
      controls.lines.forEach((node,i)=>node.value=defaultPractical.lines[i]);
    }
    schedule();
  }
  timeline.mount(schedule);
  buttons.forEach(button=>button.addEventListener('click',()=>choose(button.dataset.fbTemplate)));
  [controls.title,...controls.tags,...controls.lines].forEach(input=>input.addEventListener('input',schedule));
  controls.photo.addEventListener('change',()=>{
    const file=controls.photo.files&&controls.photo.files[0];
    if(!file){uploaded=null;schedule();return;}
    if(!/^image\/(png|jpeg|webp)$/.test(file.type)||file.size>12*1024*1024){
      controls.status.textContent='Photo refusée : JPEG, PNG ou WebP, 12 Mo maximum.';
      controls.photo.value='';
      return;
    }
    const reader=new FileReader();
    reader.onload=()=>{
      const image=new Image();
      image.onload=()=>{uploaded=image;schedule();};
      image.onerror=()=>{controls.status.textContent='La photo est illisible.';};
      image.src=reader.result;
    };
    reader.onerror=()=>{controls.status.textContent='Impossible de lire la photo.';};
    reader.readAsDataURL(file);
  });
  controls.removePhoto.addEventListener('click',()=>{
    uploaded=null;controls.photo.value='';schedule();
  });
  $('fbReset').addEventListener('click',reset);
  $('fbExport').addEventListener('click',()=>{
    render();
    canvas.toBlob(blob=>{
      if(!blob){controls.status.textContent="Impossible de générer le PNG.";return;}
      const url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;a.download='plenee-jugon-facebook-'+current+'-1080x1350.png';
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),2000);
      controls.status.textContent='PNG 1080 × 1350 prêt.';
    },'image/png');
  });
  choose('evenements');
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(schedule);
})();
