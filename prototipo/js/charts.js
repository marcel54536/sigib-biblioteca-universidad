/* =========================================================================
   SIGIB — Utilidades de gráficos (SVG, sin dependencias externas)
   ========================================================================= */
window.Charts = (function () {

  // Gráfico de línea/área (uso mensual)
  function line(data, { w = 640, h = 190, pad = 30, color = "#2a5a9e" } = {}) {
    const max = Math.max(...data.map(d => d.v)) * 1.12;
    const min = 0;
    const iw = w - pad * 2, ih = h - pad * 2;
    const x = i => pad + (iw * i) / (data.length - 1);
    const y = v => pad + ih - (ih * (v - min)) / (max - min);
    const pts = data.map((d, i) => [x(i), y(d.v)]);
    const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = path + ` L ${x(data.length - 1).toFixed(1)} ${(pad + ih).toFixed(1)} L ${pad} ${(pad + ih).toFixed(1)} Z`;
    let grid = "";
    for (let g = 0; g <= 4; g++) {
      const gy = pad + (ih * g) / 4;
      grid += `<line x1="${pad}" y1="${gy}" x2="${w - pad}" y2="${gy}" stroke="#eef1f6" stroke-width="1"/>`;
    }
    const dots = pts.map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"><title>${data[i].m}: ${data[i].v} préstamos</title></circle>`).join("");
    const labels = data.map((d, i) => `<text x="${x(i).toFixed(1)}" y="${h - 8}" font-size="10" fill="#6b768c" text-anchor="middle">${d.m}</text>`).join("");
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" preserveAspectRatio="xMidYMid meet" role="img">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/>
      </linearGradient></defs>
      ${grid}<path d="${area}" fill="url(#lg)"/><path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${labels}
    </svg>`;
  }

  // Donut (uso por facultad)
  function donut(data, { size = 180, thick = 26 } = {}) {
    const total = data.reduce((s, d) => s + d.v, 0);
    const r = (size - thick) / 2, cx = size / 2, cy = size / 2, C = 2 * Math.PI * r;
    let off = 0, arcs = "";
    data.forEach(d => {
      const frac = d.v / total, len = frac * C;
      arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.c}" stroke-width="${thick}"
        stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}"
        transform="rotate(-90 ${cx} ${cy})"><title>${d.t}: ${d.v}%</title></circle>`;
      off += len;
    });
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img">
      ${arcs}
      <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="26" font-weight="800" fill="#14213d">${total}%</text>
      <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="10" fill="#6b768c">del total</text>
    </svg>`;
  }

  // Barras verticales (ocupación de salas)
  function vbars(data, { w = 560, h = 200, pad = 30, color = "#1a7f5a" } = {}) {
    const max = 100;
    const iw = w - pad * 2, ih = h - pad * 2;
    const bw = iw / data.length * 0.55;
    let bars = "", grid = "";
    for (let g = 0; g <= 4; g++) {
      const gy = pad + (ih * g) / 4;
      grid += `<line x1="${pad}" y1="${gy}" x2="${w - pad}" y2="${gy}" stroke="#eef1f6"/>`;
      grid += `<text x="${pad - 6}" y="${gy + 3}" font-size="9" fill="#9aa4b5" text-anchor="end">${100 - g * 25}%</text>`;
    }
    data.forEach((d, i) => {
      const bx = pad + (iw * (i + 0.5)) / data.length - bw / 2;
      const bh = (ih * d.v) / max;
      const by = pad + ih - bh;
      bars += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="${color}" opacity="${0.55 + 0.45 * d.v / 100}"><title>${d.t}: ${d.v}%</title></rect>`;
      bars += `<text x="${(bx + bw / 2).toFixed(1)}" y="${(by - 5).toFixed(1)}" font-size="10" font-weight="700" fill="#14213d" text-anchor="middle">${d.v}%</text>`;
      const short = d.t.replace("Sala ", "").replace("Cubículo", "Cub.");
      bars += `<text x="${(bx + bw / 2).toFixed(1)}" y="${h - 8}" font-size="9" fill="#6b768c" text-anchor="middle">${short}</text>`;
    });
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" preserveAspectRatio="xMidYMid meet" role="img">${grid}${bars}</svg>`;
  }

  // Barras horizontales (top libros) — devuelve HTML, no SVG
  function hbars(data, color = "#2a5a9e") {
    const max = Math.max(...data.map(d => d.v));
    return `<div class="hbars">` + data.map(d => `
      <div class="hbar">
        <div class="row"><span class="nm">${d.t}</span><span class="vv">${d.v}</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${(d.v / max * 100).toFixed(0)}%;background:${color}"></div></div>
      </div>`).join("") + `</div>`;
  }

  return { line, donut, vbars, hbars };
})();
