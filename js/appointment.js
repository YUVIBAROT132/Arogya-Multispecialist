/* Appointment wizard: doctor > date and slot > details > review */
(function(){
  const $=id=>document.getElementById(id);
  const st={step:1,dept:"",doc:null,date:"",slot:"",pkg:null};
  const params=new URLSearchParams(location.search);
  const stepEls=[...document.querySelectorAll("[data-step]")],stepper=[...document.querySelectorAll("#stepper li")];

  /* ---------- helpers ---------- */
  const iso=d=>{const z=new Date(d.getTime()-d.getTimezoneOffset()*60000);return z.toISOString().slice(0,10)};
  const fmtDate=s=>new Date(s+"T00:00").toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  function slotsFor(d){const out=[];for(let m=d.from*60;m<d.to*60;m+=30){const h=Math.floor(m/60),mm=m%60;
    out.push(String(h%12||12).padStart(2,"0")+":"+String(mm).padStart(2,"0")+" "+(h>=12?"PM":"AM"))}return out}
  function hash(s){let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h}
  function taken(doc,date,slot){
    if(loadBk().some(b=>b.docId===doc.id&&b.date===date&&b.slot===slot))return true;
    return hash(doc.id+date+slot)%4===0;          /* sample "already booked" slots */
  }
  function slotPassed(date,slot){if(date!==iso(new Date()))return false;
    const m=slot.match(/(\d+):(\d+) (AM|PM)/);let h=+m[1]%12+(m[3]==="PM"?12:0);const t=h*60+ +m[2];const n=new Date();return t<=n.getHours()*60+n.getMinutes()}

  /* ---------- step 1: doctor ---------- */
  const dchips=$("deptChips"),dlist=$("docPick");
  dchips.innerHTML='<button class="chip" aria-pressed="false" data-d="">All</button>'+DEPTS.filter(d=>d.slug!=="emergency").map(d=>`<button class="chip" aria-pressed="false" data-d="${d.slug}">${d.name}</button>`).join("");
  function renderDocs(){
    dchips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.d===st.dept));
    dlist.innerHTML=DOCTORS.filter(d=>d.id!==13&&(!st.dept||d.dept===st.dept)).map(d=>
     `<button type="button" class="opt" data-doc="${d.id}" aria-pressed="${st.doc&&st.doc.id===d.id}"><span class="av" style="${avatarStyle(d.id)}">${initials(d.name)}</span><span><b>${d.name}</b><small>${deptName(d.dept)} &middot; ${daysText(d.days)}</small></span></button>`).join("");
  }
  dchips.addEventListener("click",e=>{const c=e.target.closest(".chip");if(c){st.dept=c.dataset.d;renderDocs()}});
  dlist.addEventListener("click",e=>{const b=e.target.closest("[data-doc]");if(!b)return;st.doc=DOCTORS.find(d=>d.id==b.dataset.doc);st.date="";st.slot="";renderDocs();summary();$("e1").textContent=""});

  /* ---------- step 2: date and slot ---------- */
  function renderDates(){
    const box=$("dates");box.innerHTML="";if(!st.doc)return;
    const today=new Date();today.setHours(0,0,0,0);
    for(let i=0;i<14;i++){const d=new Date(today);d.setDate(today.getDate()+i);const s=iso(d);
      const works=st.doc.days.includes(d.getDay());
      const b=document.createElement("button");b.type="button";b.className="dt";b.disabled=!works;b.setAttribute("aria-pressed",st.date===s);b.dataset.date=s;
      b.setAttribute("aria-label",d.toDateString()+(works?"":" (doctor not available)"));
      b.innerHTML=`<small>${d.toLocaleDateString("en-IN",{weekday:"short"})}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString("en-IN",{month:"short"})}</small>`;box.appendChild(b)}
    renderSlots();
  }
  function renderSlots(){
    const box=$("slots");box.innerHTML="";$("slotHelp").textContent=st.date?"Struck-through times are already taken.":"Choose a date to see times.";
    if(!st.doc||!st.date)return;
    slotsFor(st.doc).forEach(s=>{const b=document.createElement("button");b.type="button";b.className="sl";b.textContent=s;
      b.disabled=taken(st.doc,st.date,s)||slotPassed(st.date,s);b.setAttribute("aria-pressed",st.slot===s);b.dataset.slot=s;box.appendChild(b)})}
  $("dates").addEventListener("click",e=>{const b=e.target.closest(".dt");if(!b||b.disabled)return;st.date=b.dataset.date;st.slot="";renderDates();summary();$("e2").textContent=""});
  $("slots").addEventListener("click",e=>{const b=e.target.closest(".sl");if(!b||b.disabled)return;st.slot=b.dataset.slot;renderSlots();summary();$("e2").textContent=""});

  /* ---------- step 3: details ---------- */
  const setE=(id,msg)=>{$(id+"E").textContent=msg;$(id).classList.toggle("bad",!!msg);return !msg};
  function validDetails(){const v=id=>$(id).value.trim();let ok=true;
    ok=setE("pn",/^[A-Za-z][A-Za-z .'-]{2,}$/.test(v("pn"))?"":"Enter the patient's full name (letters only).")&&ok;
    ok=setE("pa",v("pa")!==""&&+v("pa")>=0&&+v("pa")<=120?"":"Enter an age between 0 and 120.")&&ok;
    ok=setE("ps",v("ps")?"":"Choose one option.")&&ok;
    ok=setE("pm",/^[6-9]\d{9}$/.test(v("pm"))?"":"Enter a 10-digit mobile number starting with 6 to 9.")&&ok;return ok}

  /* ---------- summary and steps ---------- */
  function summary(){
    const rows=[["Doctor",st.doc?st.doc.name:"Not chosen"],["Department",st.doc?deptName(st.doc.dept):"-"],["Date",st.date?fmtDate(st.date).replace(/, \d{4}$/,""):"-"],["Time",st.slot||"-"],["Fee",st.doc?"Rs. "+st.doc.fee:"-"]];
    if(st.pkg)rows.splice(1,0,["Package",st.pkg.name]);
    $("sumList").innerHTML=rows.map(r=>`<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join("");
  }
  function go(n){st.step=n;stepEls.forEach(s=>s.hidden=+s.dataset.step!==n);
    stepper.forEach((li,i)=>{li.className=i+1===n?"on":i+1<n?"done":""});
    if(n===2)renderDates();if(n===4)review();
    $("wizTop").scrollIntoView({behavior:"smooth",block:"start"})}
  function review(){const f=id=>esc($(id).value.trim());
    $("review").innerHTML=`<dl style="display:grid;grid-template-columns:auto 1fr;gap:10px 22px">
     <dt style="color:var(--muted)">Doctor</dt><dd><b>${st.doc.name}</b>, ${deptName(st.doc.dept)}</dd>
     ${st.pkg?`<dt style="color:var(--muted)">Package</dt><dd>${st.pkg.name}</dd>`:""}
     <dt style="color:var(--muted)">When</dt><dd>${fmtDate(st.date)}, ${st.slot}</dd>
     <dt style="color:var(--muted)">Patient</dt><dd>${f("pn")}, ${f("pa")} years, ${f("ps")}</dd>
     <dt style="color:var(--muted)">Mobile</dt><dd>${f("pm")}</dd>
     ${$("pr").value.trim()?`<dt style="color:var(--muted)">Reason</dt><dd>${f("pr")}</dd>`:""}</dl>`}
  document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>{
    if(st.step===1){if(!st.doc){$("e1").textContent="Choose a doctor to continue.";return}go(2)}
    else if(st.step===2){if(!st.date||!st.slot){$("e2").textContent="Choose a date and a time slot.";return}go(3)}
    else if(st.step===3){if(validDetails())go(4)}}));
  document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>go(st.step-1)));

  /* ---------- confirm ---------- */
  $("confirm").addEventListener("click",()=>{
    if(taken(st.doc,st.date,st.slot)){toast("That slot was just taken. Please pick another.");go(2);return}
    const id="AR"+String(Date.now()).slice(-6);
    const bk={id,docId:st.doc.id,doctor:st.doc.name,dept:deptName(st.doc.dept),date:st.date,slot:st.slot,name:$("pn").value.trim(),age:$("pa").value,sex:$("ps").value,mobile:$("pm").value.trim(),reason:$("pr").value.trim(),pkg:st.pkg?st.pkg.name:""};
    const l=loadBk();l.push(bk);saveBk(l);
    stepEls.forEach(s=>s.hidden=true);$("stepper").hidden=true;$("pkgNote").hidden=true;
    const ok=$("done");ok.hidden=false;
    ok.innerHTML=`<h2>Appointment confirmed</h2><p>Keep this booking ID. You will need it to find or cancel your booking.</p><div class="id">${id}</div>
     <p><b>${esc(bk.doctor)}</b>, ${esc(bk.dept)}<br>${fmtDate(bk.date)} at ${bk.slot}<br>Please arrive 15 minutes early and bring a photo ID.</p>
     <div class="acts"><button class="btn btn-p btn-s" id="ics">Add to calendar</button><button class="btn btn-o btn-s" id="prt">Print</button><a class="btn btn-o btn-s" href="appointment.html">Book another</a></div>`;
    $("ics").onclick=()=>ics(bk);$("prt").onclick=()=>print();
    renderMine();ok.scrollIntoView({behavior:"smooth",block:"start"});
  });
  function ics(b){const m=b.slot.match(/(\d+):(\d+) (AM|PM)/);const h=+m[1]%12+(m[3]==="PM"?12:0);
    const d=b.date.replace(/-/g,"");const p=n=>String(n).padStart(2,"0");const s=d+"T"+p(h)+m[2]+"00";const e=d+"T"+p(h+(+m[2]+30>=60?1:0))+p((+m[2]+30)%60)+"00";
    const txt=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Arogya Hospital//Demo//EN","BEGIN:VEVENT","UID:"+b.id+"@arogya","DTSTAMP:"+new Date().toISOString().replace(/[-:]|\.\d+/g,""),"DTSTART:"+s,"DTEND:"+e,"SUMMARY:Appointment with "+b.doctor,"DESCRIPTION:Booking ID "+b.id+". Arrive 15 minutes early.","LOCATION:Arogya Multispecialty Hospital","END:VEVENT","END:VCALENDAR"].join("\r\n");
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:"text/calendar"}));a.download="appointment-"+b.id+".ics";a.click();toast("Calendar file downloaded")}

  /* ---------- my bookings ---------- */
  function renderMine(){
    const q=$("lk").value.trim().toUpperCase();const l=loadBk().filter(b=>!q||b.id.includes(q));
    $("mine").innerHTML=l.length?l.map(b=>`<li><span><b>${b.id}</b><br>${esc(b.doctor)}, ${b.date} ${b.slot}</span><button class="link-b" data-cancel="${b.id}">Cancel</button></li>`).join(""):'<li>No bookings found on this device.</li>'}
  $("lk").addEventListener("input",renderMine);
  $("mine").addEventListener("click",e=>{const c=e.target.closest("[data-cancel]");if(!c)return;
    saveBk(loadBk().filter(b=>b.id!==c.dataset.cancel));renderMine();toast("Booking cancelled");if(st.step===2)renderSlots()});

  /* ---------- init from URL ---------- */
  const pk=PACKAGES.find(p=>p.id===params.get("package"));
  if(pk){st.pkg=pk;st.doc=DOCTORS.find(d=>d.id===10);st.dept="medicine";$("pkgNote").hidden=false;$("pkgNote").innerHTML="Booking the <b>"+pk.name+"</b> package. A physician will review your results. You can change the doctor below."}
  const wanted=DOCTORS.find(d=>d.id==params.get("doctor"));
  if(wanted){st.doc=wanted;st.dept=wanted.dept}
  renderDocs();summary();renderMine();
})();
