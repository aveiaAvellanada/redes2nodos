# Nodo Travesías — Documentación del Proyecto

**Proyecto:** redes2nodos  
**Versión:** 1.0.0  
**Fecha:** Abril 2026  
**Descripción:** Portal web de un nodo de red comunitaria para la Amazonía colombiana.

---

## 1. ¿Qué es este proyecto?

**Nodo Travesías** es la interfaz web del portal captivo de una red mesh comunitaria rural ubicada en la región amazónica de Colombia (Lat. 01° 36′ N, Long. 75° 36′ O, Alt. 240 m). Es la página de bienvenida que los vecinos ven al conectarse a la red Wi-Fi local `nodo-travesias`, sin necesidad de internet ni contraseña.

El proyecto es un **sitio estático** (sin build step), construido con React 18 cargado desde CDN y Babel en el navegador. Funciona offline-first: todos los módulos del nodo están diseñados para funcionar sin conexión a internet.

### Propósito
- Dar acceso visual a los 11 servicios comunitarios que aloja el nodo
- Informar el estado de la red en tiempo real (vecinos conectados, señal, sincronización)
- Permitir alertas de emergencia en el territorio
- Servir como directorio de recursos para las veredas conectadas

---

## 2. Stack técnico

| Capa | Tecnología |
|---|---|
| UI | React 18.3.1 (UMD desde unpkg) |
| Transpilación | Babel Standalone 7.26.2 (en el navegador) |
| Estilos | CSS puro (Vanilla CSS con custom properties OKLCH) |
| Tipografía | Google Fonts: Fraunces, Inter, JetBrains Mono |
| Servidor dev | `npx serve .` |
| Despliegue | Vercel (sitio estático) |
| Mínimo Node.js | >=18.0.0 |

**Sin bundler.** Los archivos `.jsx` se interpretan en tiempo de ejecución por Babel Standalone vía `<script type="text/babel">`.

---

## 3. Estructura de archivos

```
redes2nodos/
├── index.html              # Punto de entrada principal
├── package.json            # Metadatos y script de arranque
├── vercel.json             # Config de despliegue en Vercel
├── .gitignore
│
├── public/
│   └── nodo-travesias.html # Espejo del index.html para rutas captivas
│
├── src/
│   ├── app.jsx             # Componente raíz + temas + lógica principal
│   ├── data.jsx            # Catálogo de servicios y datos del ticker
│   ├── glyphs.jsx          # Biblioteca de íconos SVG geométricos
│   ├── detail.jsx          # Panel lateral de detalle de servicio
│   ├── tweaks-panel.jsx    # Sistema de configuración en vivo (Tweaks)
│   └── styles.css          # Estilos globales y sistema de diseño
│
├── design/
│   ├── assets/             # Recursos de diseño
│   ├── exports/            # Exportaciones de diseño
│   └── mockups/            # Mockups visuales
│
└── docs/
    └── documentacion.md    # Este archivo
```

---

## 4. Módulos del código fuente

### 4.1 `index.html` — Punto de entrada

Archivo HTML principal. Carga en orden:
1. Google Fonts (Fraunces, Inter, JetBrains Mono)
2. `src/styles.css`
3. React 18 + ReactDOM (UMD)
4. Babel Standalone
5. Los módulos JSX en orden de dependencia

`public/nodo-travesias.html` es un espejo idéntico con rutas relativas ajustadas (`../src/` en lugar de `./src/`).

---

### 4.2 `src/app.jsx` — Aplicación principal

Archivo central de la aplicación. Contiene:

#### Constantes globales
- **`TWEAK_DEFAULTS`** — Valores por defecto para las opciones de personalización:
  - `theme`: `"earthen"` — paleta de colores activa
  - `density`: `"spacious"` — densidad de las tarjetas
  - `showTicker`: `true` — mostrar/ocultar el ticker en vivo
  - `nodeName`: `"TRAVESÍAS"` — nombre del nodo

- **`THEMES`** — Objeto con 3 paletas de colores usando valores `oklch()`:
  - `earthen` — crema + bosque (tema claro por defecto)
  - `kraft` — papel campesino (tema cálido)
  - `tinta` — modo oscuro (fondo verde oscuro)

- **`THEME_ORDER`** — Array `['earthen', 'kraft', 'tinta']` para el ciclo de temas

#### Función `applyTheme(themeKey)`
Aplica las CSS custom properties del tema seleccionado al elemento `<html>`.

#### Sub-componentes

| Componente | Descripción |
|---|---|
| `ThemeSwitcher` | Botón flotante para ciclar entre los 3 temas. Muestra swatches de color y el nombre del tema activo. |
| `Ticker` | Banda de alertas animada ("EN VIVO") con los ítems de `TICKER` duplicados para scroll infinito. |
| `StatusStrip` | Barra de estado superior con: nombre del nodo, vecinos conectados, señal, hora local (actualizada cada 30s), última sincronización. |
| `Masthead` | Cabecera editorial con logo SVG (nodo de red), nombre del nodo, subtítulo y coordenadas geográficas. |
| `ServiceCard` | Tarjeta interactiva de cada servicio. Muestra: ícono, categoría, nombre, tagline, tamaño, y chips de estado (OFFLINE / EN VIVO). Soporta modo spacious y compact. |
| `AlertsBanner` | Banner destacado con la alerta más urgente del módulo Alertas. |
| `Footer` | Pie de página con instrucciones de conexión, infraestructura del nodo, información de mantenimiento y licencia. |
| `TweaksUI` | Instancia del panel de configuración con los controles específicos del proyecto. |

