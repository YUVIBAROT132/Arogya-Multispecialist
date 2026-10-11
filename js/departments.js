(function(){
  const side=document.getElementById("sideNav"),body=document.getElementById("deptBody");
  side.innerHTML=DEPTS.map(d=>`<li><a href="#${d.slug}" data-s="${d.slug}">${d.name}</a></li>`).join("");
  body.innerHTML=DEPTS.map(d=>{
    const docs=DOCTORS.filter(x=>x.dept===d.slug);
    return `<section class="dd" id="${d.slug}"><header><div class="ico">${ICONS[d.icon].replace('width="24" height="24"','width="30" height="30"')}</div><h2>${d.name}</h2></header>
    <p>${d.about}</p>
    <div class="cols"><div><h4>What we treat</h4><ul class="ticks">${d.treats.map(t=>`<li>${t}</li>`).join("")}</ul></div>
    <div><h4>Tests and procedures</h4><ul class="ticks">${d.procs.map(t=>`<li>${t}</li>`).join("")}</ul></div></div>
    <h4>Our doctors</h4><div class="mini-docs">${docs.map(x=>`<a class="mini" href="appointment.html?doctor=${x.id}"><span class="av" style="${avatarStyle(x.id)}">${initials(x.name)}</span>${x.name}</a>`).join("")}</div></section>`}).join("");
  const links=[...side.querySelectorAll("a")];
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle("on",l.dataset.s===e.target.id))}})},{rootMargin:"-30% 0px -60% 0px"});
  body.querySelectorAll(".dd").forEach(s=>io.observe(s));
  if(!location.hash)links[0].classList.add("on");
})();
