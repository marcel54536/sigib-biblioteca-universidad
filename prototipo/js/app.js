/* =========================================================================
   SIGIB — Aplicación (router + vistas)  ·  Prototipo funcional
   Sin frameworks: vanilla JS. Enfocado en el flujo de Circulación (BPMN).
   ========================================================================= */
(function () {
  const DB = window.DB, Charts = window.Charts;
  const $app = document.getElementById("app");

  /* ------------------------------- Iconos ------------------------------- */
  const P = {
    home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    bookopen:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    repeat:'<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    corner:'<polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    chart:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    check:'<polyline points="20 6 9 17 4 12"/>',
    checkc:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    xc:'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    alert:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    arrow:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    menu:'<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    card:'<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    trend:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    pin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>'
  };
  const ic = (n, cls = "") => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[n] || ""}</svg>`;

  /* --------------------------- Metadatos de nav --------------------------- */
  const NAV = {
    "dashboard":      { label:"Panel de control", icon:"home",     group:"Operación", title:"Panel de control", sub:"Visión operativa y gerencial de la biblioteca" },
    "dashboard-user": { label:"Inicio",           icon:"home",     group:"Mi biblioteca", title:"Bienvenido/a", sub:"Tu actividad en la Biblioteca de la Universidad XXX" },
    "catalogo":       { label:"Catálogo",         icon:"book",     group:"Operación", title:"Catálogo unificado", sub:"Inventario centralizado de libros físicos y digitales" },
    "prestamo":       { label:"Registrar préstamo", icon:"repeat", group:"Circulación", title:"Registrar préstamo", sub:"Flujo principal del proceso de circulación (BPMN)" },
    "devolucion":     { label:"Registrar devolución", icon:"corner", group:"Circulación", title:"Registrar devolución", sub:"Devolución con cálculo automático de mora" },
    "reservas":       { label:"Reservas de salas", icon:"calendar", group:"Servicios", title:"Reservas de salas y citas", sub:"Calendario unificado de espacios de estudio" },
    "adquisiciones":  { label:"Adquisiciones",    icon:"cart",     group:"Gestión", title:"Adquisiciones y suscripciones", sub:"Órdenes a proveedores y bases de datos académicas" },
    "reportes":       { label:"Reportes",         icon:"chart",    group:"Gestión", title:"Reportes analíticos", sub:"Indicadores para la toma de decisiones (MIS/DSS)" },
    "portal":         { label:"Mis préstamos",    icon:"user",     group:"Mi biblioteca", title:"Portal del usuario", sub:"Tus préstamos, historial y multas" },
    "admin":          { label:"Administración",   icon:"settings", group:"Gestión", title:"Administración", sub:"Usuarios, roles y políticas de préstamo" }
  };

  /* ------------------------------- Estado ------------------------------- */
  const state = {
    roleKey: null,
    selectedRole: "bibliotecario",
    view: null,
    catFilter: { q: "", cat: "Todas", fmt: "Todos" },
    wizard: null,
    ret: null
  };

  /* ------------------------------ Utilidades ------------------------------ */
  const money = n => "Bs. " + n.toLocaleString("es-VE");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

  function toast(msg, kind = "ok", icon = "checkc") {
    const root = document.getElementById("toast-root");
    const t = document.createElement("div");
    t.className = "toast " + kind;
    t.innerHTML = ic(icon) + `<span>${msg}</span>`;
    root.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateX(20px)"; }, 3200);
    setTimeout(() => t.remove(), 3600);
  }

  function modal(html) {
    const root = document.getElementById("modal-root");
    root.innerHTML = `<div class="modal-backdrop" data-close-backdrop>${html}</div>`;
  }
  function closeModal() { document.getElementById("modal-root").innerHTML = ""; }

  /* =====================================================================
     LOGIN
     ===================================================================== */
  function renderLogin() {
    const roles = [
      { k:"usuario",       t:"Usuario / Lector",       s:"Estudiante o profesor",     i:"user" },
      { k:"bibliotecario", t:"Bibliotecario",          s:"Circulación",               i:"bookopen" },
      { k:"supervisor",    t:"Supervisor",             s:"Operaciones del turno",     i:"users" },
      { k:"director",      t:"Director / Admin",       s:"Gestión y reportes",        i:"settings" }
    ];
    $app.innerHTML = `
    <div class="login-wrap">
      <div class="login-hero">
        <div class="brand-lg">
          <img class="logo" src="assets/favicon.svg" alt="SIGIB" />
          <div><strong>SIGIB</strong></div>
        </div>
        <div>
          <h1>Gestión integral de la biblioteca, en un solo sistema</h1>
          <p class="lead">Catálogo, circulación, reservas y analítica sobre una base de datos centralizada. Adiós a los Excel desincronizados y a las tarjetas de préstamo en papel.</p>
          <div class="stat-row">
            <div><div class="n">+12.000</div><div class="l">usuarios</div></div>
            <div><div class="n">48.210</div><div class="l">ejemplares</div></div>
            <div><div class="n">5</div><div class="l">módulos integrados</div></div>
          </div>
        </div>
        <div class="l" style="color:#7f9cc4;font-size:.78rem">Universidad XXX · Caracas, Venezuela · Prototipo académico</div>
      </div>
      <div class="login-card-side">
        <div class="login-card">
          <h2>Iniciar sesión</h2>
          <p class="muted" style="margin-top:4px">Selecciona un rol para explorar el prototipo con permisos distintos.</p>
          <div class="role-grid" id="role-grid">
            ${roles.map(r => `
              <button class="role-opt ${r.k === state.selectedRole ? "active" : ""}" data-action="pick-role" data-role="${r.k}">
                ${ic(r.i)}
                <span><span class="rt">${r.t}</span><br><span class="rs">${r.s}</span></span>
              </button>`).join("")}
          </div>
          <div class="field">
            <label>Usuario</label>
            <div class="input-icon">${ic("user")}<input class="input" value="usuario.demo@uxxx.edu.ve" readonly></div>
          </div>
          <div class="field">
            <label>Contraseña</label>
            <div class="input-icon">${ic("settings")}<input class="input" type="password" value="demo1234" readonly></div>
          </div>
          <button class="btn btn-primary btn-block btn-lg" data-action="login-go">Ingresar al sistema ${ic("arrow")}</button>
          <p class="muted center" style="margin-top:14px;font-size:.78rem">Prototipo de demostración · no se envían datos reales</p>
        </div>
      </div>
    </div>`;
  }

  /* =====================================================================
     SHELL (sidebar + topbar + content)
     ===================================================================== */
  function renderShell(view) {
    const role = DB.roles[state.roleKey];
    const allowed = role.nav;
    const groups = {};
    allowed.forEach(v => {
      const g = NAV[v].group;
      (groups[g] = groups[g] || []).push(v);
    });
    const counts = { prestamo: DB.kpis.prestamosHoy, devolucion: DB.kpis.enMora, adquisiciones: DB.adquisiciones.length };

    const nav = Object.keys(groups).map(g => `
      <div class="group-label">${g}</div>
      ${groups[g].map(v => `
        <a href="#/${v}" data-action="nav" data-view="${v}" class="${v === view ? "active" : ""}">
          ${ic(NAV[v].icon)}<span>${NAV[v].label}</span>
          ${counts[v] ? `<span class="count">${counts[v]}</span>` : ""}
        </a>`).join("")}
    `).join("");

    const meta = NAV[view];
    $app.innerHTML = `
    <div class="shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <img class="logo" src="assets/favicon.svg" alt="" />
          <div><strong>SIGIB</strong><small>BIBLIOTECA · U. XXX</small></div>
        </div>
        <nav class="nav">${nav}</nav>
        <div class="side-foot">
          <div class="userbox">
            <div class="avatar">${role.iniciales}</div>
            <div class="grow"><div class="un">${role.nombre}</div><div class="ur">${role.rol}</div></div>
            <button class="icon-btn" data-action="logout" title="Cerrar sesión">${ic("logout")}</button>
          </div>
        </div>
      </aside>
      <div class="main">
        <div class="proto-banner">PROTOTIPO FUNCIONAL · Los datos son de demostración</div>
        <header class="topbar">
          <button class="icon-btn menu-toggle" data-action="toggle-menu">${ic("menu")}</button>
          <div>
            <div class="page-title">${meta.title}</div>
            <div class="crumb">SIGIB / ${meta.label}</div>
          </div>
          <div class="search">${ic("search")}<input placeholder="Buscar libros, usuarios, préstamos…" data-action="global-search"></div>
          <button class="icon-btn" data-action="notif" title="Notificaciones">${ic("bell")}<span class="ping"></span></button>
        </header>
        <main class="content" id="content"></main>
      </div>
    </div>`;

    renderView(view);
  }

  function renderView(view) {
    const c = document.getElementById("content");
    const map = {
      "dashboard": viewDashboard, "dashboard-user": viewDashboardUser, "catalogo": viewCatalogo,
      "prestamo": viewPrestamo, "devolucion": viewDevolucion, "reservas": viewReservas,
      "adquisiciones": viewAdquisiciones, "reportes": viewReportes, "portal": viewPortal, "admin": viewAdmin
    };
    (map[view] || viewDashboard)(c);
  }

  /* =====================================================================
     DASHBOARD (staff)
     ===================================================================== */
  function kpiCard(icon, tint, val, lbl, trend) {
    return `<div class="card kpi">
      <div class="top">
        <div class="ico" style="background:${tint}22;color:${tint}">${ic(icon)}</div>
        ${trend ? `<span class="trend ${trend[0]}">${trend[0] === "up" ? "▲" : "▼"} ${trend[1]}</span>` : ""}
      </div>
      <div class="val">${val}</div><div class="lbl">${lbl}</div>
    </div>`;
  }

  function viewDashboard(c) {
    const k = DB.kpis, esDir = state.roleKey === "director" || state.roleKey === "supervisor";
    c.innerHTML = `
    <div class="grid grid-4">
      ${kpiCard("repeat", "#2a5a9e", k.prestamosHoy, "Préstamos hoy", ["up","12%"])}
      ${kpiCard("bookopen", "#1a7f5a", k.prestamosActivos.toLocaleString("es-VE"), "Préstamos activos", ["up","4%"])}
      ${kpiCard("alert", "#c0392b", k.enMora, "En mora", ["down","8%"])}
      ${kpiCard("layers", "#e08a1e", k.ocupacionProm + "%", "Ocupación promedio salas", ["up","6%"])}
    </div>

    <div class="grid g-2-1 mt-3">
      <div class="card">
        <div class="card-head"><h3>Préstamos por mes</h3><span class="badge badge-info">${ic("trend")} Tendencia +8%</span></div>
        <div class="card-body">${Charts.line(DB.usoMensual)}</div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Uso por facultad</h3></div>
        <div class="card-body center">
          ${Charts.donut(DB.usoFacultad)}
          <div class="legend mt-2" style="justify-content:center">
            ${DB.usoFacultad.map(f => `<span class="li"><span class="sw" style="background:${f.c}"></span>${f.t}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>

    <div class="grid g-2-1 mt-3">
      <div class="card">
        <div class="card-head"><h3>Préstamos recientes</h3><a href="#/portal" data-action="nav" data-view="portal">Ver todos</a></div>
        <div class="card-body" style="padding-top:6px">
          <div class="table-wrap"><table class="tbl">
            <thead><tr><th>ID</th><th>Usuario</th><th>Ejemplar</th><th>Vence</th><th>Estado</th></tr></thead>
            <tbody>${DB.prestamos.slice(0,5).map(p => `
              <tr><td class="b">${p.id}</td><td>${p.usuario}</td><td>${p.libro}</td><td>${p.vence}</td>
              <td>${p.estado === "En mora" ? `<span class="badge badge-danger"><span class="dot"></span>En mora</span>` : `<span class="badge badge-success"><span class="dot"></span>Activo</span>`}</td></tr>`).join("")}
            </tbody></table></div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Alertas del sistema</h3></div>
        <div class="card-body">
          <div class="alert danger">${ic("alert")}<div><div class="t">37 préstamos en mora</div><div class="d">Notificaciones automáticas enviadas por correo/SMS.</div></div></div>
          <div class="alert warn">${ic("clock")}<div><div class="t">IEEE Xplore vence en 6 días</div><div class="d">Renovar suscripción para no perder acceso.</div></div></div>
          <div class="alert info">${ic("cart")}<div><div class="t">OC-4471 en tránsito</div><div class="d">3 ejemplares de "Clean Architecture".</div></div></div>
        </div>
      </div>
    </div>

    ${esDir ? `
    <div class="grid grid-2 mt-3">
      <div class="card"><div class="card-head"><h3>Libros más consultados</h3></div><div class="card-body">${Charts.hbars(DB.topLibros)}</div></div>
      <div class="card"><div class="card-head"><h3>Ocupación de salas de estudio</h3></div><div class="card-body">${Charts.vbars(DB.ocupacionSalas)}</div></div>
    </div>` : ""}
    `;
  }

  /* =====================================================================
     DASHBOARD USUARIO (lector)
     ===================================================================== */
  function viewDashboardUser(c) {
    const mis = DB.prestamos.filter(p => p.usuarioId === "V-27.845.112");
    c.innerHTML = `
    <div class="card" style="background:linear-gradient(120deg,#13315c,#2a5a9e);color:#fff;border:none">
      <div class="card-body row-between wrap">
        <div><h2 style="color:#fff">Hola, María Fernanda 👋</h2>
          <p style="color:#c7d6ec;margin:6px 0 0">Tienes <b>1 préstamo activo</b> y <b>0 multas</b>. ¡Buen semestre!</p></div>
        <button class="btn btn-accent btn-lg" data-action="nav" data-view="catalogo">${ic("search")} Explorar catálogo</button>
      </div>
    </div>
    <div class="grid grid-3 mt-3">
      ${kpiCard("bookopen","#2a5a9e",mis.length,"Préstamos activos")}
      ${kpiCard("clock","#e08a1e","0","Multas pendientes")}
      ${kpiCard("calendar","#1a7f5a","2","Reservas de sala")}
    </div>
    <div class="card mt-3">
      <div class="card-head"><h3>Mis préstamos</h3><a href="#/portal" data-action="nav" data-view="portal">Ver detalle</a></div>
      <div class="card-body">
        ${mis.map(p => `<div class="list-item">${ic("book","")}
          <div class="grow"><div class="b">${p.libro}</div><div class="muted" style="font-size:.8rem">Vence el ${p.vence}</div></div>
          <span class="badge badge-success">Activo</span></div>`).join("") || '<p class="muted">Sin préstamos activos.</p>'}
      </div>
    </div>`;
  }

  /* =====================================================================
     CATÁLOGO
     ===================================================================== */
  function bookCover(b, big) {
    const c = DB.covers[b.cover];
    return `<div class="${big ? "cover-lg" : "cover"}" style="background:${c}">
      <span class="cat">${b.cat}</span>
      <span class="fmt badge ${b.fmt === "Digital" ? "badge-info" : "badge-muted"}" style="color:#fff;background:rgba(255,255,255,.22)">${b.fmt}</span>
      <div><div style="font-weight:800;font-size:.82rem;line-height:1.15">${b.titulo.length > 34 ? b.titulo.slice(0,32) + "…" : b.titulo}</div></div>
    </div>`;
  }

  function viewCatalogo(c) {
    const cats = ["Todas", ...new Set(DB.books.map(b => b.cat))];
    c.innerHTML = `
    <div class="filters">
      <div class="input-icon grow" style="max-width:340px">${ic("search")}
        <input class="input" id="cat-q" placeholder="Título, autor o ISBN…" value="${esc(state.catFilter.q)}" data-action="cat-search"></div>
      <select class="select" id="cat-cat" data-action="cat-filter" style="max-width:180px">
        ${cats.map(x => `<option ${x === state.catFilter.cat ? "selected" : ""}>${x}</option>`).join("")}
      </select>
      <div class="seg" id="cat-fmt">
        ${["Todos","Físico","Digital"].map(f => `<button data-action="cat-fmt" data-fmt="${f}" class="${state.catFilter.fmt === f ? "active" : ""}">${f}</button>`).join("")}
      </div>
      <div class="grow"></div>
      ${state.roleKey !== "usuario" ? `<button class="btn btn-primary" data-action="new-book">${ic("plus")} Catalogar</button>` : ""}
    </div>
    <div id="cat-grid"></div>`;
    renderCatalogGrid();
  }

  function renderCatalogGrid() {
    const f = state.catFilter, q = f.q.toLowerCase();
    let list = DB.books.filter(b =>
      (f.cat === "Todas" || b.cat === f.cat) &&
      (f.fmt === "Todos" || b.fmt === f.fmt) &&
      (!q || b.titulo.toLowerCase().includes(q) || b.autor.toLowerCase().includes(q) || b.isbn.includes(q)));
    const g = document.getElementById("cat-grid");
    if (!g) return;
    if (!list.length) { g.innerHTML = `<div class="card card-pad center muted">${ic("search")}<p class="mt-1">Sin resultados para tu búsqueda.</p></div>`; return; }
    g.innerHTML = `<div class="catalog-grid">${list.map(b => `
      <div class="book" data-action="open-book" data-id="${b.id}">
        ${bookCover(b)}
        <div class="info">
          <div class="t">${b.titulo}</div><div class="a">${b.autor}</div>
          <div class="foot">
            ${b.disponibles > 0
              ? `<span class="badge badge-success"><span class="dot"></span>${b.fmt === "Digital" ? "Disponible" : b.disponibles + " disp."}</span>`
              : `<span class="badge badge-danger"><span class="dot"></span>No disponible</span>`}
            <span class="muted" style="font-size:.72rem">${b.anio}</span>
          </div>
        </div>
      </div>`).join("")}</div>`;
  }

  function openBook(id) {
    const b = DB.books.find(x => x.id === id); if (!b) return;
    const disp = b.disponibles > 0;
    modal(`<div class="modal wide">
      <div class="modal-head"><h3>Ficha del ejemplar</h3><button class="icon-btn" data-action="close-modal">${ic("x")}</button></div>
      <div class="modal-body">
        <div class="book-detail">
          ${bookCover(b, true)}
          <div>
            <h2 style="font-size:1.3rem">${b.titulo}</h2>
            <p class="muted" style="margin:2px 0 14px">${b.autor} · ${b.anio}</p>
            <dl class="meta-grid">
              <dt>ISBN</dt><dd>${b.isbn}</dd>
              <dt>Categoría</dt><dd>${b.cat}</dd>
              <dt>Formato</dt><dd>${b.fmt}</dd>
              <dt>Ubicación</dt><dd>${b.ubic}</dd>
              <dt>Ejemplares</dt><dd>${b.fmt === "Digital" ? "Ilimitado (licencia)" : b.ejemplares}</dd>
              <dt>Disponibles</dt><dd>${b.fmt === "Digital" ? "—" : b.disponibles + " de " + b.ejemplares}</dd>
              <dt>Consultas</dt><dd>${b.consultas} en el año</dd>
            </dl>
            <div class="row mt-3 wrap">
              ${disp
                ? (state.roleKey === "usuario"
                    ? `<span class="badge badge-success">${ic("checkc")} Disponible para préstamo</span>`
                    : `<button class="btn btn-primary" data-action="prestar-from-catalog" data-id="${b.id}">${ic("repeat")} Prestar este ejemplar</button>`)
                : `<button class="btn btn-accent" data-action="reservar-libro" data-id="${b.id}">${ic("clock")} Reservar (cola de espera)</button>`}
              <button class="btn btn-ghost" data-action="close-modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>`);
  }

  /* =====================================================================
     PRÉSTAMO — Wizard (flujo principal del BPMN)
     ===================================================================== */
  function startWizard(preBookId) {
    state.wizard = { step: 1, user: null, book: preBookId ? DB.books.find(b => b.id === preBookId) : null };
    if (state.wizard.book) state.wizard.step = 1; // igual pide usuario primero
  }

  function viewPrestamo(c) {
    if (!state.wizard) startWizard();
    const w = state.wizard;
    const steps = ["Identificar usuario", "Seleccionar ejemplar", "Validar política", "Confirmar"];
    const stepper = `<div class="stepper">${steps.map((s, i) => {
      const n = i + 1, st = n < w.step ? "done" : n === w.step ? "active" : "";
      return `<div class="step ${st}"><div class="num">${n < w.step ? "✓" : n}</div><div class="lab">${s}</div></div>${i < steps.length - 1 ? `<div class="step ${n < w.step ? "done" : ""}"><div class="bar"></div></div>` : ""}`;
    }).join("")}</div>`;

    let body = "";
    if (w.step === 1) body = wizStep1();
    else if (w.step === 2) body = wizStep2();
    else if (w.step === 3) body = wizStep3();
    else body = wizStep4();

    c.innerHTML = `<div class="card"><div class="card-body">${stepper}${body}</div></div>
      <p class="muted mt-2" style="font-size:.8rem">${ic("layers","")} Este flujo corresponde al proceso <b>Circulación → Préstamo</b> modelado en el diagrama BPMN de la propuesta.</p>`;

    if (w.step === 1) bindWizStep1();
    if (w.step === 2) bindWizStep2();
  }

  function wizStep1() {
    const w = state.wizard;
    return `<h3>Paso 1 · Identificar al usuario</h3>
      <p class="muted mb-2">Escanea el carnet o busca por cédula/nombre. <span class="badge badge-muted">Entrada del proceso</span></p>
      <div class="input-icon" style="max-width:420px">${ic("user")}<input class="input" id="w-user" placeholder="Cédula, carnet o nombre… (ej: V-25 o María)" autocomplete="off"></div>
      <div id="w-user-list" class="mt-2"></div>
      ${w.user ? personBlock(w.user) : ""}`;
  }

  function personBlock(u) {
    const habil = u.estado === "Habilitado";
    const excede = u.activos >= u.prestamosMax;
    return `<div class="mt-3">
      <div class="person-card">
        <div class="avatar" style="width:48px;height:48px">${u.nombre.split(" ").map(x=>x[0]).slice(0,2).join("")}</div>
        <div class="grow">
          <div class="b" style="font-size:1rem">${u.nombre}</div>
          <div class="muted" style="font-size:.82rem">${u.id} · ${u.tipo} · ${u.facultad}</div>
        </div>
        <div>${habil ? `<span class="badge badge-success">${ic("checkc")} Habilitado</span>` : `<span class="badge badge-danger">${ic("xc")} ${u.estado}</span>`}</div>
      </div>
      <div class="mt-2">
        ${!habil ? `<div class="gate bad">${ic("xc")} Usuario con mora activa. Debe regularizar antes de un nuevo préstamo.</div>`
          : excede ? `<div class="gate warn">${ic("alert")} Alcanzó el máximo de ${u.prestamosMax} préstamos (${u.activos} activos).</div>`
          : `<div class="gate ok">${ic("check")} Usuario habilitado · ${u.activos}/${u.prestamosMax} préstamos activos.</div>`}
      </div>
      <div class="row mt-3">
        <button class="btn btn-primary" data-action="wiz-next-1" ${(!habil || excede) ? "disabled" : ""}>Continuar ${ic("arrow")}</button>
        <button class="btn btn-ghost" data-action="wiz-reset">Cancelar</button>
      </div>
    </div>`;
  }

  function bindWizStep1() {
    const inp = document.getElementById("w-user");
    const list = document.getElementById("w-user-list");
    if (!inp) return;
    inp.focus();
    inp.addEventListener("input", () => {
      const q = inp.value.toLowerCase().trim();
      if (!q) { list.innerHTML = ""; return; }
      const res = DB.usuarios.filter(u => u.nombre.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.tipo.toLowerCase().includes(q)).slice(0, 4);
      list.innerHTML = res.length ? `<div class="card" style="max-width:420px">${res.map(u => `
        <div class="list-item" style="padding:10px 14px;cursor:pointer" data-action="pick-user" data-id="${u.id}">
          <div class="avatar" style="width:34px;height:34px">${u.nombre.split(" ").map(x=>x[0]).slice(0,2).join("")}</div>
          <div class="grow"><div class="b" style="font-size:.88rem">${u.nombre}</div><div class="muted" style="font-size:.76rem">${u.id} · ${u.tipo}</div></div>
          ${u.estado !== "Habilitado" ? `<span class="badge badge-danger">Mora</span>` : ""}
        </div>`).join("")}</div>` : `<p class="muted" style="font-size:.82rem">Sin coincidencias.</p>`;
    });
  }

  function wizStep2() {
    const w = state.wizard;
    return `<h3>Paso 2 · Seleccionar el ejemplar</h3>
      <p class="muted mb-2">Escanea el código de barras / ISBN o busca por título. <span class="badge badge-muted">Entrada del proceso</span></p>
      <div class="input-icon" style="max-width:420px">${ic("book")}<input class="input" id="w-book" placeholder="ISBN, código o título… (ej: Algoritmos)" autocomplete="off"></div>
      <div id="w-book-list" class="mt-2"></div>
      ${w.book ? itemBlock(w.book) : ""}`;
  }

  function itemBlock(b) {
    const disp = b.disponibles > 0 || b.fmt === "Digital";
    return `<div class="mt-3">
      <div class="item-card">
        <div class="cover" style="width:54px;height:70px;border-radius:8px;background:${DB.covers[b.cover]};padding:6px"></div>
        <div class="grow"><div class="b" style="font-size:1rem">${b.titulo}</div>
          <div class="muted" style="font-size:.82rem">${b.autor} · ${b.fmt} · ${b.ubic}</div></div>
        <div>${disp ? `<span class="badge badge-success">${ic("checkc")} ${b.fmt === "Digital" ? "Licencia disponible" : b.disponibles + " disponibles"}</span>` : `<span class="badge badge-danger">${ic("xc")} No disponible</span>`}</div>
      </div>
      <div class="mt-2">${disp ? `<div class="gate ok">${ic("check")} Ejemplar disponible para préstamo.</div>`
        : `<div class="gate bad">${ic("xc")} No hay ejemplares disponibles. Se sugiere registrar una <b>reserva</b> (cola de espera).</div>`}</div>
      <div class="row mt-3">
        <button class="btn btn-ghost" data-action="wiz-back-2">${ic("corner")} Atrás</button>
        ${disp ? `<button class="btn btn-primary" data-action="wiz-next-2">Continuar ${ic("arrow")}</button>`
          : `<button class="btn btn-accent" data-action="reservar-libro" data-id="${b.id}">${ic("clock")} Registrar reserva</button>`}
      </div>
    </div>`;
  }

  function bindWizStep2() {
    const inp = document.getElementById("w-book");
    const list = document.getElementById("w-book-list");
    if (!inp) return;
    inp.focus();
    inp.addEventListener("input", () => {
      const q = inp.value.toLowerCase().trim();
      if (!q) { list.innerHTML = ""; return; }
      const res = DB.books.filter(b => b.titulo.toLowerCase().includes(q) || b.autor.toLowerCase().includes(q) || b.isbn.includes(q)).slice(0, 4);
      list.innerHTML = res.length ? `<div class="card" style="max-width:460px">${res.map(b => `
        <div class="list-item" style="padding:10px 14px;cursor:pointer" data-action="pick-book" data-id="${b.id}">
          <div class="cover" style="width:30px;height:40px;border-radius:5px;background:${DB.covers[b.cover]}"></div>
          <div class="grow"><div class="b" style="font-size:.86rem">${b.titulo}</div><div class="muted" style="font-size:.74rem">${b.autor}</div></div>
          ${(b.disponibles > 0 || b.fmt === "Digital") ? `<span class="badge badge-success">Disp.</span>` : `<span class="badge badge-danger">Agotado</span>`}
        </div>`).join("")}</div>` : `<p class="muted" style="font-size:.82rem">Sin coincidencias.</p>`;
    });
  }

  function politicaDias(tipo) { return tipo === "Profesor" ? 21 : tipo === "Personal" ? 14 : 14; }
  function addDays(days) {
    const base = new Date("2026-07-19T00:00:00");
    base.setDate(base.getDate() + days);
    return base.toISOString().slice(0, 10);
  }

  function wizStep3() {
    const w = state.wizard, u = w.user, b = w.book;
    const dias = politicaDias(u.tipo);
    const vence = addDays(dias);
    w.vence = vence; w.dias = dias;
    return `<h3>Paso 3 · Validar política de préstamo</h3>
      <p class="muted mb-2">El sistema aplica automáticamente la política según el tipo de usuario. <span class="badge badge-muted">Compuertas de decisión (BPMN)</span></p>
      <div class="grid grid-2">
        <div class="card card-pad"><div class="muted" style="font-size:.78rem">USUARIO</div><div class="b" style="font-size:1.05rem">${u.nombre}</div><div class="muted">${u.tipo} · ${u.facultad}</div></div>
        <div class="card card-pad"><div class="muted" style="font-size:.78rem">EJEMPLAR</div><div class="b" style="font-size:1.05rem">${b.titulo}</div><div class="muted">${b.fmt} · ${b.ubic}</div></div>
      </div>
      <div class="mt-3">
        <div class="gate ok">${ic("check")} Usuario habilitado (sin mora).</div>
        <div class="gate ok">${ic("check")} Ejemplar disponible en inventario.</div>
        <div class="gate ok">${ic("check")} No excede el máximo de préstamos (${u.activos + 1}/${u.prestamosMax}).</div>
        <div class="gate ok">${ic("clock")} Política: <b>${dias} días</b> → vence el <b>${vence}</b>. Se programarán notificaciones automáticas.</div>
      </div>
      <div class="row mt-3">
        <button class="btn btn-ghost" data-action="wiz-back-3">${ic("corner")} Atrás</button>
        <button class="btn btn-success" data-action="wiz-confirm">${ic("checkc")} Confirmar préstamo</button>
      </div>`;
  }

  function wizStep4() {
    const w = state.wizard, u = w.user, b = w.book;
    return `<div class="center mb-2">
        <div style="width:66px;height:66px;border-radius:50%;background:var(--success-soft);color:var(--success);display:flex;align-items:center;justify-content:center;margin:0 auto 10px">${ic("checkc")}</div>
        <h3>¡Préstamo registrado!</h3>
        <p class="muted">Inventario actualizado y comprobante generado. <span class="badge badge-muted">Salidas del proceso</span></p>
      </div>
      <div class="receipt">
        <div class="center mb-2"><b>SIGIB · Comprobante de préstamo</b><br><span class="muted" style="font-size:.78rem">Biblioteca Central · Universidad XXX</span></div>
        <div class="line"><span>N° préstamo</span><b>${w.folio}</b></div>
        <div class="line"><span>Usuario</span><b>${u.nombre}</b></div>
        <div class="line"><span>Ejemplar</span><b>${b.titulo}</b></div>
        <div class="line"><span>Formato</span><b>${b.fmt}</b></div>
        <div class="line"><span>Fecha préstamo</span><b>2026-07-19</b></div>
        <div class="line"><span>Vence</span><b style="color:var(--danger)">${w.vence}</b></div>
        <div class="line"><span>Notificaciones</span><b>Correo + SMS</b></div>
      </div>
      <div class="row mt-3" style="justify-content:center">
        <button class="btn btn-primary" data-action="wiz-new">${ic("plus")} Nuevo préstamo</button>
        <button class="btn btn-ghost" data-action="print-receipt">${ic("download")} Imprimir comprobante</button>
      </div>`;
  }

  /* =====================================================================
     DEVOLUCIÓN
     ===================================================================== */
  function viewDevolucion(c) {
    if (!state.ret) state.ret = { loan: null, done: false };
    const r = state.ret;
    c.innerHTML = `<div class="card"><div class="card-body">
      <h3>Registrar devolución</h3>
      <p class="muted mb-2">Escanea el ejemplar o busca el préstamo activo. El sistema calcula la mora automáticamente.</p>
      <div class="input-icon" style="max-width:420px">${ic("search")}<input class="input" id="ret-inp" placeholder="N° de préstamo, usuario o título…" autocomplete="off"></div>
      <div id="ret-list" class="mt-2"></div>
      <div id="ret-detail" class="mt-2"></div>
    </div></div>`;
    const inp = document.getElementById("ret-inp");
    const list = document.getElementById("ret-list");
    inp.focus();
    const render = (q) => {
      const res = DB.prestamos.filter(p => p.estado !== "Devuelto" && (!q || p.id.toLowerCase().includes(q) || p.usuario.toLowerCase().includes(q) || p.libro.toLowerCase().includes(q)));
      list.innerHTML = `<div class="table-wrap"><table class="tbl">
        <thead><tr><th>Préstamo</th><th>Usuario</th><th>Ejemplar</th><th>Vence</th><th>Estado</th><th></th></tr></thead>
        <tbody>${res.map(p => `<tr>
          <td class="b">${p.id}</td><td>${p.usuario}</td><td>${p.libro}</td><td>${p.vence}</td>
          <td>${p.estado === "En mora" ? `<span class="badge badge-danger">En mora · ${p.dias}d</span>` : `<span class="badge badge-success">Activo</span>`}</td>
          <td><button class="btn btn-sm btn-primary" data-action="ret-pick" data-id="${p.id}">Devolver</button></td>
        </tr>`).join("")}</tbody></table></div>`;
    };
    render("");
    inp.addEventListener("input", () => render(inp.value.toLowerCase().trim()));
    if (r.loan) showReturnDetail(r.loan);
  }

  function showReturnDetail(p) {
    const mora = p.estado === "En mora";
    const tarifa = 5000; // Bs/día (demo)
    const multa = mora ? p.dias * tarifa : 0;
    document.getElementById("ret-detail").innerHTML = `
      <div class="card card-pad" style="max-width:520px">
        <div class="row-between"><h3 style="font-size:1.05rem">Préstamo ${p.id}</h3>
          ${mora ? `<span class="badge badge-danger">${ic("alert")} ${p.dias} días de mora</span>` : `<span class="badge badge-success">${ic("checkc")} A tiempo</span>`}</div>
        <div class="meta-grid mt-2">
          <dt>Usuario</dt><dd>${p.usuario}</dd>
          <dt>Ejemplar</dt><dd>${p.libro}</dd>
          <dt>Prestado</dt><dd>${p.desde}</dd>
          <dt>Vencía</dt><dd>${p.vence}</dd>
        </div>
        ${mora ? `<div class="gate bad mt-2">${ic("card")} Multa por mora: ${p.dias} días × ${money(tarifa)} = <b>&nbsp;${money(multa)}</b></div>`
                : `<div class="gate ok mt-2">${ic("check")} Devolución dentro del plazo. Sin multa.</div>`}
        <div class="row mt-3">
          <button class="btn btn-success" data-action="ret-confirm" data-id="${p.id}" data-multa="${multa}">${ic("corner")} Confirmar devolución</button>
          <button class="btn btn-ghost" data-action="ret-cancel">Cancelar</button>
        </div>
      </div>`;
  }

  /* =====================================================================
     RESERVAS
     ===================================================================== */
  function viewReservas(c) {
    const rows = DB.salas.map(sala => {
      const cells = DB.horas.map((h, i) => {
        const ev = DB.reservas[sala][i];
        return ev ? `<div class="slot busy"><div class="ev">${ev}</div></div>`
                  : `<div class="slot" data-action="reservar-slot" data-sala="${sala}" data-h="${i}" title="Reservar ${sala} · ${h}"></div>`;
      }).join("");
      return `<div class="th">${sala}</div>${cells}`;
    }).join("");
    c.innerHTML = `
      <div class="row-between mb-2 wrap">
        <div class="seg"><button class="active">Hoy · 19 jul</button><button>Semana</button></div>
        <span class="badge badge-info">${ic("calendar")} Calendario unificado · sin dobles reservas</span>
      </div>
      <div class="card"><div class="card-body">
        <div class="cal">
          <div class="ch">Sala / Hora</div>${DB.horas.map(h => `<div class="ch" style="grid-column:auto">${h}</div>`).join("").replace(/grid-column:auto/g,"")}
          ${rows}
        </div>
        <p class="muted mt-2" style="font-size:.8rem">Haz clic en un espacio libre para reservarlo. Las celdas coloreadas ya están ocupadas.</p>
      </div></div>`;
    // Ajuste: la primera fila de horas necesita 5 columnas; reconstruimos encabezado correctamente
    fixCalHeader();
  }
  function fixCalHeader() {
    // El grid tiene 6 columnas (1 etiqueta + 5 horas visibles). Recortamos a 5 horas para encajar.
  }

  /* =====================================================================
     ADQUISICIONES Y SUSCRIPCIONES
     ===================================================================== */
  function viewAdquisiciones(c) {
    const badge = e => e === "Recibida" ? "badge-success" : e === "En tránsito" ? "badge-info" : e === "Aprobada" ? "badge-warning" : "badge-muted";
    const sbadge = e => e === "Vigente" ? "badge-success" : e === "Por vencer" ? "badge-warning" : "badge-danger";
    c.innerHTML = `
    <div class="grid grid-2">
      <div class="card">
        <div class="card-head"><h3>Órdenes de adquisición</h3><button class="btn btn-sm btn-primary" data-action="toast-demo">${ic("plus")} Nueva orden</button></div>
        <div class="card-body" style="padding-top:6px"><div class="table-wrap"><table class="tbl">
          <thead><tr><th>Orden</th><th>Título</th><th>Cant.</th><th>Proveedor</th><th>Estado</th></tr></thead>
          <tbody>${DB.adquisiciones.map(a => `<tr>
            <td class="b">${a.id}</td><td>${a.titulo}</td><td>${a.cant}</td><td>${a.proveedor}</td>
            <td><span class="badge ${badge(a.estado)}">${a.estado}</span></td></tr>`).join("")}
          </tbody></table></div></div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Suscripciones a bases de datos</h3></div>
        <div class="card-body">
          ${DB.suscripciones.map(s => `<div class="list-item">
            <div class="ico" style="width:38px;height:38px;border-radius:8px;background:var(--brand-050);color:var(--brand-600);display:flex;align-items:center;justify-content:center">${ic("database")}</div>
            <div class="grow"><div class="b" style="font-size:.9rem">${s.nombre}</div><div class="muted" style="font-size:.76rem">${s.proveedor} · ${s.costo}</div></div>
            <div style="text-align:right"><span class="badge ${sbadge(s.estado)}">${s.estado}</span><div class="muted" style="font-size:.72rem;margin-top:3px">vence en ${s.dias}d</div></div>
          </div>`).join("")}
          <div class="alert warn mt-2">${ic("alert")}<div><div class="t">2 suscripciones requieren atención</div><div class="d">El sistema envía alertas automáticas de renovación 30 días antes del vencimiento.</div></div></div>
        </div>
      </div>
    </div>`;
  }

  /* =====================================================================
     REPORTES (MIS / DSS)
     ===================================================================== */
  function viewReportes(c) {
    const s = DB.satisfaccion, totalStars = s.dist.reduce((a, b) => a + b, 0);
    c.innerHTML = `
    <div class="row-between mb-2 wrap">
      <span class="badge badge-info">${ic("chart")} Capa analítica · soporte a decisiones (DSS)</span>
      <div class="row">
        <button class="btn btn-ghost btn-sm" data-action="toast-demo">${ic("download")} Exportar PDF</button>
        <button class="btn btn-ghost btn-sm" data-action="toast-demo">${ic("download")} Exportar Excel</button>
      </div>
    </div>
    <div class="grid g-2-1">
      <div class="card"><div class="card-head"><h3>Préstamos por mes</h3></div><div class="card-body">${Charts.line(DB.usoMensual)}</div></div>
      <div class="card"><div class="card-head"><h3>Satisfacción del usuario</h3></div><div class="card-body center">
        <div style="font-size:2.6rem;font-weight:800;color:var(--brand-700)">${s.promedio}<span style="font-size:1rem;color:var(--muted)">/5</span></div>
        <div style="color:var(--accent);font-size:1.1rem">${"★".repeat(Math.round(s.promedio))}${"☆".repeat(5 - Math.round(s.promedio))}</div>
        <div class="muted" style="font-size:.8rem">${s.respuestas} encuestas digitales</div>
        <div class="hbars mt-2" style="text-align:left">
          ${[5,4,3,2,1].map(n => { const v = s.dist[n-1]; return `<div class="hbar"><div class="row"><span class="nm">${n} ★</span><span class="vv">${v}</span></div><div class="bar-track"><div class="bar-fill" style="width:${(v/totalStars*100).toFixed(0)}%;background:var(--accent)"></div></div></div>`; }).join("")}
        </div>
      </div></div>
    </div>
    <div class="grid grid-2 mt-3">
      <div class="card"><div class="card-head"><h3>Libros más consultados</h3></div><div class="card-body">${Charts.hbars(DB.topLibros)}</div></div>
      <div class="card"><div class="card-head"><h3>Ocupación de salas</h3></div><div class="card-body">${Charts.vbars(DB.ocupacionSalas)}</div></div>
    </div>
    <div class="grid grid-3 mt-3">
      <div class="card kpi"><div class="lbl">Tasa de morosidad</div><div class="val" style="color:var(--danger)">3,5%</div><div class="muted" style="font-size:.78rem">37 de 1.043 préstamos</div></div>
      <div class="card kpi"><div class="lbl">Rotación de acervo</div><div class="val">2,8×</div><div class="muted" style="font-size:.78rem">préstamos/ejemplar al año</div></div>
      <div class="card kpi"><div class="lbl">Costo suscripciones</div><div class="val">USD 55,5k</div><div class="muted" style="font-size:.78rem">anual · 4 proveedores</div></div>
    </div>`;
  }

  /* =====================================================================
     PORTAL USUARIO
     ===================================================================== */
  function viewPortal(c) {
    const mis = DB.prestamos.filter(p => p.usuarioId === "V-27.845.112" || state.roleKey !== "usuario");
    c.innerHTML = `
    <div class="grid grid-3 mb-2">
      ${kpiCard("bookopen","#2a5a9e", mis.filter(p=>p.estado!=="Devuelto").length, "Préstamos activos")}
      ${kpiCard("alert","#c0392b", mis.filter(p=>p.estado==="En mora").length, "En mora")}
      ${kpiCard("card","#e08a1e", "0", "Multas pendientes")}
    </div>
    <div class="card">
      <div class="card-head"><h3>${state.roleKey === "usuario" ? "Mis préstamos" : "Préstamos activos"}</h3></div>
      <div class="card-body" style="padding-top:6px"><div class="table-wrap"><table class="tbl">
        <thead><tr><th>Préstamo</th><th>Ejemplar</th>${state.roleKey!=="usuario"?"<th>Usuario</th>":""}<th>Desde</th><th>Vence</th><th>Estado</th><th></th></tr></thead>
        <tbody>${mis.map(p => `<tr>
          <td class="b">${p.id}</td><td>${p.libro}</td>${state.roleKey!=="usuario"?`<td>${p.usuario}</td>`:""}<td>${p.desde}</td><td>${p.vence}</td>
          <td>${p.estado==="En mora"?`<span class="badge badge-danger">En mora</span>`:`<span class="badge badge-success">Activo</span>`}</td>
          <td><button class="btn btn-sm btn-ghost" data-action="renovar" data-id="${p.id}">${ic("refresh")} Renovar</button></td>
        </tr>`).join("")}</tbody></table></div></div>
    </div>`;
  }

  /* =====================================================================
     ADMIN
     ===================================================================== */
  function viewAdmin(c) {
    c.innerHTML = `
    <div class="grid grid-2">
      <div class="card">
        <div class="card-head"><h3>Usuarios del sistema</h3><button class="btn btn-sm btn-primary" data-action="toast-demo">${ic("plus")} Nuevo usuario</button></div>
        <div class="card-body" style="padding-top:6px"><div class="table-wrap"><table class="tbl">
          <thead><tr><th>Cédula/Carnet</th><th>Nombre</th><th>Tipo</th><th>Estado</th></tr></thead>
          <tbody>${DB.usuarios.map(u => `<tr><td class="b">${u.id}</td><td>${u.nombre}</td><td>${u.tipo}</td>
            <td>${u.estado==="Habilitado"?`<span class="badge badge-success">Habilitado</span>`:`<span class="badge badge-danger">${u.estado}</span>`}</td></tr>`).join("")}
          </tbody></table></div></div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Políticas de préstamo</h3></div>
        <div class="card-body">
          <div class="table-wrap"><table class="tbl">
            <thead><tr><th>Tipo de usuario</th><th>Máx. préstamos</th><th>Días</th><th>Multa/día</th></tr></thead>
            <tbody>
              <tr><td class="b">Estudiante</td><td>3</td><td>14</td><td>Bs. 5.000</td></tr>
              <tr><td class="b">Profesor</td><td>6</td><td>21</td><td>Bs. 5.000</td></tr>
              <tr><td class="b">Personal</td><td>4</td><td>14</td><td>Bs. 5.000</td></tr>
            </tbody></table></div>
          <div class="alert info mt-2">${ic("settings")}<div><div class="t">Roles y permisos</div><div class="d">Cada rol (lector, bibliotecario, supervisor, director) ve solo los módulos autorizados. Toda operación queda en la bitácora de auditoría.</div></div></div>
        </div>
      </div>
    </div>`;
  }

  /* =====================================================================
     ROUTER + ACCIONES
     ===================================================================== */
  function defaultView() {
    return DB.roles[state.roleKey].nav[0];
  }
  function go(view) {
    if (!DB.roles[state.roleKey].nav.includes(view)) view = defaultView();
    state.view = view;
    if (location.hash !== "#/" + view) { location.hash = "#/" + view; return; } // hashchange re-render
    renderShell(view);
  }

  function route() {
    if (!state.roleKey) { renderLogin(); return; }
    const v = (location.hash || "").replace("#/", "") || defaultView();
    state.view = DB.roles[state.roleKey].nav.includes(v) ? v : defaultView();
    renderShell(state.view);
  }
  window.addEventListener("hashchange", route);

  /* --------------------------- Delegación de clicks --------------------------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-action]");
    if (e.target.closest("[data-close-backdrop]") && !e.target.closest(".modal")) { closeModal(); return; }
    if (!t) return;
    const a = t.dataset.action;
    const id = t.dataset.id;

    switch (a) {
      case "pick-role":
        state.selectedRole = t.dataset.role;
        document.querySelectorAll(".role-opt").forEach(o => o.classList.toggle("active", o.dataset.role === state.selectedRole));
        break;
      case "login-go":
        state.roleKey = state.selectedRole;
        try { sessionStorage.setItem("sigib_role", state.roleKey); } catch (e) {}
        location.hash = "#/" + defaultView();
        route();
        toast("Sesión iniciada como " + DB.roles[state.roleKey].rol, "ok");
        break;
      case "logout":
        state.roleKey = null; state.wizard = null; state.ret = null; location.hash = "";
        try { sessionStorage.removeItem("sigib_role"); } catch (e) {}
        renderLogin();
        break;
      case "nav": go(t.dataset.view); break;
      case "toggle-menu": document.getElementById("sidebar").classList.toggle("open"); break;
      case "notif": toast("3 notificaciones: 37 préstamos en mora, IEEE Xplore por vencer, OC-4471 en tránsito", "warn", "bell"); break;
      case "global-search": break;

      /* catálogo */
      case "open-book": openBook(id); break;
      case "close-modal": closeModal(); break;
      case "cat-fmt":
        state.catFilter.fmt = t.dataset.fmt;
        document.querySelectorAll('[data-action="cat-fmt"]').forEach(b => b.classList.toggle("active", b.dataset.fmt === state.catFilter.fmt));
        renderCatalogGrid(); break;
      case "new-book": toast("Formulario de catalogación (RF-02) — demostración", "ok", "plus"); break;
      case "reservar-libro":
        closeModal(); toast("Reserva registrada en la cola de espera. Se notificará al estar disponible.", "ok", "clock"); break;
      case "prestar-from-catalog":
        closeModal(); startWizard(id); go("prestamo"); break;

      /* wizard préstamo */
      case "pick-user": {
        state.wizard.user = DB.usuarios.find(u => u.id === id);
        renderView("prestamo"); break;
      }
      case "wiz-next-1": state.wizard.step = 2; renderView("prestamo"); break;
      case "pick-book": state.wizard.book = DB.books.find(b => b.id === id); renderView("prestamo"); break;
      case "wiz-back-2": state.wizard.step = 1; renderView("prestamo"); break;
      case "wiz-next-2": state.wizard.step = 3; renderView("prestamo"); break;
      case "wiz-back-3": state.wizard.step = 2; renderView("prestamo"); break;
      case "wiz-confirm": {
        const w = state.wizard, b = w.book;
        w.folio = "P-" + (10250 + Math.floor((Date.parse("2026-07-19") % 40)));
        if (b.fmt !== "Digital" && b.disponibles > 0) b.disponibles -= 1;
        w.user.activos += 1;
        w.step = 4; renderView("prestamo");
        toast("Préstamo " + w.folio + " registrado · inventario actualizado", "ok");
        break;
      }
      case "wiz-new": startWizard(); renderView("prestamo"); break;
      case "wiz-reset": startWizard(); renderView("prestamo"); break;
      case "print-receipt": toast("Comprobante enviado a impresión / PDF", "ok", "download"); break;

      /* devolución */
      case "ret-pick": state.ret.loan = DB.prestamos.find(p => p.id === id); showReturnDetail(state.ret.loan); break;
      case "ret-cancel": state.ret.loan = null; document.getElementById("ret-detail").innerHTML = ""; break;
      case "ret-confirm": {
        const p = DB.prestamos.find(x => x.id === id);
        const multa = Number(t.dataset.multa);
        if (p) { p.estado = "Devuelto"; const b = DB.books.find(x => x.id === p.libroId); if (b && b.fmt !== "Digital") b.disponibles += 1; }
        state.ret.loan = null;
        toast(multa > 0 ? "Devolución registrada · multa " + money(multa) + " generada" : "Devolución registrada · sin multa", multa > 0 ? "warn" : "ok");
        renderView("devolucion");
        break;
      }

      /* reservas */
      case "reservar-slot": {
        const sala = t.dataset.sala, h = t.dataset.h;
        modal(`<div class="modal"><div class="modal-head"><h3>Reservar espacio</h3><button class="icon-btn" data-action="close-modal">${ic("x")}</button></div>
          <div class="modal-body">
            <p><b>${sala}</b> · ${DB.horas[h]} · hoy 19 jul</p>
            <div class="field"><label>Motivo</label><input class="input" placeholder="Estudio grupal, tesis, reunión…"></div>
            <div class="field"><label>Duración</label><select class="select"><option>1 hora</option><option>2 horas</option></select></div>
          </div>
          <div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
          <button class="btn btn-primary" data-action="reservar-confirm" data-sala="${sala}" data-h="${h}">Confirmar reserva</button></div></div>`);
        break;
      }
      case "reservar-confirm": {
        const sala = t.dataset.sala, h = Number(t.dataset.h);
        DB.reservas[sala][h] = "Reservado";
        closeModal(); renderView("reservas");
        toast("Reserva confirmada: " + sala + " · " + DB.horas[h], "ok", "calendar");
        break;
      }

      /* varios */
      case "renovar": toast("Préstamo " + id + " renovado por 14 días más", "ok", "refresh"); break;
      case "toast-demo": toast("Acción de demostración ejecutada", "ok"); break;
    }
  });

  /* Reajuste del calendario: usar solo 5 horas visibles para encajar en 6 columnas */
  DB.horas = DB.horas.slice(0, 5);

  /* --------------------------------- Init --------------------------------- */
  try { const r = sessionStorage.getItem("sigib_role"); if (r && DB.roles[r]) state.roleKey = r; } catch (e) {}
  route();
})();
