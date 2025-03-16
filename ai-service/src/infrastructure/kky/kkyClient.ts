import DigestFetch from "digest-fetch";
import Config from "../../domain/config";

export class KkyClient {
  private authClient: DigestFetch;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.authClient = new DigestFetch(
      this.config.kky.username,
      this.config.kky.password
    );
  }

  async ping(): Promise<string> {
    const url = this.config.kky.chatHost;
    const response = await this.authClient.fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Ping error: ${response.status} ${response.statusText}`);
    }
    return "KKY API reachable";
  }

  async speechToText(audioFileBuffer: Buffer): Promise<string> {
    const response = await this.authClient.fetch(this.config.kky.sttUrl, {
      method: "POST",
      body: audioFileBuffer,
    });

    if (!response.ok) {
      throw new Error(
        `STT API error: ${response.status} ${response.statusText}`
      );
    }
    const jsonOutput = await response.text();

    const convResponse = await this.authClient.fetch(
      this.config.kky.sttConvUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: jsonOutput,
      }
    );
    if (!convResponse.ok) {
      throw new Error(
        `STT conversion error: ${convResponse.status} ${convResponse.statusText}`
      );
    }
    return convResponse.text();
  }
}

export default KkyClient;
