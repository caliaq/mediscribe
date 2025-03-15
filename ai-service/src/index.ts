import Application from "./bootstrap/app.js";

// Získání argumentu z příkazové řádky
const args = process.argv.slice(2);
let envType = args[0] || "dev";

(async () => {
  try {
    const app = await Application.create(envType);
    app.run();
  } catch (error) {
    console.error("❌ Chyba při spouštění aplikace:", error);
    process.exit(1);
  }
})();
