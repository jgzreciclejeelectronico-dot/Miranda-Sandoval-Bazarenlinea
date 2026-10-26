# Miranda Sandoval · Bazar en Línea

Sitio de bazar con catálogo, sección **EN VIVO**, panel privado de clientes (CRM), inventario de ropa y modo de aplicación instalable (PWA).

## 1. Abrir el proyecto

Para revisarlo en tu computadora puedes abrir `index.html` con doble clic.  
Para probar la instalación como app, la cámara y el modo sin conexión, necesitas abrirlo desde un servidor local o desde una web con **HTTPS**:

```bash
# Opción rápida con Python (si lo tienes instalado)
python -m http.server 4173
```

Después entra a `http://localhost:4173`.

> La cámara del live y la instalación de la app **no funcionan** abriendo el archivo con `file://` en la mayoría de navegadores. Es normal.

## 2. Publicarlo en internet

El proyecto es estático: no necesita base de datos ni servidor especial.

1. Sube la carpeta completa `miranda-bazar` a un hosting con HTTPS:
   - Netlify Drop (arrastrar la carpeta): https://app.netlify.com/drop
   - Vercel, Cloudflare Pages o GitHub Pages.
   - Cualquier hosting normal con certificado SSL.
2. Verifica que abra `https://tu-dominio.com/` y que `https://tu-dominio.com/manifest.webmanifest` sea accesible.
3. La primera visita guarda la app en caché; a partir de ahí puede abrir sin conexión.

## 3. Instalarla como aplicación

### Android
1. Abre la web publicada en **Chrome**.
2. Toca el botón **Descargar app** del sitio o el menú ⋮ de Chrome → **Instalar aplicación / Agregar a pantalla principal**.
3. Se abre como app, sin barra del navegador.

### iPhone / iPad
1. Abre la web en **Safari**.
2. Toca **Compartir** → **Agregar a pantalla de inicio** → **Agregar**.
3. iOS no muestra el aviso automático de instalación; este paso es manual.

### Windows / Mac
1. Abre la web en **Chrome** o **Edge**.
2. Usa el icono de instalar de la barra de direcciones o el botón **Descargar app**.
3. Queda como aplicación de escritorio con acceso directo.

## 4. Panel privado

- Entra desde el enlace **Panel privado** del pie de página.
- Contraseña inicial: **`miranda2627`**
- Desde ahí puedes:
  - Agregar, buscar y eliminar clientes.
  - Agregar ropa con foto (archivo o URL), precio, talla, condición y destacado.
  - Exportar clientes a **CSV** y ropa a **JSON**.
  - Copiar un mensaje para difundir el live por WhatsApp.
  - Pestaña **En vivo**: iniciar la cámara de vista previa, conectar tu transmisión de **YouTube o Facebook** y copiar el enlace para clientas.
- La sesión se mantiene al recargar mientras no cierres el navegador; **Cerrar sesión** la elimina.

### Cambiar la contraseña
La contraseña se compara en el navegador. En `js/app.js`, dentro de `CONFIG`, cambia `adminKey` por el resultado de:

```js
btoa("TU_NUEVA_CONTRASEÑA")
```

Puedes ejecutarlo en la consola del navegador (F12) y pegar el resultado. Después sube el archivo actualizado.

> **Importante:** este candado es una barrera de uso, no autenticación de servidor. Cualquier persona con conocimientos técnicos podría leer el código. No guardes datos sensibles, tarjetas ni información fiscal en el panel. Para seguridad real se necesita un backend con usuarios y contraseñas.

### Cambiar el WhatsApp
En `js/app.js`, en `CONFIG`:

```js
phone: "528123752627",
phoneDisplay: "+52 81 2375 2627",
```

Cambia ambos valores y vuelve a publicar.

## 5. Cómo funcionan los datos

- Clientes, ropa, chat y sesión se guardan en **este dispositivo y navegador** (`localStorage` / `sessionStorage`).
- No hay sincronización entre teléfono, computadora y otras personas.
- Si borras los datos del sitio o usas otro navegador, la información local desaparece.
- Usa **CSV / JSON** para respaldar tus registros.
- Para un CRM compartido entre dispositivos hace falta conectar un backend (Firebase, Supabase o similar).