#### Componente raíz `App`
- Gestiona el estado global con `useTweaks(TWEAK_DEFAULTS)`
- Controla el servicio activo (`activeService`) para el panel de detalle
- Función `cycleTheme()` para rotar la paleta
- Bloquea el scroll del body cuando hay un panel de detalle abierto

---

### 4.3 `src/data.jsx` — Catálogo de datos

Define y exporta a `window` dos constantes:

#### `SERVICES` — 11 servicios del nodo

Cada servicio tiene la forma:
```js
{
  id: string,          // identificador único
  name: string,        // nombre visible
  tagline: string,     // descripción corta
  desc: string,        // descripción larga
  glyph: string,       // nombre del ícono en glyphs.jsx
  category: string,    // categoría: Organización, Comunicación, Campo...
  size: string,        // tamaño en disco (ej. "84 KB")
  offline: boolean,    // funciona sin internet
  activity: number,    // usos en los últimos 7 días
  live?: boolean,      // tiene datos en tiempo real
  highlights: [        // lista de 3 ítems recientes
    { label, when, by }
  ]
}
```

**Servicios disponibles:**

| ID | Nombre | Categoría | Offline | Tamaño |
|---|---|---|---|---|
| `agenda` | Agenda | Organización | ✓ | 84 KB |
| `telefonia` | Telefonía | Comunicación | ✓ | 1.2 MB |
| `caseta` | Caseta | Organización | ✓ | 220 KB |
| `agrolink` | Agrolink | Campo | ✓ | 3.4 MB |
| `rapicampo` | Rapi Campo | Apoyo | ✓ | 140 KB |
| `alertas` | Alertas | Seguridad | ✓ | 60 KB |
| `trueque` | Trueque | Economía | ✓ | 180 KB |
| `kiwix` | Kiwix | Conocimiento | ✓ | 2.1 GB |
| `primaux` | Primaux | Salud | ✓ | 95 KB |
| `medicina` | Medicina | Salud | ✓ | 410 KB |
| `ecomerce` | Mercado | Economía | ✗ | 260 KB |

#### `TICKER` — 6 ítems del ticker en vivo
Alertas y estadísticas simuladas que se desplazan en la banda superior.

---

### 4.4 `src/glyphs.jsx` — Íconos SVG

Biblioteca de íconos geométricos en formato SVG. Todos renderizan en una caja de 48×48 px.

**Componente principal:** `Glyph({ name, color, accent, size })`

**Íconos disponibles:**

| Nombre | Usado en servicio |
|---|---|
| `calendar` | Agenda |
| `phone` | Telefonía |
| `house` | Caseta |
| `sprout` | Agrolink |
| `hands` | Rapi Campo |
| `bell` | Alertas |
| `swap` | Trueque |
| `book` | Kiwix |
| `cross` | Primaux |
| `leaf` | Medicina |
| `bag` | Mercado |

El componente interno `G` provee el contenedor SVG base. Cada ícono acepta `color` (trazo principal) y `accent` (color de acento, por defecto igual al color principal).

---

### 4.5 `src/detail.jsx` — Panel de detalle

Panel lateral deslizante que se muestra al hacer clic en una tarjeta de servicio.

**Componente:** `ServiceDetail({ service, onClose })`

- Retorna `null` si no hay servicio activo
- Muestra: ícono grande (72px), categoría, nombre, tagline, descripción
- **Stats:** tamaño, disponibilidad offline, actividad 7 días, última sincronización
- **Highlights:** lista de los 3 ítems más recientes del servicio
- **Acciones:** botones "Abrir [servicio]", "Guardar offline", "Compartir con vecino"
- El fondo oscuro (scrim) cierra el panel al hacer clic

---

### 4.6 `src/tweaks-panel.jsx` — Sistema de configuración

Panel flotante de personalización en tiempo real. Diseñado para ser reutilizable en otros proyectos.

#### Hook `useTweaks(defaults)`
- Mantiene el estado de todas las opciones
- `setTweak(key, value)` actualiza un valor y lo sincroniza con el host vía `postMessage` (`__edit_mode_set_keys`)
- Permite que un host externo reescriba el bloque `EDITMODE` en disco

#### Componente `TweaksPanel`
- Panel flotante con glass morphism
- Arrastrable (drag and drop) — se mantiene dentro del viewport
- Se abre/cierra vía mensajes `postMessage`:
  - `__activate_edit_mode` → abre
  - `__deactivate_edit_mode` → cierra
- Anuncia disponibilidad con `__edit_mode_available`
- El botón cerrar envía `__edit_mode_dismissed`

