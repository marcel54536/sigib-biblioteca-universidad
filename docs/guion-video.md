# Guion del video — SIGIB (máximo 8 minutos)

**Proyecto:** Sistema de Información para la Gestión Integral de la Biblioteca XXX
**Prototipo en línea:** https://marcel54536.github.io/sigib-biblioteca-universidad/prototipo/


Duración total planificada: **7:50** (dentro del límite de 8:00). El guion se divide en cinco intervenciones equivalentes para que cada integrante exponga y sea evaluado de forma individual. Cada bloque indica la **pantalla del prototipo** a mostrar y el **texto hablado** sugerido (primera persona del equipo, español formal académico). Los rótulos `[Integrante 1]` … `[Integrante 5]` son marcadores para que el equipo asigne los nombres reales.

---

### Tabla resumen de tiempos

| Bloque | Tiempo | Integrante | Contenido | Pantalla del prototipo |
|--------|--------|-----------|-----------|------------------------|
| 1 | 0:00 – 1:20 | [Integrante 1] | Apertura y planteamiento del problema | Portada / Login por rol |
| 2 | 1:20 – 2:50 | [Integrante 2] | Solución propuesta y tipo de Sistema de Información | Dashboard analítico (vista general) |
| 3 | 2:50 – 4:40 | [Integrante 3] | Demostración del flujo de préstamo (BPMN) | Circulación – Préstamo y Devolución |
| 4 | 4:40 – 6:30 | [Integrante 4] | Reportes, reservas y capa analítica | Reportes, Reservas (calendario) y Adquisiciones |
| 5 | 6:30 – 7:50 | [Integrante 5] | Beneficios institucionales y cierre | Portal del usuario / Cierre con logo |

---

### Bloque 1 — Apertura y problema · 0:00 – 1:20
**[Integrante 1]**

**Pantalla a mostrar:** Portada del prototipo con el nombre **SIGIB** y, seguidamente, la pantalla de **Login por rol** (selector de perfil: lector, bibliotecario, supervisor, director, administrador).

**Guion hablado:**
> «Buenos días. Somos el equipo responsable del proyecto de Sistemas de Información para la Biblioteca Central de la Universidad. Hoy les presentaremos **SIGIB**, el *Sistema de Información para la Gestión Integral de la Biblioteca*.
>
> Nuestra biblioteca atiende a más de **doce mil** estudiantes, profesores y personal administrativo, con cerca de cincuenta colaboradores distribuidos en circulación, adquisiciones, catalogación y referencia. Sin embargo, hoy opera con herramientas fragmentadas: catálogos físicos y hojas de Excel parciales que **no se sincronizan** entre estaciones de trabajo; préstamos registrados en tarjetas y planillas, **sin notificaciones automáticas de mora**; reservas de salas gestionadas por WhatsApp o correo, sin un calendario unificado; y una ausencia total de un **tablero central de reportes** que permita planificar el presupuesto con datos confiables.
>
> El resultado es información desactualizada, decisiones sin evidencia y una experiencia deficiente para el usuario. A continuación, mi compañero explicará cómo SIGIB resuelve estos problemas de raíz.»

---

### Bloque 2 — Solución y tipo de SI · 1:20 – 2:50
**[Integrante 2]**

**Pantalla a mostrar:** **Dashboard analítico** en su vista general (indicadores de uso, ocupación y morosidad), como imagen que resume el alcance del sistema.

**Guion hablado:**
> «SIGIB es una **aplicación web cliente-servidor** con una **base de datos relacional centralizada**, que se convierte en la *única fuente de verdad*. Esto elimina de inmediato la desincronización entre estaciones: cualquier préstamo, devolución o cambio en el catálogo se refleja en tiempo real para todos los perfiles, con **acceso controlado por roles**.
>
> En cuanto a su clasificación, SIGIB es un **Sistema de Información integrado**. Su núcleo operativo es un **TPS**, un Sistema de Procesamiento de Transacciones, que soporta catálogo, inventario, circulación, reservas y adquisiciones. Sobre ese núcleo construimos una capa gerencial tipo **MIS**, que genera reportes operativos periódicos; y una capa de **DSS**, o Soporte a Decisiones, materializada en este tablero analítico: libros más consultados, tasas de ocupación de salas, morosidad y uso por facultad.
>
> Esta combinación de **TPS, MIS y DSS integrados** es precisamente lo que en el dominio bibliotecario se conoce como un **ILS o Sistema Integrado de Gestión Bibliotecaria**. Es la categoría pertinente porque la biblioteca necesita, al mismo tiempo, procesar transacciones diarias de forma confiable y **tomar decisiones basadas en datos** para su planificación. Veamos ahora cómo funciona en la práctica.»

---

### Bloque 3 — Demo del flujo de préstamo (BPMN) · 2:50 – 4:40
**[Integrante 3]**

**Pantalla a mostrar:** Módulo **Circulación – Préstamo**, ejecutando el flujo principal paso a paso; luego **Circulación – Devolución** con el cálculo de mora.

