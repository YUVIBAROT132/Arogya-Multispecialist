(function(){
  const list=document.getElementById("docList"),q=document.getElementById("q"),sort=document.getElementById("sort"),
        today=document.getElementById("today"),empty=document.getElementById("empty"),count=document.getElementById("count"),chips=document.getElementById("chips");
  let dept="";
  const params=new URLSearchParams(location.search);
  if(params.get("q"))q.value=params.get("q");if(params.get("dept"))dept=params.get("dept");
  chips.innerHTML='<button class="chip" aria-pressed="false" data-d="">All</button>'+DEPTS.map(d=>`<button class="chip" aria-pressed="false" data-d="${d.slug}">${d.name}</button>`).join("");
  function hay(d){const x=DEPTS.find(t=>t.slug===d.dept);return (d.name+" "+x.name+" "+d.qual+" "+d.bio+" "+x.blurb+" "+x.treats.join(" ")).toLowerCase()}
  function render(){
    chips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.d===dept));
    const s=q.value.trim().toLowerCase();
    let r=DOCTORS.filter(d=>(!dept||d.dept===dept)&&(!today.checked||availableToday(d))&&
      (!s||hay(d).includes(s)));
    if(sort.value==="exp")r.sort((a,b)=>b.exp-a.exp);else if(sort.value==="name")r.sort((a,b)=>a.name.localeCompare(b.name));else if(sort.value==="fee")r.sort((a,b)=>a.fee-b.fee);
    list.innerHTML=r.map(docCard).join("");
    empty.hidden=r.length>0;
    count.textContent=r.length+(r.length===1?" doctor":" doctors")+" found";
  }
  chips.addEventListener("click",e=>{const c=e.target.closest(".chip");if(c){dept=c.dataset.d;render()}});
  [q,sort,today].forEach(el=>el.addEventListener("input",render));
  document.getElementById("reset").addEventListener("click",()=>{q.value="";dept="";today.checked=false;sort.value="";render()});
  render();
})();
