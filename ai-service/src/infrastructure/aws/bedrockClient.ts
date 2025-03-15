import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import dotenv from "dotenv";
import Config from "../../domain/config";

dotenv.config();

export class BedrockClient {
  private config: Config;
  private bedrockClient: BedrockRuntimeClient;
  private modelName: string;

  constructor(config: Config) {
    this.config = config;
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
      process.env;
    if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      throw new Error("AWS environment variables are missing.");
    }

    this.bedrockClient = new BedrockRuntimeClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    this.modelName = "Claude3.7";
  }

  async processText(inputText: string): Promise<string> {
    try {
      const params = {
        modelId: this.modelName,
        inputText: `Převeďte následující text do profesionální a lékařsky správné podoby. Opravit všechny chyby způsobené převodem, zachovat původní strukturu a informace, ale zajistit, aby byly použity správné lékařské termíny a místo slovních spojení používejte číslice, pokud je to vhodné. Pokud narazíte na výraz, který není jasný nebo je těžké ho interpretovat, označte ho pomocí <check></check> pro pozdější kontrolu. Text musí být v češtině: ${inputText}`,
        maxTokens: 1000,
        temperature: 0.1,
      };

      const command = new InvokeModelCommand(params);
      const response = await this.bedrockClient.send(command);

      const responseBody = response.body
        ? JSON.parse(new TextDecoder().decode(response.body))
        : "";
      const correctedText = responseBody?.text || "";

      return correctedText.trim();
    } catch (error) {
      throw new Error(`Error invoking model for text correction: ${error}`);
    }
  }
}
