(function(){
  const g=document.getElementById("homeDepts");
  g.innerHTML=DEPTS.map(d=>`<a class="dept" href="departments.html#${d.slug}"><div class="ico">${ICONS[d.icon]}</div><h3>${d.name}</h3><p>${d.blurb}</p><span class="go">Explore department</span></a>`).join("");
  const feat=[1,5,7,9].map(i=>DOCTORS.find(d=>d.id===i));
  document.getElementById("homeDocs").innerHTML=feat.map(docCard).join("");
  const f=document.getElementById("finder"),sel=document.getElementById("fDept");
  DEPTS.forEach(d=>sel.add(new Option(d.name,d.slug)));
  f.addEventListener("submit",e=>{e.preventDefault();const q=document.getElementById("fQ").value.trim(),d=sel.value;
    location.href="doctors.html?"+new URLSearchParams({q,dept:d}).toString()});
})();
