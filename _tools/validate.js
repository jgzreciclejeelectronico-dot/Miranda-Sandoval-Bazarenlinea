const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "miranda-bazar");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log("IDs:", ids.length, "duplicados:", [...new Set(dupIds)]);

const refs = [...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)]
  .map((m) => m[1])
  .filter((u) => !/^(https?:|data:|mailto:|tel:|\/\/)/.test(u) && !u.startsWith("#"));
const missing = [...new Set(refs)].filter((u) => !fs.existsSync(path.join(root, u.split("?")[0])));
console.log("Referencias locales:", new Set(refs).size, "faltantes:", missing);

const swAssets = [...sw.matchAll(/"\.\/([^"]+)"/g)].map((m) => m[1]);
const swMissing = swAssets.filter((u) => !fs.existsSync(path.join(root, u === "" ? "index.html" : u)));
console.log("Assets SW:", swAssets.length, "faltantes:", swMissing);
console.log("JS syntax:", (() => { try { new Function(fs.readFileSync(path.join(root, "js/app.js"), "utf8")); return "ok"; } catch (e) { return e.message; } })());
