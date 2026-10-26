const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "miranda-bazar");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const diag = `
<script>
sessionStorage.setItem("ms_admin_session","1");
window.addEventListener("load",function(){
  setTimeout(function(){ document.querySelector("[data-action='open-admin']").click(); }, 300);
  setTimeout(function(){
    var tr = document.querySelector("#clientTableBody tr");
    var td = tr && tr.querySelector("td");
    var strong = tr && tr.querySelector("strong");
    var admin = document.querySelector(".admin");
    function props(el){ var s=getComputedStyle(el); return {vis:s.visibility, transitionProperty:s.transitionProperty, transitionDuration:s.transitionDuration, transitionDelay:s.transitionDelay, transitionBehavior:s.transitionBehavior}; }
    var anims = document.getAnimations().filter(function(a){ return a.transitionProperty; }).map(function(a){ return {prop:a.transitionProperty, target:a.effect.target.tagName + "." + a.effect.target.className, state:a.playState, current:a.currentTime, dur:a.effect.getTiming().duration, delay:a.effect.getTiming().delay}; });
    var diag = { admin: props(admin), tr: props(tr), td: props(td), strong: props(strong), transAnims: anims };
    var pre = document.createElement("pre"); pre.id = "diag"; pre.textContent = JSON.stringify(diag, null, 2); document.body.appendChild(pre);
  }, 3000);
});
</script>
</body>`;
fs.writeFileSync(path.join(root, "_preview-diag.html"), html.replace("</body>", diag));
console.log("diag written");