#### Controles disponibles

| Componente | Tipo | Descripción |
|---|---|---|
| `TweakSection` | Layout | Encabezado de sección |
| `TweakRow` | Layout | Fila con etiqueta (inline u horizontal) |
| `TweakSlider` | Control | Slider numérico con rango y unidad |
| `TweakToggle` | Control | Interruptor on/off |
| `TweakRadio` | Control | Selector segmentado (drag habilitado) |
| `TweakSelect` | Control | Dropdown `<select>` |
| `TweakText` | Control | Campo de texto libre |
| `TweakNumber` | Control | Campo numérico con scrubbing horizontal |
| `TweakColor` | Control | Selector de color nativo |
| `TweakButton` | Control | Botón de acción (primario o secundario) |

---

### 4.7 `src/styles.css` — Sistema de diseño

Hoja de estilos global con ~22 KB. Define:

#### Custom Properties (variables CSS)
Todas las variables de color usan el espacio `oklch()` para consistencia perceptual:
- `--bg`, `--paper`, `--ink`, `--ink-soft`, `--ink-faint` — fondos y tipografía
- `--line` — bordes y separadores
- `--forest`, `--forest-deep` — verde principal y profundo
- `--terracotta` — acento terracota
- `--olive` — acento oliva
- `--alert` — color de alerta/urgencia
- `--card` — fondo de tarjetas

#### Familias tipográficas
- `Fraunces` — serif de display para títulos y logotipo
- `Inter` — sans-serif para cuerpo de texto
- `JetBrains Mono` — monoespaciada para etiquetas, datos técnicos y chips

#### Componentes estilizados principales
- `.app` — contenedor raíz con variables aplicadas
- `.status-strip` — barra de estado superior
- `.ticker`, `.ticker-track`, `.ticker-inner` — banda de noticias animada
- `.masthead` — cabecera editorial
- `.card`, `.card-big`, `.card-compact` — tarjetas de servicio
- `.grid`, `.grid-spacious`, `.grid-compact` — grillas responsive
- `.alerts-banner` — banner de alertas
- `.detail-scrim`, `.detail-panel` — overlay y panel de detalle
- `.theme-switcher` — botón de cambio de tema
- `.footer` — pie de página en columnas
- `.chip`, `.chip-offline`, `.chip-live` — etiquetas de estado
- `.dot`, `.dot-on`, `.pulse`, `.pulse-big` — indicadores animados

---

## 5. Paletas de colores

### Earthen (por defecto — claro)
Tonos crema, bosque verde y terracota. Fondo: `oklch(96% 0.015 85)`.

### Kraft (cálido — claro)
Tonos papel de estraza y tierra. Fondo: `oklch(92% 0.035 75)`.

### Tinta (oscuro)
Fondo verde profundo con texto claro. Fondo: `oklch(18% 0.015 140)`.

---

## 6. Flujo de la aplicación

```
Usuario conecta al Wi-Fi "nodo-travesias"
    ↓
Navegador abre index.html (captive portal)
    ↓
React monta <App>
    ↓
applyTheme() aplica la paleta activa al <html>
    ↓
Render: StatusStrip → Ticker → Masthead → Welcome → AlertsBanner → Grid de tarjetas → Footer
    ↓
Usuario hace clic en una tarjeta
    ↓
setActiveService(service) → monta <ServiceDetail> con slide-in
    ↓
Usuario cierra el panel → setActiveService(null)
```

---

## 7. Configuración y despliegue

### Arranque local
```bash
npm start
# equivale a: npx serve .
# Disponible en http://localhost:3000
```

### Despliegue en Vercel
`vercel.json` configura:
- `cleanUrls: true` — elimina extensiones `.html` de las URLs
- `trailingSlash: false` — sin barra al final
- Header `Content-Type: application/javascript` para archivos `.jsx`

---

## 8. Infraestructura del nodo (contexto)

Según la información embebida en la interfaz, el nodo físico consta de:
- 1 antena direccional 5 GHz
- 2 puntos de acceso 2.4 GHz
- 1 servidor reciclado con 64 GB
- Panel solar 80 W + 1 batería
- Capacidad: ~43 vecinos simultáneos
- Cobertura: 7 veredas

**Gobernanza:** La red la mantiene la *Junta del Nodo*, elegida anualmente en asamblea comunitaria.

**Licencia:** Contenidos bajo CC BY-SA. Código abierto y libre para ser replicado por otras comunidades.

---

## 9. Convenciones del código

- Comentarios en español dentro de los datos; código en inglés
- Cada archivo `.jsx` expone sus exports en `window` para que los scripts subsiguientes los usen (sin sistema de módulos ES)
- El bloque `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` en `TWEAK_DEFAULTS` permite que un host externo sobreescriba los valores por defecto directamente en disco
- Clases CSS con prefijo por componente: `.twk-*` para el Tweaks Panel, `.card-*` para tarjetas, `.detail-*` para el panel de detalle

---

*Documentación generada el 24 de abril de 2026.*
