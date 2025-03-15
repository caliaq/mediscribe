import { request } from "undici";
import Config from "../../domain/config.js";

export class KkyClient {
  private username: string;
  private password: string;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.username = "hackathon2025";
    this.password = "pheboa4zeesh4Kie";
  }

  /**
   * Pingne API, aby ověřil dostupnost služby.
   */
  async ping(): Promise<string> {
    try {
      const url = this.config.kky.sttUrl; // Používáme STT endpoint pro ping

      const response = await request(url, {
        method: "OPTIONS",
        headers: {
          "Accept": "*/*",
          "User-Agent": "KkyClient/1.0",
        },
      });

      if (response.statusCode === 200) {
        console.log("✅ KKY API je dostupné.");
        return "✅ KKY API reachable";
      } else {
        console.error(`❌ KKY API odpovědělo s kódem ${response.statusCode}`);
        return `❌ KKY API odpovědělo s kódem ${response.statusCode}`;
      }
    } catch (error) {
      console.error("❌ Chyba při připojení k KKY API:", error);
      return "❌ KKY API nedostupné";
    }
  }

  /**
   * Pošle audio soubor na API KKY a vrátí převedený text.
   */
  async speechToText(audioFileBuffer: Buffer): Promise<string> {
    try {
      const url = this.config.kky.sttUrl; // URL pro Speech-to-Text
      const convUrl = this.config.kky.sttConvUrl; // URL pro konverzi do plaintext

      console.log("📤 Odesílám audio k analýze...");

      // ✅ Pošleme audio soubor jako binární data
      const response = await request(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream", // Nebo "audio/mpeg" pokud je MP3
          "Accept": "application/json",
        },
        body: audioFileBuffer,
      });

      // ✅ Ověříme odpověď
      const responseText = await response.body.text();
      if (!response.headers["content-type"]?.includes("application/json")) {
        console.error("❌ Neočekávaná odpověď z STT API:", responseText);
        throw new Error(`❌ API neposlalo JSON! Odpověď: ${responseText}`);
      }

      const sttResponse = JSON.parse(responseText);

      console.log("📤 Odesílám JSON k převodu do textu...");

      // ✅ Pošleme JSON výstup na URL pro převod do textu
      const textResponse = await request(convUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain",
        },
        body: JSON.stringify(sttResponse),
      });

      const finalText = await textResponse.body.text();
      console.log("✅ Výstupní text:", finalText);
      return finalText;
    } catch (error) {
      console.error("❌ Chyba při převodu řeči na text:", error);
      throw error;
    }
  }
}

export default KkyClient;
