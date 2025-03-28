import Config from "../domain/config";
import newConfig from "./config";
import express from "express"; 
import CORS from "cors";
import MainRouter from "./router";
import { KkyClient } from "../infrastructure/kky/kkyClient";
import { AwsClient } from "../infrastructure/aws/awsClient";

class Application {
  public config: Config;
  public app: express.Application = express();
  public kkyClient: KkyClient;

  constructor(envType: string) {
    this.config = newConfig(envType);
    // Inicializace KKY klienta a otestování spojení s KKY API
    this.kkyClient = new KkyClient(this.config);
    this.pingKky()
      .then((message: string) => {
        console.log(message);
      })
      .catch((error: Error) => {
        console.error(error);
      });

    // Inicializace aplikace
    this.app.use(express.json());
    this.app.use(CORS());
  }

  private async pingKky(): Promise<string> {
    try {
      const result = await this.kkyClient.ping();
      return "Connected to KKY API: " + result;
    } catch (error: any) {
      throw new Error("Error connecting to KKY API: " + error.message);
    }
  }

  // Spuštění aplikace
  run() {
    // Předpokládáme, že MainRouter nyní pracuje s awsClient, případně lze předat i kkyClient
    const mainRouter: MainRouter = new MainRouter(this.config);

    this.app.use("/api/v2", mainRouter.run());

    this.app.get("/ping", (req, res) => {
      res.status(200).send("Server is running.");
    });

    this.app.listen(this.config.server.port, this.config.server.host, () => {
      console.log(`Server běží na portu ${this.config.server.port}`);
    });
  }
}

export default Application;
