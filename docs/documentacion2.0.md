# Nodo Travesías — Documentación y Plan de Reestructuración (v2.0)

Este documento contiene las recomendaciones y el plan de reestructuración para el proyecto **redes2nodos**, basado en las necesidades reales de la comunidad rural a la que servirá.

## 1. Perfil de la Comunidad y Accesibilidad
- **Idioma y Cultura:** La comunidad es hispanohablante y está compuesta en su totalidad por campesinos. El contenido se mantendrá en español.
- **Nivel de Alfabetización Digital:** Básico a nulo en el uso avanzado de tecnologías. Gran parte de los usuarios serán adultos mayores.
- **Dispositivos:** Predominan los teléfonos celulares de gama baja y media.
- **Acciones a tomar:** 
  - Las interfaces deben ser extremadamente intuitivas, evitando abstracciones tecnológicas.
  - Se deben priorizar fuentes tipográficas legibles, de gran tamaño y con alto contraste.
  - El diseño debe acomodarse a pantallas pequeñas con procesadores lentos, evitando animaciones pesadas.

## 2. Pertinencia de los Servicios (Catálogo de Datos)
- **Dependencia de Red:** El proyecto **NO** debe depender de acceso a internet abierto para su funcionamiento núcleo.
- **Conexión y Entorno:** El sistema se alimenta de una red privada distribuida desde un servidor interno en la Universidad de la Amazonía vía antenas.
- **Módulos Híbridos:** Si bien la premisa es el funcionamiento offline interno, la red tiene salida a internet. Esto permite que servicios específicos (como el estado del clima o alertas externas) se muestren dinámicamente, mientras que el resto de herramientas comunitarias funcionen en la intranet.
- **Acciones a tomar:** 
  - Clasificar y adaptar los 11 servicios (Agenda, Telefonía, Agrolink, etc.) en `data.jsx`.
  - Crear indicadores visuales claros que diferencien qué servicios son internos y cuáles requieren internet.

## 3. Infraestructura y Límites Técnicos
- **Topología:** Infraestructura muy básica, sostenida por antenas y el servidor universitario.
- **Acciones a tomar:** 
  - Mantener la arquitectura del sitio estático sin bundlers pesados.
  - Asegurar que la carga inicial en los dispositivos móviles tome unos pocos kilobytes, crucial para conexiones de baja velocidad a través de antenas.

## 4. Gobernanza, Mantenimiento y Actualización
- **Estado Actual:** Por definir (no se sabe aún quién operará el mantenimiento técnico).
- **Acciones a tomar:** 
  - Simplificar al máximo la interfaz de configuración (`TweaksPanel`) para que, cuando se designe a un encargado, no requiera conocimientos técnicos previos.

## 5. Estética y Diseño (Themes)
- **Identidad Visual:** Requiere un enfoque mucho más local y reconocible para el entorno campesino.
- **Accesibilidad:** Debe ser fácil de entender para personas mayores.
- **Acciones a tomar:**
  - Rediseñar los temas (o ajustar los actuales: *Earthen, Kraft, Tinta*) para hacerlos más funcionales.
  - Aumentar drásticamente los tamaños de fuente base en `styles.css`.
  - Rediseñar la iconografía (`glyphs.jsx`) o el texto descriptivo si los símbolos abstractos actuales (ej. "manos" para rapicampo) no son evidentes para la comunidad.

---

## Plan de Acción de Reestructuración

Para adaptar el portal a estas realidades, proponemos ejecutar la reestructuración en 3 fases:

### Fase 1: Rediseño de Interfaz y Accesibilidad (UI/UX)
- **Tipografía y Legibilidad:** Aumentar el `--text-base` y hacer los encabezados más prominentes en `styles.css`.
- **Interacciones Explícitas:** Cambiar tarjetas (`ServiceCard`) para que los botones de acción sean explícitos (ej. un botón grande que diga "Entrar" en lugar de requerir tocar toda la tarjeta).
- **Enfoque Local:** Ajustar los colores para que se sientan propios del territorio sin perder el contraste necesario para la lectura.

### Fase 2: Ajuste del Catálogo y Lógica Híbrida
- **Refinar `data.jsx`:** Adaptar las descripciones y nombres de los servicios para que usen un vocabulario más cercano al campesino.
- **Gestión de Internet:** Implementar en `app.jsx` una verificación simple: si el dispositivo detecta salida a internet, muestra widgets dinámicos (clima); si no, oculta esos módulos silenciosamente sin mostrar errores.

### Fase 3: Optimización de Red Básica
- Garantizar que las librerías base (React/Babel) carguen eficientemente incluso si la señal de la antena universitaria fluctúa. (Evaluar si servir React localmente es mejor que usar la CDN de unpkg).
