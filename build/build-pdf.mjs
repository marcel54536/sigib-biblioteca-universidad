// Genera el PDF formal de la propuesta: portada + TOC + cuerpo, con numeración de páginas.
// Pipeline: Markdown (docs/propuesta.md) -> HTML (pandoc gfm) -> plantilla estilizada -> PDF (Chrome).
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DOCS = path.join(ROOT, "docs");

const REPO_URL = process.env.REPO_URL || "__REPO_URL__";
const PAGES_URL = process.env.PAGES_URL || "__PAGES_URL__";

let md = fs.readFileSync(path.join(DOCS, "propuesta.md"), "utf8");
md = md.split("__REPO_URL__").join(REPO_URL).split("__PAGES_URL__").join(PAGES_URL);

// Extraer portada
const coverMatch = md.match(/<!--COVER-->([\s\S]*?)<!--\/COVER-->/);
let coverMd = coverMatch ? coverMatch[1].trim() : "";
md = md.replace(/<!--COVER-->[\s\S]*?<!--\/COVER-->/, "").trim();

// Para el PDF: quitar el bloque <details> con el código Mermaid (se muestra la imagen).
md = md.replace(/<details>[\s\S]*?<\/details>/g, "");
// Marcadores de salto de página
md = md.replace(/<!--PAGEBREAK-->/g, '\n\n<div class="pagebreak"></div>\n\n');

function pandoc(input) {
  return execFileSync("pandoc", ["-f", "gfm", "-t", "html", "--wrap=none"], { input, encoding: "utf8" });
}
const coverHtml = pandoc(coverMd);
const bodyHtml = pandoc(md);

// Construir TOC-anchors: pandoc ya asigna ids a los encabezados (usados por la Tabla de contenido del documento).

const css = `
  :root{ --brand:#13315c; --brand2:#2a5a9e; --accent:#e08a1e; --ink:#1a2438; --muted:#5b6b82; }
  *{ box-sizing:border-box; }
  body{ font-family:"Helvetica Neue", Arial, "Segoe UI", sans-serif; color:#1a2438; font-size:10.6pt; line-height:1.5; margin:0; }
  h1,h2,h3,h4{ color:#0f2a4d; line-height:1.25; }
  h1{ font-size:19pt; margin:0 0 6pt; }
  h2{ font-size:15pt; margin:20pt 0 8pt; padding-bottom:4pt; border-bottom:2px solid #d7e5f7; }
  h3{ font-size:12.5pt; margin:14pt 0 6pt; color:#13315c; }
  h4{ font-size:11pt; margin:10pt 0 4pt; color:#2a5a9e; }
  p{ margin:0 0 7pt; text-align:justify; }
  ul,ol{ margin:0 0 8pt; padding-left:20pt; }
  li{ margin:2pt 0; }
  strong{ color:#12233d; }
  a{ color:#2a5a9e; text-decoration:none; }
  table{ border-collapse:collapse; width:100%; margin:8pt 0 12pt; font-size:9.6pt; }
  th,td{ border:1px solid #cdd8e8; padding:5pt 7pt; text-align:left; vertical-align:top; }
  th{ background:#eef4fb; color:#12314f; font-weight:700; }
  tr:nth-child(even) td{ background:#f8fafc; }
  blockquote{ margin:8pt 0; padding:8pt 12pt; background:#f3f7fc; border-left:3px solid #2a5a9e; color:#2c3a52; }
  blockquote p{ margin:0; }
  code{ background:#eef1f6; padding:1px 4px; border-radius:3px; font-size:9pt; }
  img{ max-width:100%; height:auto; display:block; margin:8pt auto; border:1px solid #e4e8ef; border-radius:6px; }
  .pagebreak{ page-break-after:always; }
  h2,h3,h4{ page-break-after:avoid; }
  table,img,blockquote{ page-break-inside:avoid; }

  /* Portada */
  .cover{ height:247mm; display:flex; flex-direction:column; justify-content:center; page-break-after:always;
    background:linear-gradient(160deg,#0b2545 0%,#13315c 55%,#1b4079 100%); color:#fff; margin:-14mm -14mm 0; padding:26mm 22mm; }
  .cover h1{ color:#fff; font-size:26pt; line-height:1.15; border:none; }
  .cover h3{ color:#cfe0f5; font-weight:600; margin-top:10pt; }
  .cover p{ color:#e6eefb; }
  .cover table{ color:#eaf1fb; font-size:10pt; margin-top:18pt; }
  .cover th,.cover td{ border:none; border-bottom:1px solid rgba(255,255,255,.16); background:transparent !important; padding:6pt 4pt; color:#eaf1fb; }
  .cover th{ color:#9db8dc; width:32%; font-weight:600; }
  .cover blockquote{ background:rgba(255,255,255,.08); border-left-color:#e08a1e; color:#dfe9f7; margin-top:16pt; font-size:9pt; }
  .cover .kicker{ color:#e08a1e; font-weight:800; letter-spacing:.14em; font-size:10pt; text-transform:uppercase; margin-bottom:6pt; }
  .cover .foot{ margin-top:auto; color:#8fb0da; font-size:9pt; }
  .cover strong{ color:#e7effa; }
  .cover td strong{ color:#ffffff; }
  .cover code{ background:rgba(255,255,255,.14); color:#f2f6fc; }
`;

const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${css}</style></head><body>
<section class="cover">
  <div class="kicker">Propuesta de Proyecto · Sistemas de Información</div>
  ${coverHtml}
  <div class="foot">Documento generado para la asignatura Sistemas de Información · Universidad XXX · Caracas, Venezuela</div>
</section>
${bodyHtml}
</body></html>`;

const tmp = path.join(DOCS, ".propuesta.render.html");
fs.writeFileSync(tmp, html, "utf8");

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--disable-gpu"] });
const page = await browser.newPage();
await page.goto("file://" + tmp, { waitUntil: "networkidle0" });
const outName = "equipo7-8-Proyecto-final-Biblioteca-XXX.pdf";
await page.pdf({
  path: path.join(DOCS, outName),
  format: "A4",
  printBackground: true,
  margin: { top: "14mm", bottom: "16mm", left: "14mm", right: "14mm" },
  displayHeaderFooter: true,
  headerTemplate: "<div></div>",
  footerTemplate: `<div style="width:100%; font-size:8px; color:#8a97ab; padding:0 14mm; display:flex; justify-content:space-between;">
      <span>SIGIB · Propuesta de proyecto · Biblioteca XXX</span>
      <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
    </div>`
});
await browser.close();
if (!process.env.KEEP_HTML) fs.unlinkSync(tmp);
const kb = (fs.statSync(path.join(DOCS, outName)).size / 1024).toFixed(0);
console.log(`PDF generado: docs/${outName} (${kb} KB)`);
