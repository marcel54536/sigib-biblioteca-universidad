/* =========================================================================
   SIGIB — Datos simulados (mock) del prototipo
   Todo es data de demostración; en el sistema real provendría de la BD central.
   ========================================================================= */
window.DB = (function () {

  const covers = [
    "linear-gradient(135deg,#1b4079,#2a5a9e)",
    "linear-gradient(135deg,#0b2545,#13315c)",
    "linear-gradient(135deg,#7a3b12,#e08a1e)",
    "linear-gradient(135deg,#114c37,#1a7f5a)",
    "linear-gradient(135deg,#5a2170,#8e44ad)",
    "linear-gradient(135deg,#7a231a,#c0392b)",
    "linear-gradient(135deg,#0d5c63,#2a9d8f)",
    "linear-gradient(135deg,#334155,#64748b)"
  ];

  const books = [
    { id:"L-001", isbn:"978-8448198459", titulo:"Sistemas de Información Gerencial", autor:"Laudon, K. & Laudon, J.", cat:"Sistemas", anio:2020, fmt:"Físico", ejemplares:4, disponibles:1, consultas:342, cover:0, ubic:"CS-A-102" },
    { id:"L-002", isbn:"978-6073227599", titulo:"Análisis y Diseño de Sistemas", autor:"Kendall, K. & Kendall, J.", cat:"Sistemas", anio:2019, fmt:"Físico", ejemplares:3, disponibles:0, consultas:298, cover:1, ubic:"CS-A-118" },
    { id:"L-003", isbn:"978-0132071215", titulo:"BPMN Modeling and Reference Guide", autor:"White, S. & Miers, D.", cat:"Procesos", anio:2008, fmt:"Digital", ejemplares:99, disponibles:99, consultas:210, cover:2, ubic:"Digital" },
    { id:"L-004", isbn:"978-8425432958", titulo:"Cien Años de Soledad", autor:"García Márquez, Gabriel", cat:"Literatura", anio:2017, fmt:"Físico", ejemplares:6, disponibles:3, consultas:521, cover:3, ubic:"LT-C-045" },
    { id:"L-005", isbn:"978-0262033848", titulo:"Introduction to Algorithms", autor:"Cormen, T. et al.", cat:"Computación", anio:2022, fmt:"Físico", ejemplares:5, disponibles:2, consultas:410, cover:4, ubic:"CS-B-210" },
    { id:"L-006", isbn:"978-8420471839", titulo:"La Ciudad y los Perros", autor:"Vargas Llosa, Mario", cat:"Literatura", anio:2015, fmt:"Físico", ejemplares:4, disponibles:0, consultas:277, cover:5, ubic:"LT-C-051" },
    { id:"L-007", isbn:"978-0596007126", titulo:"Head First Design Patterns", autor:"Freeman, E. & Robson, E.", cat:"Computación", anio:2021, fmt:"Digital", ejemplares:99, disponibles:99, consultas:189, cover:6, ubic:"Digital" },
    { id:"L-008", isbn:"978-6070706691", titulo:"Fundamentos de Administración", autor:"Robbins, S. & Coulter, M.", cat:"Administración", anio:2018, fmt:"Físico", ejemplares:7, disponibles:5, consultas:233, cover:7, ubic:"AD-D-012" },
    { id:"L-009", isbn:"978-8436826197", titulo:"Metodología de la Investigación", autor:"Hernández Sampieri, R.", cat:"Investigación", anio:2020, fmt:"Físico", ejemplares:8, disponibles:2, consultas:388, cover:0, ubic:"IN-E-004" },
    { id:"L-010", isbn:"978-0134685991", titulo:"Effective Java", autor:"Bloch, Joshua", cat:"Computación", anio:2018, fmt:"Físico", ejemplares:3, disponibles:1, consultas:174, cover:3, ubic:"CS-B-233" },
    { id:"L-011", isbn:"978-8497328937", titulo:"El Aleph", autor:"Borges, Jorge Luis", cat:"Literatura", anio:2016, fmt:"Digital", ejemplares:99, disponibles:99, consultas:161, cover:2, ubic:"Digital" },
    { id:"L-012", isbn:"978-1491950357", titulo:"Designing Data-Intensive Applications", autor:"Kleppmann, Martin", cat:"Computación", anio:2019, fmt:"Físico", ejemplares:2, disponibles:0, consultas:301, cover:1, ubic:"CS-B-241" }
  ];

  const usuarios = [
    { id:"V-27.845.112", nombre:"María Fernanda Rojas", tipo:"Estudiante", facultad:"Ingeniería", prestamosMax:3, activos:1, mora:0, estado:"Habilitado", email:"mf.rojas@uxxx.edu.ve" },
    { id:"V-25.110.907", nombre:"Carlos Andrés Pérez", tipo:"Estudiante", facultad:"Ciencias", prestamosMax:3, activos:3, mora:0, estado:"Habilitado", email:"ca.perez@uxxx.edu.ve" },
    { id:"V-14.582.330", nombre:"Prof. Ana Belén Suárez", tipo:"Profesor", facultad:"Humanidades", prestamosMax:6, activos:2, mora:0, estado:"Habilitado", email:"ab.suarez@uxxx.edu.ve" },
    { id:"V-26.773.001", nombre:"José Gregorio Díaz", tipo:"Estudiante", facultad:"Administración", prestamosMax:3, activos:2, mora:1, estado:"Con mora", email:"jg.diaz@uxxx.edu.ve" },
    { id:"V-19.204.556", nombre:"Luisa Carolina Mendoza", tipo:"Personal", facultad:"Administrativo", prestamosMax:4, activos:0, mora:0, estado:"Habilitado", email:"lc.mendoza@uxxx.edu.ve" }
  ];

  const prestamos = [
    { id:"P-10231", usuario:"Carlos Andrés Pérez", usuarioId:"V-25.110.907", libro:"Introduction to Algorithms", libroId:"L-005", desde:"2026-07-05", vence:"2026-07-19", estado:"Activo", dias:0 },
    { id:"P-10228", usuario:"José Gregorio Díaz", usuarioId:"V-26.773.001", libro:"La Ciudad y los Perros", libroId:"L-006", desde:"2026-06-28", vence:"2026-07-12", estado:"En mora", dias:7 },
    { id:"P-10240", usuario:"María Fernanda Rojas", usuarioId:"V-27.845.112", libro:"Metodología de la Investigación", libroId:"L-009", desde:"2026-07-14", vence:"2026-07-28", estado:"Activo", dias:0 },
    { id:"P-10221", usuario:"Prof. Ana Belén Suárez", usuarioId:"V-14.582.330", libro:"Designing Data-Intensive Applications", libroId:"L-012", desde:"2026-07-01", vence:"2026-07-21", estado:"Activo", dias:0 },
    { id:"P-10245", usuario:"Carlos Andrés Pérez", usuarioId:"V-25.110.907", libro:"Effective Java", libroId:"L-010", desde:"2026-07-16", vence:"2026-07-30", estado:"Activo", dias:0 },
    { id:"P-10199", usuario:"José Gregorio Díaz", usuarioId:"V-26.773.001", libro:"Análisis y Diseño de Sistemas", libroId:"L-002", desde:"2026-07-10", vence:"2026-07-24", estado:"Activo", dias:0 }
  ];

  const salas = ["Sala Grupal A","Sala Grupal B","Cubículo 1","Cubículo 2","Sala Silenciosa"];
  const horas = ["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00"];
  // reservas[sala][horaIndex] = etiqueta o null
  const reservas = {
    "Sala Grupal A": { 1:"Grupo Ing.", 4:"Tesis · Rojas" },
    "Sala Grupal B": { 0:"Círculo lectura", 5:"Proyecto SI" },
    "Cubículo 1": { 2:"C. Pérez" },
    "Cubículo 2": {},
    "Sala Silenciosa": { 3:"A. Suárez", 6:"J. Díaz" }
  };

  const suscripciones = [
    { nombre:"EBSCO Academic Search", proveedor:"EBSCO", vence:"2026-08-15", estado:"Por vencer", dias:27, costo:"USD 12.500/año" },
    { nombre:"JSTOR Arts & Sciences", proveedor:"ITHAKA", vence:"2026-11-30", estado:"Vigente", dias:134, costo:"USD 9.800/año" },
    { nombre:"IEEE Xplore", proveedor:"IEEE", vence:"2026-07-25", estado:"Crítico", dias:6, costo:"USD 15.200/año" },
    { nombre:"Scopus", proveedor:"Elsevier", vence:"2027-01-20", estado:"Vigente", dias:185, costo:"USD 18.000/año" }
  ];

  const adquisiciones = [
    { id:"OC-4471", titulo:"Clean Architecture (R. Martin)", cant:3, proveedor:"Librería Técnica CA", estado:"En tránsito", solicita:"Catalogación" },
    { id:"OC-4468", titulo:"El Ruido y la Furia (Faulkner)", cant:2, proveedor:"Distribuidora Andina", estado:"Aprobada", solicita:"Referencia" },
    { id:"OC-4462", titulo:"Sistemas Operativos (Tanenbaum)", cant:4, proveedor:"Pearson VE", estado:"Recibida", solicita:"Circulación" },
    { id:"OC-4459", titulo:"Cálculo (Stewart) 8ª ed.", cant:5, proveedor:"Cengage", estado:"Solicitada", solicita:"Ciencias" }
  ];

  // Analítica
  const topLibros = [
    { t:"Cien Años de Soledad", v:521 },
    { t:"Introduction to Algorithms", v:410 },
    { t:"Metodología de la Investigación", v:388 },
    { t:"Sistemas de Información Gerencial", v:342 },
    { t:"Designing Data-Intensive Apps", v:301 },
    { t:"Análisis y Diseño de Sistemas", v:298 }
  ];
  const usoMensual = [ // préstamos por mes (últimos 8)
    { m:"Dic", v:820 }, { m:"Ene", v:640 }, { m:"Feb", v:1180 }, { m:"Mar", v:1340 },
    { m:"Abr", v:1290 }, { m:"May", v:1410 }, { m:"Jun", v:1220 }, { m:"Jul", v:1485 }
  ];
  const usoFacultad = [
    { t:"Ingeniería", v:34, c:"#2a5a9e" },
    { t:"Ciencias", v:22, c:"#1a7f5a" },
    { t:"Humanidades", v:18, c:"#e08a1e" },
    { t:"Administración", v:15, c:"#8e44ad" },
    { t:"Otras", v:11, c:"#64748b" }
  ];
  const ocupacionSalas = [
    { t:"Sala Grupal A", v:78 }, { t:"Sala Grupal B", v:64 }, { t:"Cubículo 1", v:52 },
    { t:"Cubículo 2", v:31 }, { t:"Sala Silenciosa", v:71 }
  ];
  const satisfaccion = { promedio:4.3, respuestas:214, dist:[3,7,18,64,122] }; // 1..5 estrellas

  const kpis = {
    prestamosHoy: 128,
    prestamosActivos: 1043,
    enMora: 37,
    ocupacionProm: 59,
    ejemplares: 48210,
    usuariosActivos: 8640
  };

  // Roles y navegación permitida
  const roles = {
    usuario:      { nombre:"María Fernanda Rojas", rol:"Usuario / Lector",           iniciales:"MR", nav:["dashboard-user","catalogo","reservas","portal"] },
    bibliotecario:{ nombre:"Pedro Ramírez",        rol:"Bibliotecario de circulación",iniciales:"PR", nav:["dashboard","catalogo","prestamo","devolucion","reservas","portal"] },
    supervisor:   { nombre:"Gabriela Ortega",      rol:"Supervisor de turno",         iniciales:"GO", nav:["dashboard","catalogo","prestamo","devolucion","reservas","adquisiciones","reportes"] },
    director:     { nombre:"Dr. Andrés Villalba",  rol:"Director / Administrador",    iniciales:"AV", nav:["dashboard","catalogo","prestamo","devolucion","reservas","adquisiciones","reportes","admin"] }
  };

  return {
    books, usuarios, prestamos, salas, horas, reservas, suscripciones, adquisiciones,
    topLibros, usoMensual, usoFacultad, ocupacionSalas, satisfaccion, kpis, roles, covers
  };
})();