**Guion hablado:**
> «Les mostraré el proceso de **circulación**, que fue el que modelamos con notación **BPMN** por ser el corazón operativo de la biblioteca.
>
> El flujo inicia con dos **entradas**: la identificación del usuario, mediante su carnet o cédula, y la identificación del ejemplar, por código de barras o ISBN. *(Se ingresan ambos datos en pantalla.)* El sistema valida al usuario, verifica la **disponibilidad del ejemplar** en el inventario centralizado y aplica automáticamente la **política de préstamo** según el tipo de usuario, que determina los días permitidos.
>
> Al confirmar, observen las **salidas** que genera el sistema: se registra el préstamo, se emite el **comprobante**, el ejemplar se marca como *no disponible* actualizando el inventario, y se calcula la **fecha de vencimiento**. Además, se programan las **notificaciones automáticas** de recordatorio y de mora, resolviendo uno de los principales dolores actuales.
>
> Ahora simulo la **devolución**. *(Se abre Circulación – Devolución.)* El sistema registra el retorno del ejemplar, lo devuelve al inventario como disponible y, si la fecha superó el vencimiento, **calcula la multa por mora de forma automática** y actualiza el historial del usuario. Todo el ciclo queda registrado en la bitácora de auditoría. Este mismo flujo contempla la **renovación** cuando no hay reservas en cola. Con esto vemos cómo SIGIB transforma un proceso manual y propenso a errores en una transacción trazable y confiable.»

---

### Bloque 4 — Reportes, reservas y adquisiciones · 4:40 – 6:30
**[Integrante 4]**

**Pantalla a mostrar:** **Reportes** (con exportación PDF/Excel), luego **Reservas** (calendario unificado de salas) y una vista breve de **Adquisiciones/Suscripciones** con alertas de renovación.

**Guion hablado:**
> «Sobre la información que generan las transacciones, SIGIB construye su valor gerencial. En el módulo de **Reportes**, el director y los supervisores acceden a indicadores clave: los libros más consultados, las tasas de ocupación de las salas, los niveles de morosidad y el uso por facultad. Estos reportes son **exportables a PDF y Excel**, lo que facilita los informes mensuales que la biblioteca debe presentar a rectoría y, sobre todo, sustenta la **planificación presupuestaria con evidencia**.
>
> En el módulo de **Reservas** presentamos un **calendario unificado**. *(Se muestra el calendario.)* Los usuarios reservan salas de estudio y agendan citas con bibliotecarios en un solo lugar, sustituyendo los mensajes dispersos por WhatsApp o correo y evitando la doble ocupación de espacios.
>
> Finalmente, en **Adquisiciones y Suscripciones** *(se muestra la vista)*, el sistema gestiona las solicitudes y órdenes a proveedores y, de forma destacada, emite **alertas automáticas de renovación** para las suscripciones a bases de datos académicas como **EBSCO y JSTOR**, sustituyendo los recordatorios informales por un control formal. Como se aprecia, la capa analítica no es un adorno: convierte la operación diaria en **decisiones informadas**.»

---

### Bloque 5 — Beneficios y cierre · 6:30 – 7:50
**[Integrante 5]**

**Pantalla a mostrar:** **Portal del usuario** (préstamos activos, historial, multas y reservas) y, para cerrar, la portada con el logo de **SIGIB**.

**Guion hablado:**
> «Para cerrar, resumimos las **ventajas para la Universidad** si adquiere este proyecto.
>
> Primero, una **única fuente de verdad**: se elimina la desincronización entre estaciones y la información deja de duplicarse. Segundo, **eficiencia operativa**: la circulación, las reservas y las adquisiciones se automatizan, y las notificaciones de mora reducen la pérdida de ejemplares. Tercero, **decisiones basadas en datos**, gracias al tablero analítico y a reportes exportables que fortalecen la planificación presupuestaria. Cuarto, **mejor experiencia para el usuario**: en este **Portal del usuario** cada lector consulta en línea sus préstamos activos, su historial, sus multas y sus reservas, sin depender de una tarjeta física.
>
> A ello se suman los atributos de calidad del sistema: **seguridad** por roles, cifrado y respaldo; **disponibilidad** y **escalabilidad** para más de doce mil usuarios; y **compatibilidad web y móvil**, con integración a la pasarela de correo y SMS y a los proveedores académicos.
>
> SIGIB es, en síntesis, un **Sistema Integrado de Gestión Bibliotecaria** que moderniza la operación, ordena la información y potencia la toma de decisiones de la Biblioteca Central. Agradecemos su atención.»

---

### Nota final: consejos de grabación

- **Ensayo cronometrado.** Practiquen con temporizador; cada integrante debe ajustarse a su ventana de tiempo. Si un bloque excede su límite, recorten frases secundarias antes de grabar.
- **Prototipo listo y navegable.** Abran previamente el prototipo desplegado en GitHub Pages con datos de ejemplo cargados, para que cada demo fluya sin pantallas en blanco ni cargas visibles.
- **Grabación de pantalla en alta definición.** Usen una herramienta de captura (por ejemplo, la grabación integrada del sistema, OBS o Loom) a 1080p, con el cursor visible y clics pausados para que el evaluador siga el flujo.
- **Audio claro.** Graben en un ambiente silencioso, con micrófono cercano; revisen que la voz de cada integrante se escuche uniforme. Consideren normalizar el volumen en la edición.
- **Transiciones limpias entre integrantes.** Cada quien anuncia brevemente al siguiente ("a continuación, mi compañero…") para que el relevo sea fluido y quede clara la participación individual.
- **Guion a la vista, sin leer de forma monótona.** Apóyense en el texto como referencia, pero mantengan un tono natural y profesional en tercera persona/primera del equipo.
- **Rótulos en pantalla.** Añadan subtítulos o un rótulo inferior con el nombre y el rol de quien expone en cada bloque, para facilitar la calificación individual.
- **Cierre con marca.** Finalicen con la portada y el logo de SIGIB en pantalla durante 2–3 segundos, y verifiquen que la duración total no supere los **8:00** antes de exportar.

