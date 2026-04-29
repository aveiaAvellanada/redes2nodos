




## 1. ¿Qué es este proyecto?

**Nodo Travesías** es la interfaz web del portal captivo de una red mesh comunitaria rural ubicada en la región amazónica de Colombia (Lat. 01° 36′ N, Long. 75° 36′ O, Alt. 240 m). Es la página de bienvenida que los vecinos ven al conectarse a la red Wi-Fi local `nodo-travesias`, sin necesidad de internet ni contraseña.

El proyecto es un **sitio estático** (sin build step), construido con React. Funciona offline-first: todos los módulos del nodo están diseñados para funcionar sin conexión a internet.

### Propósito
- Dar acceso visual a los 11 servicios comunitarios que aloja el nodo
- Informar el estado de la red en tiempo real (vecinos conectados, señal, sincronización)
- Permitir alertas de emergencia en el territorio
- Servir como directorio de recursos para las veredas conectadas


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



esos son sus servicios, es un menú de entrada, con una interfaz tipo aplicacion porque puede mudar a una aplicacion

necesito que tenga un nav inferior que tenga Inicio | Servicios | Red | ajustes

en el menú apareceran cosas como el clima alertas y notifaciones en servicios pues todos los servicios como cardas que despeus tendrán un apuntador a un microservicio, tambien necesita en ajustes la opcion del login, claro por supuesto necesita un login, ademas necesita agregar dos logos, uno es de la universidad quien patrociona y otro el semillero encargados, anetonces deja espacio para poner los iconos, luego yo reemplazo lo que está ahí po las iconos reales 

recuerda, lo mas simble y menos saturado posible visualmente primero, es cellphone first, y tiene que verse bien en una pantalla pequeña y con baja iluminacion, necesito que tenga fuentes claras y grandes, que se vea bien en la luz del sol y en la noche por igual, es para personas mayores la mayoria de los usuarios, personas con vision que no es de las mejores,  cra un tema claro y oscuro por defecto en configuraciones, con un selector o algo por el estilo claro, ademas de la accesibilidad para los que tengan baja vision, y que tenga un lenguaje sencillo







