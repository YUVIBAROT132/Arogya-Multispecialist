(function(){
  const cats=["All",...new Set(TIPS.map(t=>t.cat))];let cat="All";
  const chips=document.getElementById("tChips"),list=document.getElementById("tList"),q=document.getElementById("tQ"),empty=document.getElementById("tEmpty");
  chips.innerHTML=cats.map(c=>`<button class="chip" aria-pressed="false" data-c="${c}">${c}</button>`).join("");
  function render(){
    chips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.c===cat));
    const s=q.value.trim().toLowerCase();
    const r=TIPS.filter(t=>(cat==="All"||t.cat===cat)&&(!s||(t.title+t.sum).toLowerCase().includes(s)));
    list.innerHTML=r.map(t=>`<article class="art-card"><span class="tag" style="align-self:flex-start">${t.cat}</span><h3>${t.title}</h3><p>${t.sum}</p><span class="rt">${t.min} min read</span><button class="btn btn-o btn-s rd" data-t="${t.id}">Read article</button></article>`).join("");
    empty.hidden=r.length>0;
  }
  chips.addEventListener("click",e=>{const c=e.target.closest(".chip");if(c){cat=c.dataset.c;render()}});
  q.addEventListener("input",render);
  list.addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(!b)return;const t=TIPS.find(x=>x.id==b.dataset.t);
    openDialog(`<span class="tag">${t.cat}</span><h2 style="margin-top:10px">${t.title}</h2>${t.body.map(p=>`<p>${p}</p>`).join("")}<p style="font-size:.88rem;color:var(--muted)">This article is general information, not a substitute for advice from your doctor.</p>`)});
  render();
  /* BMI calculator */
  const f=document.getElementById("bmi"),out=document.getElementById("bmiOut");
  f.addEventListener("submit",e=>{e.preventDefault();
    const h=parseFloat(document.getElementById("h").value)/100,w=parseFloat(document.getElementById("w").value);
    if(!(h>0.5&&h<2.5&&w>10&&w<400)){out.innerHTML="Enter height in cm (50 to 250) and weight in kg (10 to 400).";return}
    const b=w/(h*h);const cl=b<18.5?"Underweight":b<23?"Healthy range":b<27.5?"Overweight":"Obese";
    out.innerHTML=`<b>${b.toFixed(1)}</b> &nbsp; ${cl}<br><span style="font-size:.88rem;color:#b5d3cd">Ranges used are the Asia-Pacific cut-offs. BMI is a screening number only; discuss results with your doctor.</span>`});
})();