## 6. Sobre el live

La página pública **solo reproduce** el live: no tiene botones para iniciar cámara ni para conectar transmisiones. Todo se controla desde **Panel privado → En vivo**.

- **Iniciar EN VIVO**: enciende la cámara y muestra una vista previa **solo en tu dispositivo**. No transmite video a otras personas.
- **Abrir YouTube Studio / Facebook Live**: accesos directos para iniciar ahí tu transmisión con cámara o desde el celular.
- **Conectar mi transmisión**: pega el enlace de un live de **YouTube** o **Facebook** (desde el navegador o la app). La transmisión aparece integrada en el panel y en la página pública.
- **Copiar enlace para clientas**: genera una dirección con la transmisión incluida. Compártela por WhatsApp; quien la abra verá el live en la sección **En vivo**.
- Al conectar la transmisión aparecen botones para **compartir en WhatsApp y Facebook**, tanto en el panel como en la página pública.
- **Quitar**: desconecta la transmisión y la página pública vuelve al mensaje de “próximo live”.
- El chat del sitio se guarda localmente, no es un chat multiusuario.
- El live debe ser **público** en YouTube o Facebook para que el reproductor integrado lo muestre.
- El navegador **no puede transmitir la cámara por sí solo** a la web, la app y las redes: hace falta un servicio de video. La vía gratuita y estable es YouTube o Facebook. Para transmisión directa desde la web se necesita un servicio como LiveKit, Agora o Mux (cuenta y credenciales).

## 7. Llevarla a las tiendas de aplicaciones

El proyecto ya es una **PWA instalable**. Para publicar en tiendas hay dos caminos:

### Android · Google Play
1. Crea una cuenta de desarrollador de Google Play (pago único de 25 USD).
2. Publica primero la web con HTTPS.
3. Usa **PWABuilder** (https://www.pwabuilder.com) con la URL publicada para generar un paquete **AAB/APK** firmado.
4. Prueba el paquete en un dispositivo.
5. Súbelo a Google Play Console, completa la ficha (icono, capturas, política de privacidad) y envía a revisión.

### iOS · App Store
1. Necesitas una cuenta de **Apple Developer** (99 USD al año) y una **Mac** con Xcode.
2. Opción recomendada: **PWABuilder** para generar un proyecto iOS, o **Capacitor** para envolver la web.
3. Firma el proyecto con tu cuenta, pruébalo en TestFlight y envíalo a revisión de Apple.

### Computadora
- **Instalación directa:** los usuarios pueden instalarla desde Chrome/Edge como app de escritorio; es la opción más rápida y gratuita.
- **Microsoft Store:** se puede empaquetar la PWA con PWABuilder para la Store de Windows.
- **Instalador .exe / .dmg:** requiere envolverla con **Electron** o **Tauri** y firmar el instalador.

> No es posible crear las cuentas, firmar ni enviar a revisión desde este proyecto. Eso lo debe hacer la persona propietaria de las cuentas de Google/Apple. El código y la PWA ya están listos para ese proceso.

## 8. Estructura

```
miranda-bazar/
├─ index.html                 Página completa
├─ css/styles.css             Estilos organizados por secciones
├─ js/app.js                  Catálogo, live, CRM, inventario, PWA
├─ manifest.webmanifest       Datos de instalación
├─ sw.js                      Modo sin conexión
├─ assets/
│  ├─ icon-*.png              Iconos de app
│  ├─ hero-boutique.jpg       Imagen principal
│  ├─ productos/              Fotos del catálogo
│  └─ fonts/                  Tipografías locales
└─ README.md
```

## 9. Notas de mantenimiento

- Al cambiar CSS o JS, sube el número de `CACHE_NAME` en `sw.js` (`miranda-bazar-v2` → `v3`) para que los dispositivos instalados reciban la actualización.
- Si un dispositivo conserva una versión vieja: borra los datos del sitio o desinstala y vuelve a instalar la app.
- Las fotos subidas desde el panel se comprimen en el navegador (máx. 900 px, JPEG) para no llenar el almacenamiento local.
