(function(){
  document.getElementById("pkgGrid").innerHTML=PACKAGES.map(p=>`<article class="pkg${p.pop?" pop":""}">${p.pop?'<span class="badge">Most chosen</span>':""}
   <h3>${p.name}</h3><p style="color:var(--muted);font-size:.92rem">${p.for}</p><div class="price">Rs. ${p.price.toLocaleString("en-IN")}<small> per person</small></div>
   <ul>${p.tests.map(t=>`<li>${t}</li>`).join("")}</ul><a class="btn ${p.pop?"btn-p":"btn-o"}" href="appointment.html?package=${p.id}">Book this package</a></article>`).join("");
  const yes='<span class="yes" aria-label="Included">&#10003;</span>',no='<span class="no" aria-label="Not included">&ndash;</span>';
  document.getElementById("cmp").innerHTML="<thead><tr><th>Included</th>"+PACKAGES.map(p=>`<th>${p.name}</th>`).join("")+"</tr></thead><tbody>"+
    COMPARE.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map(v=>`<td>${v?yes:no}</td>`).join("")}</tr>`).join("")+"</tbody>";
})();
