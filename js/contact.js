(function(){
  const f=document.getElementById("cf"),ok=document.getElementById("cok"),m=document.getElementById("cmsg"),cc=document.getElementById("cc");
  m.addEventListener("input",()=>cc.textContent=m.value.length+" / 500");
  const err=(id,msg)=>{document.getElementById(id+"E").textContent=msg;document.getElementById(id).classList.toggle("bad",!!msg);return !msg};
  f.addEventListener("submit",e=>{e.preventDefault();const v=id=>document.getElementById(id).value.trim();let good=true;
    good=err("cn",v("cn").length>=3?"":"Enter your name.")&&good;
    good=err("ct",v("ct")?"":"Choose a topic.")&&good;
    good=err("cmsg",v("cmsg").length>=15?"":"Write at least 15 characters.")&&good;
    if(!good)return;
    ok.hidden=false;ok.innerHTML="<h3>Thank you, "+esc(v("cn"))+"</h3><p>Your message about <b>"+esc(v("ct"))+"</b> has been recorded. This demo site stores it in your browser only and does not send messages to a server.</p>";
    f.reset();cc.textContent="0 / 500";ok.scrollIntoView({behavior:"smooth",block:"center"})});
})();
