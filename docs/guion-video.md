# Guion del video — SIGIB (máximo 8 minutos)

**Proyecto:** Sistema de Información para la Gestión Integral de la Biblioteca XXX
**Prototipo en línea:** https://marcel54536.github.io/sigib-biblioteca-universidad/prototipo/
**Equipo:** José Betorrean · Marcel Garavito · Nicola Sigilo · Melany Timaury

Duración total planificada: **7:50** (dentro del límite de 8:00). El guion se divide en cuatro intervenciones para que cada integrante exponga y sea evaluado de forma individual. Cada bloque indica la **pantalla del prototipo** a mostrar y el **texto hablado** sugerido (primera persona del equipo, español formal académico).

---

### Tabla resumen de tiempos

| Bloque | Tiempo | Integrante | Contenido | Pantalla del prototipo |
|--------|--------|-----------|-----------|------------------------|
| 1 | 0:00 – 1:50 | **José Betorrean** | Apertura y planteamiento del problema | Portada / Login por rol |
| 2 | 1:50 – 3:40 | **Marcel Garavito** | Solución propuesta y tipo de Sistema de Información | Dashboard analítico (vista general) |
| 3 | 3:40 – 5:40 | **Nicola Sigilo** | Demostración del flujo de préstamo y devolución (BPMN) | Circulación – Préstamo y Devolución |
| 4 | 5:40 – 7:50 | **Melany Timaury** | Reportes, reservas, capa analítica y cierre | Reportes, Reservas, Adquisiciones y Portal del usuario |

---

### Bloque 1 — Apertura y problema · 0:00 – 1:50
**José Betorrean**

**Pantalla a mostrar:** Portada del prototipo con el nombre **SIGIB** y, seguidamente, la pantalla de **Login por rol** (selector de perfil: lector, bibliotecario, supervisor, director, administrador).

**Guion hablado:**
> «Buenos días. Somos el equipo responsable del proyecto de Sistemas de Información para la Biblioteca Central de la Universidad; lo integran José Betorrean, Marcel Garavito, Nicola Sigilo y Melany Timaury. Hoy les presentaremos **SIGIB**, el *Sistema de Información para la Gestión Integral de la Biblioteca*.
>
> Nuestra biblioteca atiende a más de **doce mil** estudiantes, profesores y personal administrativo, con cerca de cincuenta colaboradores distribuidos en circulación, adquisiciones, catalogación y referencia. Sin embargo, hoy opera con herramientas fragmentadas: catálogos físicos y hojas de Excel parciales que **no se sincronizan** entre estaciones de trabajo; préstamos registrados en tarjetas y planillas, **sin notificaciones automáticas de mora**; reservas de salas gestionadas por WhatsApp o correo, sin un calendario unificado; y una ausencia total de un **tablero central de reportes** que permita planificar el presupuesto con datos confiables.
>
> El resultado es información desactualizada, decisiones sin evidencia y una experiencia deficiente para el usuario. A continuación, mi compañero Marcel explicará cómo SIGIB resuelve estos problemas de raíz.»

---

### Bloque 2 — Solución y tipo de SI · 1:50 – 3:40
**Marcel Garavito**

**Pantalla a mostrar:** **Dashboard analítico** en su vista general (indicadores de uso, ocupación y morosidad), como imagen que resume el alcance del sistema.

**Guion hablado:**
> «Gracias, José. SIGIB es una **aplicación web cliente-servidor** con una **base de datos relacional centralizada**, que se convierte en la *única fuente de verdad*. Esto elimina de inmediato la desincronización entre estaciones: cualquier préstamo, devolución o cambio en el catálogo se refleja en tiempo real para todos los perfiles, con **acceso controlado por roles**.
>
> En cuanto a su clasificación, SIGIB es un **Sistema de Información integrado**. Su núcleo operativo es un **TPS**, un Sistema de Procesamiento de Transacciones, que soporta catálogo, inventario, circulación, reservas y adquisiciones. Sobre ese núcleo construimos una capa gerencial tipo **MIS**, que genera reportes operativos periódicos; y una capa de **DSS**, o Soporte a Decisiones, materializada en este tablero analítico: libros más consultados, tasas de ocupación de salas, morosidad y uso por facultad.
>
> Esta combinación de **TPS, MIS y DSS integrados** es precisamente lo que en el dominio bibliotecario se conoce como un **ILS o Sistema Integrado de Gestión Bibliotecaria**. Es la categoría pertinente porque la biblioteca necesita, al mismo tiempo, procesar transacciones diarias de forma confiable y **tomar decisiones basadas en datos** para su planificación. Nicola les mostrará ahora cómo funciona en la práctica.»

---

### Bloque 3 — Demo del flujo de préstamo y devolución (BPMN) · 3:40 – 5:40
**Nicola Sigilo**

**Pantalla a mostrar:** Módulo **Circulación – Préstamo**, ejecutando el flujo principal paso a paso; luego **Circulación – Devolución** con el cálculo de mora.

