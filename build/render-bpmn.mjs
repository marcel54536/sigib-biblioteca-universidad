// Renderiza el diagrama BPMN (.mmd) a SVG y PNG usando el Chrome del sistema.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const mmdPath = path.join(root, "docs/bpmn/prestamo-devolucion.mmd");
const outSvg = path.join(root, "docs/bpmn/prestamo-devolucion.svg");
const outPng = path.join(root, "docs/bpmn/prestamo-devolucion.png");

const code = fs.readFileSync(mmdPath, "utf8");
const mermaidJs = fs.readFileSync(path.join(__dirname, "node_modules/mermaid/dist/mermaid.min.js"), "utf8");

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{margin:0;background:#fff;font-family:Inter,Arial,sans-serif}#c{padding:24px}</style>
</head><body><div id="c"><pre class="mermaid">${code.replace(/</g,"&lt;")}</pre></div></body></html>`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--font-render-hinting=none"]
});
const page = await browser.newPage();
await page.setViewport({ width: 1700, height: 1200, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "load" });
await page.addScriptTag({ content: mermaidJs });

const svg = await page.evaluate(async () => {
  // eslint-disable-next-line no-undef
  const m = window.mermaid;
  m.initialize({
    startOnLoad: false, theme: "base", securityLevel: "loose", fontFamily: "Inter, Arial, sans-serif",
    themeVariables: {
      primaryColor: "#eef4fb", primaryBorderColor: "#2a5a9e", primaryTextColor: "#14213d",
      lineColor: "#1b4079", fontSize: "15px",
      clusterBkg: "#f8fafc", clusterBorder: "#c8d2e0", tertiaryColor: "#fbead0"
    }
  });
  const el = document.querySelector(".mermaid");
  const { svg } = await m.render("bpmn", el.textContent);
  document.getElementById("c").innerHTML = svg;
  return svg;
});

fs.writeFileSync(outSvg, svg, "utf8");

// Ajustar viewport al tamaño real del SVG y capturar PNG
const box = await page.evaluate(() => {
  const s = document.querySelector("svg");
  const r = s.getBoundingClientRect();
  return { w: Math.ceil(r.width), h: Math.ceil(r.height) };
});
await page.setViewport({ width: box.w + 48, height: box.h + 48, deviceScaleFactor: 2 });
const elh = await page.$("#c");
await elh.screenshot({ path: outPng });

await browser.close();
console.log(`OK · SVG ${(svg.length/1024).toFixed(1)}KB · PNG ${box.w}x${box.h}`);
