/* Frise "Événements à venir" — publication Facebook 4:5 de Plénée-Jugon. */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const panel = $('fbTimelineEditor');
  if (!panel) return;
  const list = $('fbTimelineItems'), add = $('fbEventAdd'), count = $('fbTimelineCount');
  const MAX = 8;
  const COLORS = {navy:'#070B66',blue:'#3152F4',pale:'#E6ECFF',sky:'#C9D6FF',light:'#F7F9FF',white:'#FFFFFF',muted:'#50649D'};
  const samples = [
    {date:'2026-12-03',time:'18:00',title:'Rencontre associative',place:'Salle communale',description:'Échange et présentation des projets.'},
    {date:'2026-12-05',time:'10:30',title:'Atelier découverte',place:'Médiathèque',description:'Un moment ouvert à tous.'},
    {date:'2026-12-12',time:'15:00',title:'Animations de quartier',place:'Centre-bourg',description:'Activités et convivialité.'}
  ];
  const fields = ['date','time','title','place','description'];
  const labels = {date:'Date',time:'Heure',title:'Titre de l’événement',place:'Lieu',description:'Description brève'};
  const limits = {title:55,place:44,description:100};
  let events = samples.map(e=>({...e})), onChange = ()=>{};
  const htmlEscape = v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeNum = (v, min, max) => Math.min(max,Math.max(min,v));
  const nextBlank = () => ({date:'',time:'',title:'',place:'',description:''});

  function redrawForm() {
    list.innerHTML=events.map((event,i)=>(
      '<article class="fb-event-card" data-event-index="'+i+'">'+
      '<div class="fb-event-head"><strong>Événement '+(i+1)+'</strong>'+
      '<button class="fb-event-remove" type="button" data-remove="'+i+'" aria-label="Supprimer l’événement '+(i+1)+'">Supprimer</button></div>'+
      '<div class="fb-event-fields">'+fields.map(field=>(
        '<label class="fb-field">'+labels[field]+
        '<input type="'+(field==='date'?'date':field==='time'?'time':'text')+
        '" data-index="'+i+'" data-field="'+field+'" '+
        (limits[field]?'maxlength="'+limits[field]+'" ':'')+
        'value="'+htmlEscape(event[field])+'"></label>'
      )).join('')+'</div></article>'
    )).join('');
    count.textContent=events.length+' / '+MAX+' événements';
    add.disabled=events.length>=MAX;
    add.textContent=events.length>=MAX?'Maximum de 8 événements atteint':'+ Ajouter un événement';
  }

  function mount(callback) {
    onChange=callback;
    redrawForm();
    list.addEventListener('input',event=>{
      const el=event.target;
      if(!el || !el.dataset || !fields.includes(el.dataset.field)) return;
      const i=Number(el.dataset.index);
      if(!Number.isInteger(i)||!events[i])return;
      events[i][el.dataset.field]=String(el.value).slice(0,limits[el.dataset.field]||32);
      onChange();
    });
    list.addEventListener('change',event=>{
      const el=event.target;
      if(el&&el.dataset&&fields.includes(el.dataset.field))onChange();
    });
    list.addEventListener('click',event=>{
      const button=event.target.closest('[data-remove]');
      if(!button)return;
      const i=Number(button.dataset.remove);
      if(!Number.isInteger(i)||events.length<=1||!events[i])return;
      events.splice(i,1);
      redrawForm();
      onChange();
    });
    add.addEventListener('click',()=>{
      if(events.length>=MAX)return;
      events.push(nextBlank());
      redrawForm();
      onChange();
      const card=list.lastElementChild;
      card?.querySelector('input[data-field="date"]')?.focus();
    });
  }

  function reset() {
    events=samples.map(e=>({...e}));
    redrawForm();
    onChange();
  }

  function sortedEvents() {
    return events.map((item,i)=>({...item,_index:i})).sort((a,b)=>{
      const ka=(/^\d{4}-\d{2}-\d{2}$/.test(a.date)?a.date:'9999-12-31')+'T'+(a.time||'23:59');
      const kb=(/^\d{4}-\d{2}-\d{2}$/.test(b.date)?b.date:'9999-12-31')+'T'+(b.time||'23:59');
      return ka.localeCompare(kb)||a._index-b._index;
    }).slice(0,MAX);
  }

  function draw(ctx, {title,photo,logo}) {
    const {navy,blue,pale,sky,light,white,muted}=COLORS;
    const W=1080,H=1350;
    const fill=(c,x,y,w,h)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
    const font=(n,weight='500',family='Outfit')=>{ctx.font=weight+' '+n+'px '+family+', Arial, sans-serif';};
    const text=(str,x,y,size,color,weight='500',align='left',family='Outfit')=>{
      ctx.fillStyle=color;ctx.textBaseline='top';ctx.textAlign=align;
      font(size,weight,family);ctx.fillText(str,x,y);
      ctx.textAlign='left';
    };
    function truncate(str,maxWidth,size,weight='500',family='Outfit'){
      font(size,weight,family);
      let value=String(str||'');
      if(ctx.measureText(value).width<=maxWidth)return value;
      while(value.length>1&&ctx.measureText(value+'…').width>maxWidth)value=value.slice(0,-1);
      return value.trimEnd()+'…';
    }
    function drawPhoto(x,y,w,h){
      if(photo&&photo.naturalWidth>0&&photo.naturalHeight>0){
        const scale=Math.max(w/photo.naturalWidth,h/photo.naturalHeight);
        const sw=w/scale,sh=h/scale;
        const sx=(photo.naturalWidth-sw)/2, sy=(photo.naturalHeight-sh)/2;
        ctx.drawImage(photo,sx,sy,sw,sh,x,y,w,h);
      } else {
        const gradient=ctx.createLinearGradient(0,0,W,315);
        gradient.addColorStop(0,navy);gradient.addColorStop(1,blue);
        ctx.fillStyle=gradient;ctx.fillRect(x,y,w,h);
        ctx.strokeStyle=sky;ctx.lineWidth=6;
        ctx.beginPath();ctx.arc(850,140,250,0,Math.PI*2);ctx.stroke();
        ctx.beginPath();ctx.arc(850,140,175,0,Math.PI*2);ctx.stroke();
        text('PHOTO DE COUVERTURE',76,255,23,white,'700','left','Manrope');
      }
    }

    ctx.clearRect(0,0,W,H);
    fill(white,0,0,W,H);
    // Photo à pleine largeur : la frise n'empiète jamais sur le haut du visuel.
    drawPhoto(0,0,W,310);
    fill(navy,0,310,W,185);
    text('AGENDA  ·  PLÉNÉE-JUGON',76,331,24,sky,'700','left','Manrope');
    const titleStr=String(title||'Événements à venir').replace(/\s+/g,' ').trim();
    text(truncate(titleStr,940,80,'500'),76,383,80,white);

    const items=sortedEvents();
    const start=555,end=1251,lineX=540;
    const available=end-start;
    const cellH=Math.min(137,available/Math.max(1,items.length));
    const span=cellH*items.length;
    const firstY=start+(available-span)/2;
    ctx.strokeStyle=sky;ctx.lineWidth=4;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(lineX,firstY+7);ctx.lineTo(lineX,firstY+span-14);ctx.stroke();
    const dense=items.length>=7;
    const small=items.length>=5;
    const sizeDate=dense?17:small?20:24;
    const sizeTitle=dense?24:small?29:35;
    const sizePlace=dense?16:small?17:20;
    const sizeDesc=dense?15:small?17:20;
    const maxTextWidth=425;
    for(let i=0;i<items.length;i++){
      const item=items[i],y=firstY+i*cellH;
      const left=i%2===0;
      const x=left?476:604;
      const align=left?'right':'left';
      const cy=y+cellH*.41;
      // Connecteur horizontal + nœud de frise.
      ctx.beginPath();
      ctx.moveTo(lineX,cy);ctx.lineTo(left?495:585,cy);
      ctx.lineWidth=3;ctx.strokeStyle=sky;ctx.stroke();
      ctx.beginPath();ctx.arc(lineX,cy,10,0,Math.PI*2);
      ctx.fillStyle=white;ctx.fill();ctx.strokeStyle=blue;ctx.lineWidth=4;ctx.stroke();
      let dateLabel='DATE À PRÉCISER';
      if(/^\d{4}-\d{2}-\d{2}$/.test(item.date)){
        const date=new Date(item.date+'T12:00:00');
        if(!isNaN(date.getTime()))dateLabel=new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'short'}).format(date).toLocaleUpperCase('fr-FR');
      }
      const when=dateLabel+(item.time?'  ·  '+item.time.replace(':','h'):'');
      text(truncate(when,maxTextWidth,sizeDate,'700','Manrope'),x,y, sizeDate,blue,'700',align,'Manrope');
      text(truncate(item.title||'Titre à renseigner',maxTextWidth,sizeTitle,'600'),x,y+(dense?23:small?29:34),sizeTitle,navy,'600',align);
      text(truncate(item.place||'Lieu à préciser',maxTextWidth,sizePlace,'600','Manrope'),x,y+(dense?51:small?62:73),sizePlace,muted,'600',align,'Manrope');
      const description=String(item.description||'').trim();
      if(description)text(truncate(description,maxTextWidth,sizeDesc,'400','Manrope'),x,y+(dense?71:small?83:99),sizeDesc,navy,'400',align,'Manrope');
    }
    // Signature officielle discrète, en bas à gauche.
    fill(pale,0,1284,W,66);
    if(logo&&logo.complete&&logo.naturalWidth>0){
      ctx.drawImage(logo,66,1296,164,58.67);
    }else text('Plénée-Jugon',74,1306,30,navy,'600');
    text('ÉVÉNEMENTS À VENIR',1008,1305,19,muted,'700','right','Manrope');
  }

  window.PJ_FB_TIMELINE={mount,reset,draw,getCount:()=>events.length,getEvents:()=>events.map(e=>({...e}))};
})();
