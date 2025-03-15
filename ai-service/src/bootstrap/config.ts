import  Config  from "../domain/config.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";
import { readFile } from "fs/promises";

// Nahrazení __dirname v ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getEnv(envType: string): Promise<void> {
  const envPath = resolve(__dirname, "../../.env");
  dotenv.config({ path: envPath });
}

async function newConfig(envType: string): Promise<Config> {
  await getEnv(envType);

  const configPath = resolve(__dirname, "../../src/config/config.dev.json");

  try {
    // Načtení souboru asynchronně
    const fileContent = await readFile(configPath, "utf-8");
    const config: Config = JSON.parse(fileContent);

    // Přiřazení environment proměnných do konfigurace
    config.aws.account.username = process.env.AWS_ACCOUNT_USERNAME || "";
    config.aws.account.accessKeyId = process.env.AWS_ACCOUNT_ACCESS_KEY_ID || "";
    config.aws.account.secretAccessKey = process.env.AWS_ACCOUNT_SECRET_ACCESS_KEY || "";
    config.aws.bucket.name = process.env.AWS_BUCKET_NAME || "";
    
    config.kky.username = process.env.KKY_USERNAME || "";
    config.kky.password = process.env.KKY_PASSWORD || "";

    console.log(`✅ Konfigurace načtena: ${JSON.stringify(config, null, 2)}`);

    return config;
  } catch (error) {
    console.error(`❌ Chyba při načítání konfigurace: ${error}`);
    throw error;
  }
}

export default newConfig;
