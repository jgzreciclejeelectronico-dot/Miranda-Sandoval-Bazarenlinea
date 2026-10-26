/* ==========================================================================
   MIRANDA SANDOVAL · BAZAR EN LÍNEA
   Lógica de la aplicación
   Índice:
   01. Configuración y datos iniciales
   02. Utilidades
   03. Almacenamiento y estado
   04. Catálogo público
   05. Detalle de prenda
   06. Sección live (cámara, embed, chat)
   07. Acceso privado
   08. Panel privado (tabs)
   09. Clientes (CRM)
   10. Ropa (inventario)
   11. Exportaciones y difusión
   12. Instalación PWA
   13. Modales, navegación y UI
   14. Inicio
   ========================================================================== */
(function () {
  "use strict";

  /* ==========================================================================
     01. CONFIGURACIÓN Y DATOS INICIALES
     ========================================================================== */
  var CONFIG = {
    phone: "528123752627",
    phoneDisplay: "+52 81 2375 2627",
    // Hash base64 de la contraseña del panel privado.
    adminKey: "bWlyYW5kYTI2Mjc=",
    store: {
      clients: "ms_clients_v2",
      ropa: "ms_ropa_v2",
      chat: "ms_chat_v1",
      liveEmbed: "ms_live_embed_v1",
      session: "ms_admin_session"
    }
  };

  var CATEGORIES = [
    "Todas",
    "Blusas",
    "Jeans",
    "Vestidos",
    "Chamarras",
    "Faldas",
    "Suéteres",
    "Blazers",
    "Accesorios"
  ];

  var SEED_ROPA = [
    {
      id: "ropa-blusa",
      nombre: "Blusa Aurora",
      categoria: "Blusas",
      talla: "M",
      precio: 185,
      condicion: "Excelente",
      imagen: "assets/productos/blusa.jpg",
      descripcion: "Blusa de seda color marfil con botones nacarados y manga globo. Ideal para un look de día con jeans rectos.",
      destacada: true,
      createdAt: "2026-10-20T10:00:00.000Z"
    },
    {
      id: "ropa-jeans",
      nombre: "Jean Monterrey",
      categoria: "Jeans",
      talla: "28",
      precio: 290,
      condicion: "Excelente",
      imagen: "assets/productos/jeans.jpg",
      descripcion: "Jeans recto de tiro alto en mezclilla clara. Corte cómodo y versátil, una pieza que no falla.",
      destacada: false,
      createdAt: "2026-10-19T10:00:00.000Z"
    },
    {
      id: "ropa-vestido",
      nombre: "Vestido Noche",
      categoria: "Vestidos",
      talla: "S",
      precio: 340,
      condicion: "Excelente",
      imagen: "assets/productos/vestido.jpg",
      descripcion: "Vestido midi negro de satén con tirantes finos. Perfecto para una cena o un evento especial.",
      destacada: true,
      createdAt: "2026-10-18T10:00:00.000Z"
    },
    {
      id: "ropa-chamarra",
      nombre: "Chamarra Vintage",
      categoria: "Chamarras",
      talla: "L",
      precio: 320,
      condicion: "Buena",
      imagen: "assets/productos/chamarra.jpg",
      descripcion: "Chamarra de mezclilla oversized con lavado vintage. Un básico que mejora con el tiempo.",
      destacada: false,
      createdAt: "2026-10-17T10:00:00.000Z"
    },
    {
      id: "ropa-falda",
      nombre: "Falda Arena",
      categoria: "Faldas",
      talla: "M",
      precio: 190,
      condicion: "Excelente",
      imagen: "assets/productos/falda.jpg",
      descripcion: "Falda midi plisada color arena. Cae preciosa y combina con suéteres y blusas.",
      destacada: false,
      createdAt: "2026-10-16T10:00:00.000Z"
    },
    {
      id: "ropa-sueter",
      nombre: "Suéter Nube",
      categoria: "Suéteres",
      talla: "M",
      precio: 240,
      condicion: "Excelente",
      imagen: "assets/productos/sueter.jpg",
      descripcion: "Suéter tejido crema con textura de trenza. Suave, cálido y fácil de combinar.",
      destacada: false,
      createdAt: "2026-10-15T10:00:00.000Z"
    },
    {
      id: "ropa-blazer",
      nombre: "Blazer Atelier",
      categoria: "Blazers",
      talla: "S",
      precio: 380,
      condicion: "Excelente",
      imagen: "assets/productos/blazer.jpg",
      descripcion: "Blazer camel de corte estructurado. Eleva cualquier outfit, de día o de noche.",
      destacada: true,
      createdAt: "2026-10-14T10:00:00.000Z"
    },
    {
      id: "ropa-bolso",
      nombre: "Bolso Caramelo",
      categoria: "Accesorios",
      talla: "Única",
      precio: 260,
      condicion: "Excelente",
      imagen: "assets/productos/bolso.jpg",
      descripcion: "Bolso de piel color caramelo con herrajes dorados. Espacioso y atemporal.",
      destacada: false,
      createdAt: "2026-10-13T10:00:00.000Z"
    }
  ];

  var SEED_CLIENTS = [
    {
      id: "cliente-fernanda",
      nombre: "Fernanda Ríos",
      whatsapp: "8112345678",
      talla: "M",
      estado: "VIP",
      colonia: "Del Valle",
      ciudad: "San Pedro Garza García",
      gasto: 2450,
      compras: 8,
      notas: "Prefiere tonos neutros y avisos por WhatsApp.",
      createdAt: "2026-08-12T10:00:00.000Z"
    },
    {
      id: "cliente-sofia",
      nombre: "Sofía Martínez",
      whatsapp: "8123456789",
      talla: "S",
      estado: "Frecuente",
      colonia: "Centro",
      ciudad: "Monterrey",
      gasto: 1180,
      compras: 4,
      notas: "Le encantan los vestidos.",
      createdAt: "2026-09-03T10:00:00.000Z"
    },
    {
      id: "cliente-paulina",
      nombre: "Paulina Garza",
      whatsapp: "8134567890",
      talla: "L",
      estado: "Nueva",
      colonia: "Guadalupe",
      ciudad: "Guadalupe",
      gasto: 320,
      compras: 1,
      notas: "Llegó por el live de septiembre.",
      createdAt: "2026-10-01T10:00:00.000Z"
    },
    {
      id: "cliente-andrea",
      nombre: "Andrea López",
      whatsapp: "8145678901",
      talla: "M",
      estado: "Apartado",
      colonia: "Cumbres",
      ciudad: "Monterrey",
      gasto: 640,
      compras: 2,
      notas: "Apartó vestido Noche, liquida el viernes.",
      createdAt: "2026-10-10T10:00:00.000Z"
    },
    {
      id: "cliente-mariana",
      nombre: "Mariana Treviño",
      whatsapp: "8156789012",
      talla: "S",
      estado: "Deudor",
      colonia: "Anáhuac",
      ciudad: "San Nicolás",
      gasto: 500,
      compras: 2,
      notas: "Debe $250 del apartado de la falda Arena.",
      createdAt: "2026-09-22T10:00:00.000Z"
    }
  ];

  var CHAT_SEED = [
    { name: "Miranda", text: "¡Bienvenidas al live de hoy! Estoy aquí para mostrarles las piezas nuevas.", type: "host" },
    { name: "Paulina", text: "¡Hola desde Guadalupe! Me encantó la blusa Aurora.", type: "guest" },
    { name: "Sofía", text: "¿La blusa viene en talla M?", type: "guest" },
    { name: "Miranda", text: "¡Sí! M y L disponibles. Se aparta con $100.", type: "host" }
  ];

  /* ==========================================================================
     02. UTILIDADES
     ========================================================================== */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function icon(name, extraClass) {
    return (
      '<svg class="icon ' + (extraClass || "") + '" aria-hidden="true"><use href="#i-' +
      name + '"></use></svg>'
    );
  }

  function money(value) {
    var n = Number(value) || 0;
    return "$" + n.toLocaleString("es-MX");
  }

  function uid(prefix) {
    return (
      prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7)
    );
  }

  function normalizePhone(value) {
    var digits = String(value || "").replace(/\D/g, "");
    if (digits.length === 13 && digits.indexOf("521") === 0) digits = digits.slice(3);
    if (digits.length === 12 && digits.indexOf("52") === 0) digits = digits.slice(2);
    return digits;
  }

  function formatPhone(value) {
    var d = normalizePhone(value);
    if (d.length !== 10) return d || "—";
    return d.slice(0, 2) + " " + d.slice(2, 6) + " " + d.slice(6);
  }

  function waLink(message) {
    return "https://wa.me/" + CONFIG.phone + "?text=" + encodeURIComponent(message || "");
  }

  function safeImage(src) {
    if (typeof src !== "string") return "";
    if (/^assets\//.test(src)) return src;
    if (/^data:image\/(png|jpe?g|webp);base64,/i.test(src)) return src;
    if (/^https?:\/\//i.test(src)) return src;
    return "";
  }

  function dateStamp() {
    var d = new Date();
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  function nextLiveDate() {
    var now = new Date();
    var target = new Date(now);
    var day = now.getDay();
    var add = (5 - day + 7) % 7;
    target.setDate(now.getDate() + add);
    target.setHours(20, 30, 0, 0);
    if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
    return target;
  }

  function nextLiveLabel() {
    var date = nextLiveDate();
    var raw = date.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
    return raw.charAt(0).toUpperCase() + raw.slice(1) + " · 8:30 PM";
  }

  var toastTimer = null;
  function toast(message, type) {
    var el = $("#toast");
    var text = $("#toastText");
    var use = el.querySelector("use");
    if (!el || !text) return;
    text.textContent = message;
    el.classList.toggle("is-error", type === "error");
    use.setAttribute("href", type === "error" ? "#i-x" : "#i-check");
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 3600);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard
        .writeText(text)
        .then(function () {
          return true;
        })
        .catch(function () {
          return legacyCopy(text);
        });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function compressImage(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !file.type || file.type.indexOf("image/") !== 0) {
        reject(new Error("Selecciona una imagen válida."));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error("La imagen supera los 10 MB. Usa una más ligera."));
        return;
      }
      var objectUrl = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        try {
          var max = 900;
          var scale = Math.min(1, max / Math.max(img.width, img.height));
          var canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(objectUrl);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        } catch (err) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error("No pudimos procesar la imagen."));
        }
      };
      img.onerror = function () {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("No pudimos leer la imagen."));
      };
      img.src = objectUrl;
    });
  }

  /* ==========================================================================
     03. ALMACENAMIENTO Y ESTADO
     ========================================================================== */
  var state = {
    filter: "Todas",
    liveIndex: 0,
    chat: [],
    clients: [],
    ropa: [],
    lastFocus: null,
    lastAdminTrigger: null,
    previewUrl: null,
    ropaFile: null,
    live: {
      stream: null,
      facing: "user",
      startedAt: 0,
      timer: null,
      embed: null,
      starting: false
    },
    deferredPrompt: null
  };

  function readStore(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      var data = JSON.parse(raw);
      return Array.isArray(data) ? data : null;
    } catch (err) {
      return null;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  function loadData() {
    var clients = readStore(CONFIG.store.clients, null);
    if (clients) {
      state.clients = clients;
    } else {
      state.clients = SEED_CLIENTS.slice();
      writeStore(CONFIG.store.clients, state.clients);
    }

    var ropa = readStore(CONFIG.store.ropa, null);
    if (ropa) {
      state.ropa = ropa;
    } else {
      state.ropa = SEED_ROPA.slice();
      writeStore(CONFIG.store.ropa, state.ropa);
    }

    var chat = readStore(CONFIG.store.chat, null);
    if (chat) {
      state.chat = chat.slice(-50);
    } else {
      state.chat = CHAT_SEED.slice();
      writeStore(CONFIG.store.chat, state.chat);
    }
  }

  /* ==========================================================================
     04. CATÁLOGO PÚBLICO
     ========================================================================== */
  function renderFilters() {
    var wrap = $("#catalogFilters");
    if (!wrap) return;
    wrap.innerHTML = CATEGORIES.map(function (category) {
      return (
        '<button class="chip' +
        (state.filter === category ? " is-active" : "") +
        '" type="button" data-filter="' +
        escapeHtml(category) +
        '" aria-pressed="' +
        (state.filter === category ? "true" : "false") +
        '">' +
        escapeHtml(category) +
        "</button>"
      );
    }).join("");
  }

  function productCard(item) {
    var image = safeImage(item.imagen);
    var openLabel = "Ver " + item.nombre;
    var media = image
      ? '<img src="' +
        escapeHtml(image) +
        '" alt="' +
        escapeHtml(item.nombre) +
        '" loading="lazy" decoding="async" data-product-img>'
      : icon("tag");

    return (
      '<article class="product-card">' +
      '<button class="product-card__media' +
      (image ? "" : " product-card__media--placeholder") +
      '" type="button" data-product-id="' +
      escapeHtml(item.id) +
      '" aria-label="' +
      escapeHtml(openLabel) +
      '">' +
      media +
      (item.destacada
        ? '<span class="product-card__badge product-card__badge--gold">Destacada</span>'
        : '<span class="product-card__badge">Nueva</span>') +
      "</button>" +
      '<div class="product-card__body">' +
      '<p class="product-card__cat">' +
      escapeHtml(item.categoria) +
      "</p>" +
      '<button class="product-card__name" type="button" data-product-id="' +
      escapeHtml(item.id) +
      '">' +
      escapeHtml(item.nombre) +
      "</button>" +
      '<p class="product-card__meta">Talla ' +
      escapeHtml(item.talla) +
      " · " +
      escapeHtml(item.condicion) +
      "</p>" +
      '<div class="product-card__foot">' +
      '<span class="product-card__price">' +
      money(item.precio) +
      "</span>" +
      '<a class="product-card__cta" href="' +
      escapeHtml(waLink(productWaMessage(item))) +
      '" target="_blank" rel="noopener" aria-label="' +
      escapeHtml("Apartar " + item.nombre + " por WhatsApp") +
      '">' +
      icon("message") +
      "<span>Apartar</span></a>" +
      "</div></div></article>"
    );
  }

  function productWaMessage(item) {
    return (
      'Hola Miranda! Me interesa la prenda "' +
      item.nombre +
      '" (' +
      item.categoria +
      ", talla " +
      item.talla +
      ") de " +
      money(item.precio) +
      ". ¿Sigue disponible?"
    );
  }

  function renderCatalog() {
    var grid = $("#productGrid");
    var empty = $("#catalogEmpty");
    var count = $("#catalogCount");
    if (!grid) return;
    var items = state.ropa.filter(function (item) {
      return state.filter === "Todas" || item.categoria === state.filter;
    });

    grid.innerHTML = items.map(productCard).join("");
    if (count) count.textContent = String(items.length);
    if (empty) empty.hidden = items.length > 0;

    $$("img[data-product-img]", grid).forEach(function (img) {
      img.addEventListener("error", function () {
        var media = img.closest(".product-card__media");
        if (!media) return;
        media.classList.add("product-card__media--placeholder");
        media.innerHTML = icon("tag");
      });
    });
  }

  function renderLiveProduct() {
    var img = $("#liveProductImg");
    var cat = $("#liveProductCat");
    var name = $("#liveProductName");
    var price = $("#liveProductPrice");
    var size = $("#liveProductSize");
    var link = $("#liveProductWa");
    if (!img || !cat || !name || !price || !size || !link) return;

    var featured = state.ropa.filter(function (item) {
      return item.destacada;
    });
    var pool = featured.length ? featured : state.ropa;

    if (!pool.length) {
      img.src = "assets/hero-boutique.jpg";
      img.alt = "";
      cat.textContent = "Live";
      name.textContent = "Próximamente";
      price.textContent = "—";
      size.textContent = "—";
      link.href = waLink("Hola Miranda, ¿cuándo es el próximo live?");
      return;
    }

    state.liveIndex = ((state.liveIndex % pool.length) + pool.length) % pool.length;
    var item = pool[state.liveIndex];
    var image = safeImage(item.imagen);
    img.src = image || "assets/hero-boutique.jpg";
    img.alt = item.nombre;
    cat.textContent = item.categoria;
    name.textContent = item.nombre;
    price.textContent = money(item.precio);
    size.textContent = item.talla;
    link.href = waLink(productWaMessage(item));
  }

  function nextLiveProduct() {
    var featured = state.ropa.filter(function (item) {
      return item.destacada;
    });
    var pool = featured.length ? featured : state.ropa;
    if (!pool.length) return;
    state.liveIndex = (state.liveIndex + 1) % pool.length;
    renderLiveProduct();
  }

  /* ==========================================================================
     05. DETALLE DE PRENDA
     ========================================================================== */
  function openProduct(id) {
    var item = state.ropa.find(function (entry) {
      return entry.id === id;
    });
    if (!item) return;

    var image = $("#pdImage");
    image.src = safeImage(item.imagen) || "assets/hero-boutique.jpg";
    image.alt = item.nombre;
    $("#pdCat").textContent = item.categoria;
    $("#pdName").textContent = item.nombre;
    $("#pdPrice").textContent = money(item.precio);
    $("#pdSize").textContent = item.talla;
    $("#pdCond").textContent = item.condicion;
    $("#pdDesc").textContent =
      item.descripcion || "Pieza única seleccionada a mano en nuestra paca premium.";
    $("#pdWa").href = waLink(productWaMessage(item));

    openModal("productModal");
  }

  /* ==========================================================================
     06. SECCIÓN LIVE
     ========================================================================== */
  function liveStage() {
    return $("#liveStage");
  }

  function showLiveError(message) {
    var box = $("#liveError");
    if (!box) return;
    box.textContent = message;
    box.hidden = false;
  }

  function hideLiveError() {
    var box = $("#liveError");
    if (!box) return;
    box.hidden = true;
    box.textContent = "";
  }

  function startLiveTimer() {
    var timerEl = $("#liveTimer");
    clearInterval(state.live.timer);
    if (!state.live.startedAt) state.live.startedAt = Date.now();
    function tick() {
      var seconds = Math.max(0, Math.floor((Date.now() - state.live.startedAt) / 1000));
      var mm = String(Math.floor(seconds / 60)).padStart(2, "0");
      var ss = String(seconds % 60).padStart(2, "0");
      if (timerEl) timerEl.textContent = "EN VIVO · " + mm + ":" + ss;
    }
    tick();
    state.live.timer = setInterval(tick, 1000);
  }

  function stopLiveTimer() {
    clearInterval(state.live.timer);
    state.live.timer = null;
    state.live.startedAt = 0;
    var timerEl = $("#liveTimer");
    if (timerEl) timerEl.textContent = nextLiveLabel();
  }

  function stopTracks() {
    if (state.live.stream) {
      state.live.stream.getTracks().forEach(function (track) {
        track.stop();
      });
      state.live.stream = null;
    }
    var video = $("#liveVideo");
    if (video) video.srcObject = null;
  }

  function cameraErrorMessage(error) {
    if (!error) return "No pudimos abrir la cámara.";
    if (error.name === "NotAllowedError" || error.name === "SecurityError") {
      return "Permiso de cámara denegado. Habilítalo en los ajustes del navegador e intenta de nuevo.";
    }
    if (error.name === "NotFoundError" || error.name === "OverconstrainedError") {
      return "No encontramos una cámara disponible en este dispositivo.";
    }
    if (error.name === "NotReadableError") {
      return "La cámara está siendo usada por otra aplicación.";
    }
    return "No pudimos abrir la cámara. Revisa los permisos e intenta de nuevo.";
  }

  function readLiveEmbed() {
    try {
      return localStorage.getItem(CONFIG.store.liveEmbed) || "";
    } catch (err) {
      return "";
    }
  }

  function saveLiveEmbed(raw) {
    try {
      localStorage.setItem(CONFIG.store.liveEmbed, raw);
    } catch (err) {
      /* almacenamiento no disponible */
    }
  }

  function removeLiveEmbed() {
    try {
      localStorage.removeItem(CONFIG.store.liveEmbed);
    } catch (err) {
      /* almacenamiento no disponible */
    }
  }

  function liveShareUrl() {
    var base = location.href.split(/[?#]/)[0];
    if (state.live.embed && state.live.embed.raw) {
      return base + "?live=" + encodeURIComponent(state.live.embed.raw) + "#live";
    }
    return base + "#live";
  }

  function applyPublicEmbed(parsed) {
    var viewer = $("#publicLiveViewer");
    var frame = $("#publicLiveFrame");
    var poster = $("#publicLiveViewer .live-stage__poster");
    var center = $("#publicLiveCenter");
    var badge = $("#publicLiveBadgeText");
    var meta = $("#publicLiveMeta");
    if (!viewer || !frame) return;
    frame.src = parsed.src;
    frame.hidden = false;
    if (poster) poster.hidden = true;
    if (center) center.hidden = true;
    if (badge) badge.textContent = "EN VIVO";
    if (meta) meta.textContent = parsed.platform + " · en vivo";
    viewer.classList.add("is-embed", "is-live");
  }

  function clearPublicEmbed() {
    var viewer = $("#publicLiveViewer");
    var frame = $("#publicLiveFrame");
    var poster = $("#publicLiveViewer .live-stage__poster");
    var center = $("#publicLiveCenter");
    var badge = $("#publicLiveBadgeText");
    var meta = $("#publicLiveMeta");
    if (frame) {
      frame.hidden = true;
      frame.src = "about:blank";
    }
    if (poster) poster.hidden = false;
    if (center) center.hidden = false;
    if (badge) badge.textContent = "Próximo live";
    if (meta) meta.textContent = nextLiveLabel();
    if (viewer) viewer.classList.remove("is-embed", "is-live");
  }

  function applyAdminEmbed(parsed) {
    var stage = liveStage();
    var poster = $("#liveStage .live-stage__poster");
    var center = $("#liveCenter");
    var controls = $("#liveControls");
    var frame = $("#liveFrame");
    var badge = $("#liveBadgeText");
    var timer = $("#liveTimer");
    if (!stage || !frame) return;
    if (poster) poster.hidden = true;
    if (center) center.hidden = true;
    if (controls) controls.hidden = true;
    frame.hidden = false;
    frame.src = parsed.src;
    stage.classList.add("is-embed", "is-live");
    if (badge) badge.textContent = "EN VIVO";
    if (timer) timer.textContent = parsed.platform + " · conectado";
  }

  function clearEmbed(silent) {
    stopTracks();
    stopLiveTimer();
    state.live.embed = null;
    removeLiveEmbed();
    resetLiveUi();
    clearPublicEmbed();
    hideLiveError();
    if (!silent) toast("Transmisión desconectada.");
  }

  function resetLiveUi() {
    var stage = liveStage();
    var poster = $("#liveStage .live-stage__poster");
    var center = $("#liveCenter");
    var controls = $("#liveControls");
    var frame = $("#liveFrame");
    var badge = $("#liveBadgeText");
    if (!stage) return;
    stage.classList.remove("is-live", "is-embed", "is-front", "is-rear");
    if (poster) poster.hidden = false;
    if (frame) {
      frame.hidden = true;
      frame.src = "about:blank";
    }
    if (center) center.hidden = false;
    if (controls) controls.hidden = true;
    if (badge) badge.textContent = "Cámara apagada";
  }

  async function startLive() {
    if (state.live.starting) return false;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showLiveError(
        "Este navegador no permite usar la cámara. Abre la web desde HTTPS o localhost e intenta de nuevo."
      );
      toast("La cámara necesita un contexto seguro (HTTPS).", "error");
      return false;
    }

    state.live.starting = true;
    hideLiveError();
    stopTracks();

    try {
      var stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: state.live.facing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      state.live.stream = stream;
      var video = $("#liveVideo");
      video.srcObject = stream;
      video.play().catch(function () {});

      var stage = liveStage();
      var poster = $("#liveStage .live-stage__poster");
      var center = $("#liveCenter");
      var controls = $("#liveControls");
      var badge = $("#liveBadgeText");
      var frame = $("#liveFrame");

      frame.hidden = true;
      frame.src = "about:blank";
      poster.hidden = false;
      stage.classList.add("is-live");
      stage.classList.remove("is-embed", "is-rear");
      stage.classList.toggle("is-front", state.live.facing === "user");
      center.hidden = true;
      controls.hidden = false;
      badge.textContent = "EN VIVO";
      startLiveTimer();
      pushChatMessage({
        name: "Sistema",
        text: "Cámara de vista previa iniciada desde el panel privado.",
        type: "system"
      });
      toast("Cámara activada. Se ve solo en el panel privado.");
      return true;
    } catch (error) {
      stopTracks();
      stopLiveTimer();
      resetLiveUi();
      if (state.live.embed) applyAdminEmbed(state.live.embed);
      showLiveError(cameraErrorMessage(error));
      toast("No pudimos iniciar la cámara.", "error");
      return false;
    } finally {
      state.live.starting = false;
    }
  }

  function stopLive() {
    stopTracks();
    stopLiveTimer();
    resetLiveUi();
    if (state.live.embed) applyAdminEmbed(state.live.embed);
    hideLiveError();
    toast("Cámara finalizada.");
  }

  async function switchCamera() {
    state.live.facing = state.live.facing === "user" ? "environment" : "user";
    if (state.live.stream) {
      var ok = await startLive();
      if (ok) toast("Cámara cambiada.");
    } else {
      toast(
        state.live.facing === "environment"
          ? "Se usará la cámara trasera al iniciar."
          : "Se usará la cámara frontal al iniciar."
      );
    }
  }

  function parseLiveUrl(raw) {
    var url;
    try {
      url = new URL(raw);
    } catch (err) {
      return null;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    var host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
      var id = "";
      if (host === "youtu.be") {
        id = url.pathname.slice(1).split("/")[0];
      } else if (url.searchParams.get("v")) {
        id = url.searchParams.get("v");
      } else if (url.pathname.indexOf("/live/") === 0) {
        id = url.pathname.split("/live/")[1].split("/")[0];
      } else if (url.pathname.indexOf("/embed/") === 0) {
        id = url.pathname.split("/embed/")[1].split("/")[0];
      }
      if (!/^[A-Za-z0-9_-]{6,}$/.test(id)) return null;
      return {
        platform: "YouTube",
        src:
          "https://www.youtube-nocookie.com/embed/" +
          encodeURIComponent(id) +
          "?autoplay=1&rel=0"
      };
    }

    if (host === "facebook.com" || host === "m.facebook.com" || host === "fb.watch") {
      return {
        platform: "Facebook",
        src:
          "https://www.facebook.com/plugins/video.php?href=" +
          encodeURIComponent(url.href) +
          "&show_text=false&autoplay=1"
      };
    }

    return null;
  }

  function showEmbed(raw) {
    var parsed = parseLiveUrl(raw);
    var note = $("#liveEmbedNote");
    if (!parsed) {
      if (note) {
        note.textContent =
          "Ese enlace no es válido. Usa un enlace de YouTube o Facebook (por ejemplo, youtube.com/live/...).";
      }
      toast("Enlace no válido. Usa YouTube o Facebook.", "error");
      return;
    }

    stopTracks();
    stopLiveTimer();

    parsed.raw = raw;
    state.live.embed = parsed;
    saveLiveEmbed(raw);
    applyAdminEmbed(parsed);
    applyPublicEmbed(parsed);

    var input = $("#liveUrl");
    if (input) input.value = raw;
    if (note) {
      note.textContent =
        "Transmisión de " +
        parsed.platform +
        " conectada. Comparte el enlace con tus clientas para que la vean.";
    }
    hideLiveError();
    toast("Transmisión de " + parsed.platform + " conectada.");
  }

  function restoreLiveEmbed() {
    var candidates = [];
    try {
      var shared = new URLSearchParams(location.search).get("live");
      if (shared) candidates.push(shared);
    } catch (err) {
      /* sin parámetros */
    }
    var saved = readLiveEmbed();
    if (saved) candidates.push(saved);

    for (var i = 0; i < candidates.length; i += 1) {
      var raw = candidates[i];
      var parsed = parseLiveUrl(raw);
      if (!parsed) continue;
      parsed.raw = raw;
      state.live.embed = parsed;
      var input = $("#liveUrl");
      if (input) input.value = raw;
      applyAdminEmbed(parsed);
      applyPublicEmbed(parsed);
      var note = $("#liveEmbedNote");
      if (note) {
        note.textContent =
          "Transmisión de " +
          parsed.platform +
          " conectada. Comparte el enlace con tus clientas para que la vean.";
      }
      return;
    }
  }

  function renderChat() {
    var box = $("#chatMessages");
    if (!box) return;
    box.innerHTML = state.chat
      .map(function (msg) {
        if (msg.type === "system") {
          return '<p class="chat-msg chat-msg--system">' + escapeHtml(msg.text) + "</p>";
        }
        return (
          '<div class="chat-msg' +
          (msg.type === "self" ? " chat-msg--self" : "") +
          '">' +
          '<span class="chat-msg__name">' +
          escapeHtml(msg.name) +
          "</span>" +
          escapeHtml(msg.text) +
          "</div>"
        );
      })
      .join("");
    box.scrollTop = box.scrollHeight;
  }

  function pushChatMessage(message) {
    state.chat.push(message);
    if (state.chat.length > 50) state.chat = state.chat.slice(-50);
    writeStore(CONFIG.store.chat, state.chat);
    renderChat();
  }

  async function shareLive() {
    var url = liveShareUrl();
    var text = state.live.embed
      ? "¡Estamos EN VIVO en Miranda Bazar! Piezas únicas y precios especiales."
      : "Te esperamos en el próximo live de Miranda Bazar: piezas únicas y precios especiales.";
    var shareData = {
      title: "Miranda Sandoval · Bazar en Línea",
      text: text + " " + url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }

    var ok = await copyText(shareData.text);
    toast(
      ok ? "Enlace del live copiado. Compártelo por WhatsApp." : "No se pudo copiar el enlace.",
      ok ? undefined : "error"
    );
  }

  function copyLiveLink() {
    if (!state.live.embed) {
      toast("Primero conecta tu transmisión de YouTube o Facebook.", "error");
      return;
    }
    copyText(liveShareUrl()).then(function (ok) {
      toast(
        ok ? "Enlace para clientas copiado." : "No se pudo copiar el enlace.",
        ok ? undefined : "error"
      );
    });
  }

  /* ==========================================================================
     07. ACCESO PRIVADO
     ========================================================================== */
  function isAdminAuthed() {
    try {
      return sessionStorage.getItem(CONFIG.store.session) === "1";
    } catch (err) {
      return false;
    }
  }

  function setAdminSession(value) {
    try {
      if (value) sessionStorage.setItem(CONFIG.store.session, "1");
      else sessionStorage.removeItem(CONFIG.store.session);
    } catch (err) {
      /* almacenamiento no disponible */
    }
  }

  function checkAdminPassword(value) {
    try {
      return btoa(value) === CONFIG.adminKey;
    } catch (err) {
      return false;
    }
  }

  function requestAdmin() {
    state.lastAdminTrigger = document.activeElement;
    if (isAdminAuthed()) {
      showAdmin();
    } else {
      openModal("loginModal");
    }
  }

  function showAdmin() {
    var panel = $("#adminPanel");
    if (!panel) return;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    syncBodyLock();
    renderClients();
    renderRopa();
    refreshStats();
    setAdminTab("clientes");
    setTimeout(function () {
      var close = $(".admin__close");
      if (close) close.focus();
    }, 80);
  }

  function closeAdmin() {
    var panel = $("#adminPanel");
    if (!panel) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    syncBodyLock();
    if (state.lastAdminTrigger && typeof state.lastAdminTrigger.focus === "function") {
      state.lastAdminTrigger.focus();
    }
  }

  function logoutAdmin() {
    setAdminSession(false);
    closeAdmin();
    toast("Sesión cerrada correctamente.");
  }

  /* ==========================================================================
     08. PANEL PRIVADO (TABS)
     ========================================================================== */
  function setAdminTab(tab) {
    $$(".admin-tab").forEach(function (button) {
      var active = button.dataset.tab === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });

    $$(".admin-panel").forEach(function (panel) {
      var active = panel.dataset.panel === tab;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    var title = $("#adminTitle");
    if (title) {
      title.textContent = tab === "ropa" ? "Ropa" : tab === "live" ? "En vivo" : "Clientes";
    }
    var scroll = $("#adminScroll");
    if (scroll) scroll.scrollTop = 0;
  }

  /* ==========================================================================
     09. CLIENTES (CRM)
     ========================================================================== */
  function renderClients() {
    var body = $("#clientTableBody");
    var empty = $("#clientEmpty");
    var count = $("#clientCount");
    var search = ($("#clientSearch") && $("#clientSearch").value.trim().toLowerCase()) || "";
    if (!body) return;

    var filtered = state.clients.filter(function (client) {
      if (!search) return true;
      var haystack = [
        client.nombre,
        client.whatsapp,
        client.colonia,
        client.ciudad,
        client.estado
      ]
        .join(" ")
        .toLowerCase();
      return haystack.indexOf(search) !== -1;
    });

    body.innerHTML = filtered
      .map(function (client) {
        var displayPhone = formatPhone(client.whatsapp);
        var place = [client.colonia, client.ciudad].filter(Boolean).join(", ");
        return (
          "<tr>" +
          '<td><div class="cell-name"><strong>' +
          escapeHtml(client.nombre) +
          "</strong><span>" +
          escapeHtml(place || "Sin ubicación") +
          "</span></div></td>" +
          '<td class="cell-phone">' +
          escapeHtml(displayPhone) +
          "</td>" +
          "<td>" +
          escapeHtml(client.talla) +
          "</td>" +
          '<td><span class="state-pill" data-state="' +
          escapeHtml(client.estado) +
          '">' +
          escapeHtml(client.estado) +
          "</span></td>" +
          '<td class="cell-amount"><strong>' +
          money(client.gasto) +
          "</strong><span>" +
          escapeHtml(client.compras) +
          " compras</span></td>" +
          '<td><div class="cell-actions">' +
          '<a class="icon-btn icon-btn--wa" href="' +
          escapeHtml(
            waLink(
              "Hola " +
                client.nombre +
                "! Te escribimos de Miranda Bazar. ✨ ¿Te interesa el próximo live?"
            )
          ) +
          '" target="_blank" rel="noopener" aria-label="' +
          escapeHtml("Enviar WhatsApp a " + client.nombre) +
          '">' +
          icon("message") +
          "</a>" +
          '<button class="icon-btn icon-btn--danger" type="button" data-delete-client="' +
          escapeHtml(client.id) +
          '" aria-label="' +
          escapeHtml("Eliminar a " + client.nombre) +
          '">' +
          icon("trash") +
          "</button>" +
          "</div></td></tr>"
        );
      })
      .join("");

    if (count) {
      count.textContent = search
        ? filtered.length + " de " + state.clients.length
        : String(state.clients.length);
    }
    if (empty) empty.hidden = filtered.length > 0;
    refreshStats();
  }

  function addClient(form) {
    var nameInput = $("#clientName");
    var phoneInput = $("#clientPhone");
    var name = nameInput.value.trim();
    var phone = normalizePhone(phoneInput.value);

    if (name.length < 2) {
      nameInput.setCustomValidity("Escribe el nombre del cliente.");
      nameInput.reportValidity();
      nameInput.setCustomValidity("");
      nameInput.focus();
      return;
    }

    if (phone.length !== 10) {
      phoneInput.setCustomValidity("Escribe un WhatsApp de 10 dígitos.");
      phoneInput.reportValidity();
      phoneInput.setCustomValidity("");
      phoneInput.focus();
      return;
    }

    var already = state.clients.some(function (client) {
      return normalizePhone(client.whatsapp) === phone;
    });
    if (already) {
      toast("Ese WhatsApp ya está registrado.", "error");
      phoneInput.focus();
      return;
    }

    var client = {
      id: uid("cliente"),
      nombre: name,
      whatsapp: phone,
      talla: $("#clientSize").value,
      estado: $("#clientStatus").value,
      colonia: $("#clientColony").value.trim(),
      ciudad: $("#clientCity").value.trim() || "Monterrey",
      gasto: Number($("#clientSpend").value) || 0,
      compras: Number($("#clientPurchases").value) || 0,
      notas: $("#clientNotes").value.trim(),
      createdAt: new Date().toISOString()
    };

    state.clients.unshift(client);
    var saved = writeStore(CONFIG.store.clients, state.clients);
    if (!saved) {
      state.clients.shift();
      toast("No se pudo guardar. Revisa el almacenamiento del navegador.", "error");
      return;
    }

    form.reset();
    $("#clientCity").value = "Monterrey";
    renderClients();
    toast("Cliente agregado: " + client.nombre);
    nameInput.focus();
  }

  function deleteClient(id) {
    var client = state.clients.find(function (entry) {
      return entry.id === id;
    });
    if (!client) return;
    if (!window.confirm("¿Eliminar a " + client.nombre + " de tu lista de clientes?")) return;

    var index = state.clients.indexOf(client);
    state.clients.splice(index, 1);
    if (!writeStore(CONFIG.store.clients, state.clients)) {
      state.clients.splice(index, 0, client);
      toast("No se pudo eliminar el cliente.", "error");
      return;
    }
    renderClients();
    toast("Cliente eliminado.");
  }

  /* ==========================================================================
     10. ROPA (INVENTARIO)
     ========================================================================== */
  function renderRopa() {
    var wrap = $("#ropaList");
    var empty = $("#ropaEmpty");
    var count = $("#ropaCount");
    var value = $("#ropaValue");
    var search = ($("#ropaSearch") && $("#ropaSearch").value.trim().toLowerCase()) || "";
    if (!wrap) return;

    var filtered = state.ropa.filter(function (item) {
      if (!search) return true;
      return (
        (item.nombre + " " + item.categoria + " " + item.talla).toLowerCase().indexOf(search) !==
        -1
      );
    });

    wrap.innerHTML = filtered
      .map(function (item) {
        var image = safeImage(item.imagen);
        var media = image
          ? '<img class="ropa-row__img" src="' +
            escapeHtml(image) +
            '" alt="" loading="lazy" decoding="async">'
          : '<div class="ropa-row__img ropa-row__img--placeholder">' +
            icon("image") +
            "</div>";
        return (
          '<article class="ropa-row">' +
          media +
          '<div class="ropa-row__info">' +
          '<p class="ropa-row__name">' +
          escapeHtml(item.nombre) +
          (item.destacada ? icon("star") : "") +
          "</p>" +
          '<p class="ropa-row__meta">' +
          escapeHtml(item.categoria) +
          " · Talla " +
          escapeHtml(item.talla) +
          " · " +
          escapeHtml(item.condicion) +
          "</p>" +
          "</div>" +
          '<span class="ropa-row__price">' +
          money(item.precio) +
          "</span>" +
          '<div class="ropa-row__actions">' +
          '<button class="icon-btn' +
          (item.destacada ? " is-featured" : "") +
          '" type="button" data-feature-ropa="' +
          escapeHtml(item.id) +
          '" aria-pressed="' +
          (item.destacada ? "true" : "false") +
          '" aria-label="' +
          escapeHtml(item.destacada ? "Quitar de destacadas" : "Destacar prenda") +
          '" title="Destacar">' +
          icon("star") +
          "</button>" +
          '<button class="icon-btn icon-btn--danger" type="button" data-delete-ropa="' +
          escapeHtml(item.id) +
          '" aria-label="' +
          escapeHtml("Eliminar " + item.nombre) +
          '">' +
          icon("trash") +
          "</button>" +
          "</div></article>"
        );
      })
      .join("");

    if (count) count.textContent = String(filtered.length);
    if (empty) empty.hidden = filtered.length > 0;

    var total = state.ropa.reduce(function (sum, item) {
      return sum + (Number(item.precio) || 0);
    }, 0);
    if (value) value.textContent = money(total);
    refreshStats();
  }

  async function addRopa(form) {
    var nameInput = $("#ropaName");
    var priceInput = $("#ropaPrice");
    var name = nameInput.value.trim();
    var price = Number(priceInput.value);
    var urlValue = $("#ropaImageUrl").value.trim();

    if (name.length < 2) {
      nameInput.setCustomValidity("Escribe el nombre de la prenda.");
      nameInput.reportValidity();
      nameInput.setCustomValidity("");
      nameInput.focus();
      return;
    }

    if (!price || price <= 0) {
      priceInput.setCustomValidity("Escribe un precio mayor a cero.");
      priceInput.reportValidity();
      priceInput.setCustomValidity("");
      priceInput.focus();
      return;
    }

    if (urlValue && !/^https?:\/\//i.test(urlValue)) {
      toast("La URL de la imagen debe iniciar con http:// o https://", "error");
      $("#ropaImageUrl").focus();
      return;
    }

    var image = urlValue;
    if (state.ropaFile) {
      try {
        image = await compressImage(state.ropaFile);
      } catch (error) {
        toast(error.message || "No pudimos procesar la imagen.", "error");
        return;
      }
    }

    var item = {
      id: uid("ropa"),
      nombre: name,
      categoria: $("#ropaCategory").value,
      talla: $("#ropaSize").value,
      precio: price,
      condicion: $("#ropaCondition").value,
      descripcion: $("#ropaDesc").value.trim(),
      imagen: image,
      destacada: $("#ropaFeatured").checked,
      createdAt: new Date().toISOString()
    };

    state.ropa.unshift(item);
    if (!writeStore(CONFIG.store.ropa, state.ropa)) {
      state.ropa.shift();
      toast(
        "No se pudo guardar la prenda. Si subiste una foto, prueba con una más ligera.",
        "error"
      );
      return;
    }

    resetRopaForm(form);
    renderRopa();
    renderCatalog();
    renderLiveProduct();
    refreshStats();
    toast("Prenda agregada al catálogo: " + item.nombre);
    nameInput.focus();
  }

  function resetRopaForm(form) {
    form.reset();
    $("#ropaCategory").value = "Blusas";
    $("#ropaSize").value = "M";
    $("#ropaCondition").value = "Excelente";
    if (state.ropaFile) state.ropaFile = null;
    var input = $("#ropaImage");
    if (input) input.value = "";
    var preview = $("#ropaPreview");
    if (preview) preview.hidden = true;
    if (state.previewUrl) {
      URL.revokeObjectURL(state.previewUrl);
      state.previewUrl = null;
    }
  }

  function handleRopaFile(file) {
    if (!file) return;
    if (!file.type || file.type.indexOf("image/") !== 0) {
      toast("Selecciona un archivo de imagen (JPG o PNG).", "error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast("La imagen supera los 10 MB.", "error");
      return;
    }
    state.ropaFile = file;
    var preview = $("#ropaPreview");
    var img = $("#ropaPreviewImg");
    if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
    state.previewUrl = URL.createObjectURL(file);
    img.src = state.previewUrl;
    preview.hidden = false;
  }

  function removeRopaFile() {
    state.ropaFile = null;
    var input = $("#ropaImage");
    if (input) input.value = "";
    if (state.previewUrl) {
      URL.revokeObjectURL(state.previewUrl);
      state.previewUrl = null;
    }
    var preview = $("#ropaPreview");
    if (preview) preview.hidden = true;
  }

  function deleteRopa(id) {
    var item = state.ropa.find(function (entry) {
      return entry.id === id;
    });
    if (!item) return;
    if (!window.confirm("¿Eliminar la prenda " + item.nombre + " del catálogo?")) return;

    var index = state.ropa.indexOf(item);
    state.ropa.splice(index, 1);
    if (!writeStore(CONFIG.store.ropa, state.ropa)) {
      state.ropa.splice(index, 0, item);
      toast("No se pudo eliminar la prenda.", "error");
      return;
    }
    renderRopa();
    renderCatalog();
    renderLiveProduct();
    refreshStats();
    toast("Prenda eliminada.");
  }

  function toggleFeatured(id) {
    var item = state.ropa.find(function (entry) {
      return entry.id === id;
    });
    if (!item) return;
    item.destacada = !item.destacada;
    if (!writeStore(CONFIG.store.ropa, state.ropa)) {
      item.destacada = !item.destacada;
      toast("No se pudo actualizar la prenda.", "error");
      return;
    }
    renderRopa();
    renderCatalog();
    renderLiveProduct();
    toast(item.destacada ? "Prenda destacada en portada y live." : "Prenda quitada de destacadas.");
  }

  /* ==========================================================================
     11. EXPORTACIONES Y DIFUSIÓN
     ========================================================================== */
  function csvCell(value) {
    var text = String(value == null ? "" : value);
    if (/[",\r\n]/.test(text)) return '"' + text.replace(/"/g, '""') + '"';
    return text;
  }

  function exportClients() {
    if (!state.clients.length) {
      toast("No hay clientes para exportar.", "error");
      return;
    }
    var rows = [
      ["Nombre", "WhatsApp", "Talla", "Estado", "Colonia", "Ciudad", "Gasto", "Compras", "Notas"]
    ];
    state.clients.forEach(function (client) {
      rows.push([
        client.nombre,
        formatPhone(client.whatsapp),
        client.talla,
        client.estado,
        client.colonia,
        client.ciudad,
        client.gasto,
        client.compras,
        client.notas
      ]);
    });
    var csv =
      "\uFEFF" +
      rows
        .map(function (row) {
          return row.map(csvCell).join(",");
        })
        .join("\r\n");
    downloadBlob(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
      "clientes_miranda_" + dateStamp() + ".csv"
    );
    toast("CSV exportado con " + state.clients.length + " clientes.");
  }

  function exportRopa() {
    if (!state.ropa.length) {
      toast("No hay prendas para exportar.", "error");
      return;
    }
    downloadBlob(
      new Blob([JSON.stringify(state.ropa, null, 2)], { type: "application/json" }),
      "ropa_miranda_" + dateStamp() + ".json"
    );
    toast("Inventario exportado en JSON.");
  }

  function copyBroadcast() {
    var url = liveShareUrl();
    var message =
      "¡Hola! ✨ Hoy tenemos live en Miranda Bazar: piezas nuevas, precios especiales y apartado con $100. Te esperamos: " +
      url;
    copyText(message).then(function (ok) {
      toast(
        ok ? "Mensaje del live copiado. Pégalo en tu grupo de WhatsApp." : "No se pudo copiar el mensaje.",
        ok ? undefined : "error"
      );
    });
  }

  function refreshStats() {
    var totalClients = state.clients.length;
    var vip = state.clients.filter(function (client) {
      return client.estado === "VIP";
    }).length;
    var spend = state.clients.reduce(function (sum, client) {
      return sum + (Number(client.gasto) || 0);
    }, 0);
    var inventory = state.ropa.reduce(function (sum, item) {
      return sum + (Number(item.precio) || 0);
    }, 0);

    var map = {
      statClients: totalClients,
      statVip: vip,
      statSpend: money(spend),
      statRopa: money(inventory),
      tabClientCount: totalClients,
      tabRopaCount: state.ropa.length
    };

    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = String(map[id]);
    });
  }

  /* ==========================================================================
     12. INSTALACIÓN PWA
     ========================================================================== */
  function isStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  function setupInstall() {
    var available = $("#installAvailable");
    var installed = $("#installInstalled");
    var note = $("#installNote");
    var button = $("#installBtn");

    if (isStandalone()) {
      if (available) available.hidden = true;
      if (installed) installed.hidden = false;
    }

    if (location.protocol === "file:" && note) {
      note.textContent =
        "Estás abriendo el archivo directamente. Para instalar la app, publica esta carpeta en un hosting HTTPS o ábrela desde localhost.";
    }

    window.addEventListener("beforeinstallprompt", function (event) {
      event.preventDefault();
      state.deferredPrompt = event;
      if (available) available.hidden = false;
      if (installed) installed.hidden = true;
    });

    window.addEventListener("appinstalled", function () {
      state.deferredPrompt = null;
      if (available) available.hidden = true;
      if (installed) installed.hidden = false;
      toast("¡App instalada! Ya puedes abrirla desde tu pantalla de inicio.");
    });

    if (button) {
      button.addEventListener("click", async function () {
        if (!state.deferredPrompt) {
          toast("Usa el menú del navegador para instalar la app.", "error");
          return;
        }
        state.deferredPrompt.prompt();
        try {
          var choice = await state.deferredPrompt.userChoice;
          if (choice && choice.outcome === "accepted") {
            toast("Instalando la app...");
          }
        } catch (err) {
          /* el usuario canceló */
        }
        state.deferredPrompt = null;
        if (available) available.hidden = true;
      });
    }

    if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("./sw.js").catch(function () {
          /* sin service worker: la web sigue funcionando */
        });
      });
    }
  }

  /* ==========================================================================
     13. MODALES, NAVEGACIÓN Y UI
     ========================================================================== */
  function syncBodyLock() {
    var open = document.querySelector(".modal.is-open, .admin.is-open");
    document.body.classList.toggle("is-locked", Boolean(open));
  }

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    state.lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    syncBodyLock();

    if (id === "loginModal") {
      var form = $("#loginForm");
      if (form) form.reset();
      var error = $("#loginError");
      if (error) error.hidden = true;
      var password = $("#adminPassword");
      if (password) password.setAttribute("aria-invalid", "false");
    }

    setTimeout(function () {
      var target =
        modal.querySelector("[data-autofocus]") ||
        modal.querySelector(
          "input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href]"
        );
      if (target) target.focus();
    }, 80);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    syncBodyLock();
    if (state.lastFocus && typeof state.lastFocus.focus === "function") {
      state.lastFocus.focus();
      state.lastFocus = null;
    }
  }

  function setupModals() {
    $$("[data-open]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openModal(trigger.dataset.open);
      });
    });

    $$("[data-close]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        closeModal(trigger.closest(".modal"));
      });
    });

    $$("[data-action='open-admin']").forEach(function (trigger) {
      trigger.addEventListener("click", requestAdmin);
    });

    var loginForm = $("#loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = $("#adminPassword");
        var error = $("#loginError");
        var value = input.value;

        if (!value) {
          input.focus();
          return;
        }

        if (checkAdminPassword(value)) {
          setAdminSession(true);
          error.hidden = true;
          input.setAttribute("aria-invalid", "false");
          input.value = "";
          closeModal($("#loginModal"));
          showAdmin();
          toast("Bienvenida al panel privado.");
        } else {
          error.hidden = false;
          input.setAttribute("aria-invalid", "true");
          loginForm.classList.remove("is-error");
          void loginForm.offsetWidth;
          loginForm.classList.add("is-error");
          input.select();
          toast("Contraseña incorrecta.", "error");
        }
      });
    }

    var passwordInput = $("#adminPassword");
    if (passwordInput) {
      passwordInput.addEventListener("input", function () {
        passwordInput.setAttribute("aria-invalid", "false");
        var error = $("#loginError");
        if (error) error.hidden = true;
      });
    }

    var toggle = $("#togglePassword");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var input = $("#adminPassword");
        var use = toggle.querySelector("use");
        var isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        toggle.setAttribute("aria-label", isPassword ? "Ocultar contraseña" : "Mostrar contraseña");
        use.setAttribute("href", isPassword ? "#i-eye-off" : "#i-eye");
        input.focus();
      });
    }

    $$("[data-action='close-admin']").forEach(function (button) {
      button.addEventListener("click", closeAdmin);
    });
    $$("[data-action='logout']").forEach(function (button) {
      button.addEventListener("click", logoutAdmin);
    });

    var adminClose = $("#adminClose");
    if (adminClose) adminClose.addEventListener("click", closeAdmin);
  }

  function setupAdmin() {
    $$(".admin-tab").forEach(function (button) {
      button.addEventListener("click", function () {
        setAdminTab(button.dataset.tab);
      });
    });

    var clientForm = $("#clientForm");
    if (clientForm) {
      clientForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addClient(clientForm);
      });
    }

    var ropaForm = $("#ropaForm");
    if (ropaForm) {
      ropaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addRopa(ropaForm);
      });
    }

    var phoneInput = $("#clientPhone");
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        phoneInput.value = phoneInput.value.replace(/[^\d\s+]/g, "");
      });
    }

    var clientSearch = $("#clientSearch");
    if (clientSearch) clientSearch.addEventListener("input", renderClients);

    var ropaSearch = $("#ropaSearch");
    if (ropaSearch) ropaSearch.addEventListener("input", renderRopa);

    var clientBody = $("#clientTableBody");
    if (clientBody) {
      clientBody.addEventListener("click", function (event) {
        var del = event.target.closest("[data-delete-client]");
        if (del) deleteClient(del.dataset.deleteClient);
      });
    }

    var ropaList = $("#ropaList");
    if (ropaList) {
      ropaList.addEventListener("click", function (event) {
        var del = event.target.closest("[data-delete-ropa]");
        if (del) deleteRopa(del.dataset.deleteRopa);
        var feature = event.target.closest("[data-feature-ropa]");
        if (feature) toggleFeatured(feature.dataset.featureRopa);
      });
    }

    var fileInput = $("#ropaImage");
    if (fileInput) {
      fileInput.addEventListener("change", function () {
        handleRopaFile(fileInput.files && fileInput.files[0]);
      });
    }

    var removeImage = $("#ropaRemoveImage");
    if (removeImage) removeImage.addEventListener("click", removeRopaFile);

    var drop = $(".upload__drop");
    if (drop) {
      ["dragenter", "dragover"].forEach(function (eventName) {
        drop.addEventListener(eventName, function (event) {
          event.preventDefault();
          drop.classList.add("is-drag");
        });
      });
      ["dragleave", "drop"].forEach(function (eventName) {
        drop.addEventListener(eventName, function (event) {
          event.preventDefault();
          drop.classList.remove("is-drag");
        });
      });
      drop.addEventListener("drop", function (event) {
        if (event.dataTransfer && event.dataTransfer.files.length) {
          handleRopaFile(event.dataTransfer.files[0]);
        }
      });
    }

    var exportClientsBtn = $("#exportClients");
    if (exportClientsBtn) exportClientsBtn.addEventListener("click", exportClients);
    var exportRopaBtn = $("#exportRopa");
    if (exportRopaBtn) exportRopaBtn.addEventListener("click", exportRopa);
    var broadcast = $("#copyBroadcast");
    if (broadcast) broadcast.addEventListener("click", copyBroadcast);

    refreshStats();
  }

  function setupCatalog() {
    renderFilters();
    renderCatalog();
    renderLiveProduct();

    var filters = $("#catalogFilters");
    if (filters) {
      filters.addEventListener("click", function (event) {
        var chip = event.target.closest("[data-filter]");
        if (!chip) return;
        state.filter = chip.dataset.filter;
        renderFilters();
        renderCatalog();
      });
    }

    var grid = $("#productGrid");
    if (grid) {
      grid.addEventListener("click", function (event) {
        var trigger = event.target.closest("[data-product-id]");
        if (!trigger) return;
        openProduct(trigger.dataset.productId);
      });
    }

    var reset = $("[data-filter-reset]");
    if (reset) {
      reset.addEventListener("click", function () {
        state.filter = "Todas";
        renderFilters();
        renderCatalog();
      });
    }
  }

  function setupLive() {
    $$("[data-action='start-live']").forEach(function (button) {
      button.addEventListener("click", startLive);
    });
    $$("[data-action='stop-live']").forEach(function (button) {
      button.addEventListener("click", stopLive);
    });
    $$("[data-action='switch-camera']").forEach(function (button) {
      button.addEventListener("click", switchCamera);
    });
    $$("[data-action='share-live']").forEach(function (button) {
      button.addEventListener("click", shareLive);
    });
    $$("[data-action='next-product']").forEach(function (button) {
      button.addEventListener("click", nextLiveProduct);
    });
    $$("[data-action='clear-embed']").forEach(function (button) {
      button.addEventListener("click", function () {
        clearEmbed(false);
        var input = $("#liveUrl");
        if (input) input.value = "";
        var note = $("#liveEmbedNote");
        if (note) {
          note.textContent =
            "Pega el enlace de tu live de YouTube o Facebook. Se mostrará en la sección En vivo.";
        }
      });
    });
    $$("[data-action='copy-live-link']").forEach(function (button) {
      button.addEventListener("click", copyLiveLink);
    });

    var embedForm = $("#liveEmbedForm");
    if (embedForm) {
      embedForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = $("#liveUrl");
        showEmbed(input.value.trim());
      });
    }

    var chatForm = $("#chatForm");
    if (chatForm) {
      chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = $("#chatInput");
        var text = input.value.trim();
        if (!text) return;
        pushChatMessage({ name: "Tú", text: text, type: "self" });
        input.value = "";
      });
    }

    renderChat();
    restoreLiveEmbed();
  }

  function setupNavigation() {
    var header = $("#siteHeader");
    var toggle = $("#navToggle");
    var nav = $("#primaryNav");

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      });
    }

    if (nav) {
      nav.addEventListener("click", function (event) {
        if (!event.target.closest("a")) return;
        header.classList.remove("is-open");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Abrir menú");
        }
      });
    }

    document.addEventListener("click", function (event) {
      if (!header || !header.classList.contains("is-open")) return;
      if (header.contains(event.target)) return;
      header.classList.remove("is-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      }
    });

    window.addEventListener(
      "scroll",
      function () {
        if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
      },
      { passive: true }
    );

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        var admin = $("#adminPanel");
        if (admin && admin.classList.contains("is-open")) {
          closeAdmin();
          return;
        }
        var openModals = $$(".modal.is-open");
        if (openModals.length) {
          closeModal(openModals[openModals.length - 1]);
          return;
        }
        if (window.innerWidth <= 960 && header && header.classList.contains("is-open")) {
          header.classList.remove("is-open");
          if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Abrir menú");
            toggle.focus();
          }
        }
      }

      if (event.key !== "Tab") return;
      var container =
        ($(".admin.is-open .admin__shell") ||
          ($$(".modal.is-open").length
            ? $$(".modal.is-open")[$$(".modal.is-open").length - 1].querySelector(
                ".modal__dialog"
              )
            : null));
      if (!container) return;

      var focusables = $$(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        container
      ).filter(function (el) {
        return el.offsetParent !== null;
      });
      if (!focusables.length) return;

      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function setupReveal() {
    var elements = $$("[data-reveal]");
    if (!elements.length) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    elements.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function setupDates() {
    var label = nextLiveLabel();
    $$("[data-next-live]").forEach(function (el) {
      el.textContent = label;
    });
    var year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ==========================================================================
     14. INICIO
     ========================================================================== */
  function init() {
    loadData();
    setupDates();
    setupInstall();
    setupModals();
    setupAdmin();
    setupCatalog();
    setupLive();
    setupNavigation();
    setupReveal();

    if (isAdminAuthed()) {
      // La sesión se mantiene, pero el panel no se abre solo.
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
