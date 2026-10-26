const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "miranda-bazar");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const tab = process.argv[2] || "clientes";
const tabScript = tab === "ropa"
  ? 'setTimeout(function(){document.querySelector(\'.admin-tab[data-tab="ropa"]\').click();},250);'
  : "";
const inject = `<script>sessionStorage.setItem("ms_admin_session","1");window.addEventListener("load",function(){setTimeout(function(){document.querySelector("[data-action='open-admin']").click();${tabScript}},300);});</script>\n</body>`;
fs.writeFileSync(path.join(root, "_preview-admin.html"), html.replace("</body>", inject));
console.log("preview written for", tab);