**Guion hablado:**
> «Gracias, Marcel. Les mostraré el proceso de **circulación**, que fue el que modelamos con notación **BPMN** por ser el corazón operativo de la biblioteca.
>
> El flujo inicia con dos **entradas**: la identificación del usuario, mediante su carnet o cédula, y la identificación del ejemplar, por código de barras o ISBN. *(Se ingresan ambos datos en pantalla.)* El sistema valida al usuario, verifica la **disponibilidad del ejemplar** en el inventario centralizado y aplica automáticamente la **política de préstamo** según el tipo de usuario, que determina los días permitidos.
>
> Al confirmar, observen las **salidas** que genera el sistema: se registra el préstamo, se emite el **comprobante**, el ejemplar se marca como *no disponible* actualizando el inventario, y se calcula la **fecha de vencimiento**. Además, se programan las **notificaciones automáticas** de recordatorio y de mora, resolviendo uno de los principales dolores actuales.
>
> Ahora simulo la **devolución**. *(Se abre Circulación – Devolución.)* El sistema registra el retorno del ejemplar, lo devuelve al inventario como disponible y, si la fecha superó el vencimiento, **calcula la multa por mora de forma automática** y actualiza el historial del usuario. Todo el ciclo queda registrado en la bitácora de auditoría. Este proceso también contempla la **renovación** cuando no hay reservas en cola. Con esto vemos cómo SIGIB transforma un proceso manual y propenso a errores en una transacción trazable y confiable. Melany cerrará mostrando el valor gerencial del sistema.»

---

### Bloque 4 — Reportes, reservas, analítica y cierre · 5:40 – 7:50
**Melany Timaury**

**Pantalla a mostrar:** **Reportes** (con exportación PDF/Excel), luego **Reservas** (calendario unificado de salas), una vista breve de **Adquisiciones/Suscripciones** con alertas de renovación y, para cerrar, el **Portal del usuario** y la portada con el logo de **SIGIB**.

**Guion hablado:**
> «Gracias, Nicola. Sobre la información que generan las transacciones, SIGIB construye su valor gerencial. En el módulo de **Reportes**, el director y los supervisores acceden a indicadores clave: los libros más consultados, las tasas de ocupación de las salas, los niveles de morosidad y el uso por facultad. Estos reportes son **exportables a PDF y Excel**, lo que facilita los informes mensuales a rectoría y sustenta la **planificación presupuestaria con evidencia**.
>
> En el módulo de **Reservas** presentamos un **calendario unificado**: *(se muestra el calendario)* los usuarios reservan salas y agendan citas con bibliotecarios en un solo lugar, evitando la doble ocupación. Y en **Adquisiciones y Suscripciones** *(se muestra la vista)*, el sistema gestiona órdenes a proveedores y emite **alertas automáticas de renovación** para bases de datos como **EBSCO y JSTOR**.
>
> Para cerrar, resumimos las **ventajas para la Universidad**: una **única fuente de verdad** que elimina la desincronización; **eficiencia operativa** con circulación, reservas y adquisiciones automatizadas; **decisiones basadas en datos**; y una **mejor experiencia para el usuario**, que en este **Portal del usuario** *(se muestra)* consulta en línea sus préstamos, historial, multas y reservas. A ello se suman **seguridad** por roles, **escalabilidad** para más de doce mil usuarios y **compatibilidad web y móvil**.
>
> SIGIB es, en síntesis, un **Sistema Integrado de Gestión Bibliotecaria** que moderniza la operación, ordena la información y potencia la toma de decisiones de la Biblioteca Central. En nombre de José, Marcel, Nicola y de mi persona, agradecemos su atención.»

---

### Nota final: consejos de grabación

- **Ensayo cronometrado.** Practiquen con temporizador; cada integrante debe ajustarse a su ventana de tiempo (~1:50–2:10). Si un bloque excede su límite, recorten frases secundarias antes de grabar.
- **Prototipo listo y navegable.** Abran previamente el prototipo desplegado en GitHub Pages con datos de ejemplo, para que cada demo fluya sin pantallas en blanco.
- **Grabación de pantalla en alta definición.** Usen una herramienta de captura (grabación del sistema, OBS o Loom) a 1080p, con el cursor visible y clics pausados.
- **Audio claro.** Graben en ambiente silencioso, con micrófono cercano; normalicen el volumen en la edición.
- **Transiciones limpias entre integrantes.** Cada quien anuncia al siguiente (ya incluido en el guion) para que el relevo sea fluido y quede clara la participación individual.
- **Rótulos en pantalla.** Añadan un rótulo inferior con el nombre y el rol de quien expone en cada bloque, para facilitar la calificación individual.
- **Cierre con marca.** Finalicen con la portada y el logo de SIGIB durante 2–3 segundos, y verifiquen que la duración total no supere los **8:00** antes de exportar.
