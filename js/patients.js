(function(){
  const box=document.getElementById("faqBox"),q=document.getElementById("fq"),chips=document.getElementById("fChips"),empty=document.getElementById("fEmpty");
  const cats=["All",...new Set(FAQS.map(f=>f.c))];let cat="All";
  chips.innerHTML=cats.map(c=>`<button class="chip" aria-pressed="false" data-c="${c}">${c}</button>`).join("");
  function render(){
    chips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.c===cat));
    const s=q.value.trim().toLowerCase();
    const r=FAQS.filter(f=>(cat==="All"||f.c===cat)&&(!s||(f.q+f.a).toLowerCase().includes(s)));
    box.innerHTML=r.map(f=>`<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");
    empty.hidden=r.length>0;
  }
  chips.addEventListener("click",e=>{const c=e.target.closest(".chip");if(c){cat=c.dataset.c;render()}});
  q.addEventListener("input",render);render();
})();
