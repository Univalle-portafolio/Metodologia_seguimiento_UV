/* Lógica de la página: escalado, paneles, selector de habilidades e instrumentos. */
(function(){
  // ---------- escalado responsivo ----------
  var wrap=document.getElementById('wrap'), stage=document.getElementById('stage');
  function fit(){var s=wrap.clientWidth/1920; stage.style.transform='scale('+s+')'; wrap.style.height=(1080*s)+'px';}
  window.addEventListener('resize',fit); fit();

  // ---------- 37 habilidades (taxonomía de la Metodología) ----------
  var HAB=MET.HAB;
  var NIV=MET.NIV;
  var DESC=MET.DESC;
  var INST=MET.INST;
  var MED=MET.MED;
  var USE={m0:['EA'],m2:['GA'],m3:['I8']};
  var UTT={m0:'Instrumento utilizado',m2:'Guía común',m3:'Instrumento de medición de impacto'};
  function instSec(k){var u=USE[k]; if(!u) return ''; return '<div class="ins otr"><h4>'+UTT[k]+'</h4><div class="ibs">'+u.map(function(x){return '<button class="ib" data-i="'+x+'">'+INST[x].n+'</button>';}).join('')+'</div></div>';}
  function otrSec(u){return '<div class="ins otr"><h4>Otros instrumentos de este momento</h4><div class="ibs">'+u.map(function(x){return '<button class="ib" data-i="'+x+'"><b>'+x+'</b> '+INST[x].n+'</button>';}).join('')+'</div></div>';}
  function showInst(x){var t=INST[x],pb=document.getElementById('pb');
    pb.innerHTML='<button class="back" data-back="1">‹ Volver</button><div class="hc">'+(t.lbl?t.lbl+' · ':'')+t.t+'</div><h3 class="ih">'+t.n+'</h3>'+
      '<div class="meta"><span><b>Quién lo aplica:</b> '+t.q+'</span><span><b>Cuándo:</b> '+t.w+'</span></div><p>'+t.d+'</p>'+t.c+
      (t.src===''?'':'<p class="src">Fuente: Metodología institucional de seguimiento y monitoreo del acompañamiento estudiantil, numeral 6 (DEXIA, 2026).</p>');
    document.getElementById('pn').scrollTop=0;}
  var FLAT=[]; HAB.forEach(function(g){g[2].forEach(function(h){FLAT.push({n:h[0],a:h[1],c:g[0]+' · '+g[1]});});});
  function habHTML(){
    var h='<p class="tip">Seleccione una habilidad para ver su resultado esperado, lo que significa cada nivel del semáforo y las rutas de atención/apoyo que la trabajan.</p>';
    var i=0;
    HAB.forEach(function(g){h+='<div class="grp"><div class="gt">'+g[0]+' · '+g[1]+' <small>('+g[2].length+')</small></div><div class="chips">'+g[2].map(function(x){return '<button class="hb" data-h="'+(i++)+'">'+x[0]+'</button>'}).join('')+'</div></div>';});
    return '<div class="habs">'+h+'</div><div class="hdet" hidden></div>';
  }
  function showHab(root,idx,lv){
    var H=FLAT[idx], det=root.querySelector('.hdet'), list=root.querySelector('.habs');
    var h='<button class="back">‹ Volver a las habilidades</button><div class="hc">'+H.c+'</div><h3>'+H.n+'</h3>'+
      '<div class="alc"><b>Resultado esperado</b>'+H.a+'</div><div class="lvls">';
    var DS=DESC[idx];
    NIV.forEach(function(n,j){h+='<button class="lv '+n[0]+(lv===n[0]?' sel':'')+'" data-l="'+n[0]+'"><span class="lh"><i></i>'+n[1]+'</span><span class="ld">'+DS[j+1]+'</span><span class="la">'+n[3]+'</span></button>';});
    h+='</div><div class="estr"><b>Rutas de atención/apoyo que validaron temáticas relacionadas</b>'+DS[4].map(function(e){return '<span>'+e+'</span>'}).join('')+'</div><p class="src">Temáticas validadas: '+DS[0]+'.<br>Descriptores construidos a partir de la Escala unificada de nivel de riesgo, la Cartilla-Guía del Semáforo de Alertas de ASES y la validación conceptual de las rutas de atención/apoyo.</p>';
    var mh=root.querySelector('.mhead'), ot=root.querySelector('.otr');
    det.innerHTML=h; det.hidden=false; list.hidden=true; if(mh) mh.hidden=true; if(ot) ot.hidden=true;
    det.querySelector('.back').onclick=function(){det.hidden=true;list.hidden=false; if(mh) mh.hidden=false; if(ot) ot.hidden=false;};
    det.querySelectorAll('.lv').forEach(function(b){b.onclick=function(){showHab(root,idx,b.getAttribute('data-l'));};});
  }
  // ---------- contenidos ----------
  var D=MET.CONTENIDO;
  D.m1.b='<div class="mhead">'+D.m1.b+'</div>'+habHTML(); D.m3.b='<div class="mhead">'+D.m3.b+'</div>'+instSec('m3')+habHTML(); D.m2.b='<div class="mhead">'+D.m2.b+'</div>'+instSec('m2')+habHTML(); D.m0.b+=instSec('m0');
  var ORDER=['e1','m0','e2','m1','e3','e4','e5','m2','e6','m3','e7'];

  // ---------- panel ----------
  var ov=document.getElementById('ov'),pn=document.getElementById('pn'),cur=null,last=null;
  function open(k){
    var d=D[k]; if(!d) return; cur=k;
    document.getElementById('pk').textContent=d.k;
    document.getElementById('pt').textContent=d.t;
    document.getElementById('pb').innerHTML=d.b;
    pn.className=d.m?'m':'';
    var i=ORDER.indexOf(k);
    document.getElementById('prev').disabled=i<=0;
    document.getElementById('next').disabled=i>=ORDER.length-1;
    var pb=document.getElementById('pb'); pb.querySelectorAll('.hb').forEach(function(b){b.onclick=function(){showHab(pb,+b.getAttribute('data-h'));pn.scrollTop=0;};});
    ov.classList.add('on'); pn.scrollTop=0; document.getElementById('x').focus();
  }
  function close(){ov.classList.remove('on'); if(last) last.focus();}
  document.querySelectorAll('[data-k]').forEach(function(el){
    el.addEventListener('click',function(){last=el;open(el.getAttribute('data-k'));});
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();last=el;open(el.getAttribute('data-k'));}});
  });
  document.getElementById('pb').addEventListener('click',function(e){var b=e.target.closest('.ib'); if(b){showInst(b.getAttribute('data-i'));return;} var bk=e.target.closest('[data-back]'); if(bk){open(cur);}});
  document.getElementById('x').onclick=close;
  ov.addEventListener('click',function(e){if(e.target===ov) close();});
  document.addEventListener('keydown',function(e){
    if(!ov.classList.contains('on')) return;
    var i=ORDER.indexOf(cur);
    if(e.key==='Escape') close();
    if(e.key==='ArrowRight'&&i<ORDER.length-1) open(ORDER[i+1]);
    if(e.key==='ArrowLeft'&&i>0) open(ORDER[i-1]);
  });
  document.getElementById('prev').onclick=function(){open(ORDER[ORDER.indexOf(cur)-1]);};
  document.getElementById('next').onclick=function(){open(ORDER[ORDER.indexOf(cur)+1]);};
})();
