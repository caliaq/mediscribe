import Config from "../domain/config.js";
import newConfig from "./config.js";
import express from "express";
import cors from "cors";
import MainRouter from "./router.js";
import { KkyClient } from "../infrastructure/kky/kkyClient.js";
import { AwsClient } from "../infrastructure/aws/awsClient.js";

class Application {
  public config!: Config;
  public app: express.Application;
  public awsClient: AwsClient;
  public kkyClient!: KkyClient;

  private constructor(config: Config) {
    this.config = config;
    this.app = express();
    this.awsClient = new AwsClient();
    this.kkyClient = new KkyClient(this.config);
    this.setupExpress();
  }

  public static async create(envType: string): Promise<Application> {
    const config = await newConfig(envType);
    return new Application(config);
  }

  private async pingKky(): Promise<void> {
    try {
      const result = await this.kkyClient.ping();
      console.log(`✅ Connected to KKY API: ${result}`);
    } catch (error: any) {
      console.error("❌ Error connecting to KKY API:", error);
    }
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  public run(): void {
    const mainRouter: MainRouter = new MainRouter(this.config);
    this.app.use("/ai/api/v2", mainRouter.run());

    this.app.listen(this.config.server.port, () => {
      console.log(`🚀 Server běží na portu ${this.config.server.port}`);
    });

    this.pingKky();
  }
}

export default Application;
