// Captura screenshots de las vistas del prototipo para el README/docs.
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:8765/index.html";
const OUT = path.join(root, "docs/assets");
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--force-color-profile=srgb"]
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
async function shot(name) { await sleep(650); await page.screenshot({ path: path.join(OUT, name + ".png") }); console.log("  ✓", name); }

// Inicia sesión con un rol y RECARGA para que la app se reinicialice con ese rol.
async function login(role) {
  await page.goto(BASE, { waitUntil: "load" });
  await page.evaluate(r => sessionStorage.setItem("sigib_role", r), role);
  await page.reload({ waitUntil: "load" });
  await sleep(300);
}
async function view(v) { await page.evaluate(x => { location.hash = "#/" + x; }, v); await sleep(500); }

// 1) Login (sin rol)
await page.goto(BASE, { waitUntil: "load" });
await page.evaluate(() => sessionStorage.removeItem("sigib_role"));
await page.reload({ waitUntil: "load" });
await shot("login");

// Rol director para ver todos los módulos
await login("director");
await view("dashboard");      await shot("dashboard");
await view("catalogo");       await shot("catalogo");
await view("reservas");       await shot("reservas");
await view("adquisiciones");  await shot("adquisiciones");
await view("reportes");       await shot("reportes");

// 7) Préstamo — recorrer el flujo feliz hasta el comprobante
await view("prestamo");
await sleep(300);
await page.type("#w-user", "María", { delay: 25 });
await sleep(450);
await page.click('[data-action="pick-user"]');
await sleep(300);
await page.click('[data-action="wiz-next-1"]');
await sleep(300);
await page.type("#w-book", "Algorithms", { delay: 25 });
await sleep(450);
await page.click('[data-action="pick-book"]');
await sleep(300);
await page.click('[data-action="wiz-next-2"]');
await sleep(300);
await shot("prestamo-validacion");        // Paso 3 · validación de política
await page.click('[data-action="wiz-confirm"]');
await sleep(400);
await shot("prestamo-comprobante");       // Paso 4 · comprobante

// 8) Devolución con mora (préstamo P-10228)
await view("devolucion");
await sleep(400);
await page.evaluate(() => {
  const btns = [...document.querySelectorAll('[data-action="ret-pick"]')];
  const row = btns.find(b => b.closest("tr")?.textContent.includes("P-10228")) || btns[0];
  row?.click();
});
await sleep(400);
await shot("devolucion-mora");

await browser.close();
console.log("Screenshots listos en docs/assets/");
