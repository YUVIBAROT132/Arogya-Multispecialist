/* Shared behaviour: header, status, toast, dialog, doctor cards */
document.addEventListener("DOMContentLoaded",()=>{
  const hdr=document.querySelector("header.site");
  const onScroll=()=>{hdr.classList.toggle("scrolled",scrollY>8);const t=document.getElementById("toTop");if(t)t.classList.toggle("show",scrollY>600)};
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  const btn=document.getElementById("menuBtn"),nav=document.getElementById("mainNav");
  btn.addEventListener("click",()=>{const o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",o)});
  document.getElementById("toTop").addEventListener("click",()=>scrollTo({top:0}));
  document.querySelectorAll("[data-open-badge]").forEach(b=>{
    const n=new Date(),h=n.getHours()+n.getMinutes()/60,open=n.getDay()!==0&&h>=9&&h<17;
    b.innerHTML=open?'<span class="dot"></span> OPD is open now until 5 PM':'<span class="dot off"></span> OPD is closed. Emergency is open';
  });
  document.getElementById("yr").textContent=new Date().getFullYear();
});
function toast(msg){let t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";t.setAttribute("role","status");document.body.appendChild(t)}
  t.textContent=msg;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),2600)}
function openDialog(html){let d=document.getElementById("dlg");
  if(!d){d=document.createElement("dialog");d.id="dlg";document.body.appendChild(d);
    d.addEventListener("click",e=>{if(e.target===d)d.close()})}
  d.innerHTML='<div class="in"><button class="x" aria-label="Close">&times;</button>'+html+'</div>';
  d.querySelector(".x").onclick=()=>d.close();d.showModal();return d}
function docCard(d){
  const today=availableToday(d);
  return `<article class="doc"><div class="top"><div class="av" style="${avatarStyle(d.id)}" aria-hidden="true">${initials(d.name)}</div>
  <div><h3>${d.name}</h3><div class="q">${deptName(d.dept)}</div></div></div>
  <div class="tags">${today?'<span class="tag g">Available today</span>':'<span class="tag x">Not in today</span>'}<span class="tag">${d.exp} years</span></div>
  <p class="meta">${d.qual}<br>${daysText(d.days)}, ${fmtHour(d.from)} to ${fmtHour(d.to)}</p>
  <div class="acts"><button class="btn btn-o btn-s" data-profile="${d.id}">View profile</button><a class="btn btn-p btn-s" href="appointment.html?doctor=${d.id}">Book</a></div></article>`}
function showProfile(id){const d=DOCTORS.find(x=>x.id==id);if(!d)return;
  openDialog(`<div class="top" style="display:flex;gap:16px;align-items:center;margin-bottom:16px"><div class="av" style="${avatarStyle(d.id)};width:76px;height:76px;font-size:1.5rem">${initials(d.name)}</div><div><h2 style="margin:0">${d.name}</h2><div class="q" style="color:var(--muted)">${deptName(d.dept)}</div></div></div>
  <p>${d.bio}</p>
  <dl style="display:grid;grid-template-columns:auto 1fr;gap:8px 18px;margin:14px 0 20px"><dt style="color:var(--muted)">Qualification</dt><dd>${d.qual}</dd><dt style="color:var(--muted)">Experience</dt><dd>${d.exp} years</dd><dt style="color:var(--muted)">OPD days</dt><dd>${daysText(d.days)}</dd><dt style="color:var(--muted)">OPD time</dt><dd>${fmtHour(d.from)} to ${fmtHour(d.to)}</dd><dt style="color:var(--muted)">Languages</dt><dd>${d.langs.join(", ")}</dd><dt style="color:var(--muted)">Consultation fee</dt><dd>${d.fee?"Rs. "+d.fee:"No appointment needed"}</dd></dl>
  <a class="btn btn-p" href="appointment.html?doctor=${d.id}">Book with ${d.name.split(" ")[1]}</a>`)}
document.addEventListener("click",e=>{const b=e.target.closest("[data-profile]");if(b)showProfile(b.dataset.profile)});
