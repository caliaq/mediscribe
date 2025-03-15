import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';

dotenv.config();

export class BedrockClient {
  private bedrockClient: BedrockRuntimeClient;
  private modelName: string;

  constructor() {
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BEDROCK_MODEL_NAME } = process.env;
    if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_BEDROCK_MODEL_NAME) {
      throw new Error("AWS environment variables are missing.");
    }

    this.bedrockClient = new BedrockRuntimeClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    this.modelName = AWS_BEDROCK_MODEL_NAME;
  }

  async processText(inputText: string): Promise<string> {
    try {
      // Parametry pro volání modelu (Claude)
      const params = {
        modelId: this.modelName, // Například 'Claude'
        inputText: inputText, // Odesílání promptu jako text
        maxTokens: 500, // Maximální počet tokenů pro odpověď
        temperature: 0.5, // Ovlivnění kreativity modelu
      };

      // Vytvoření příkazu pro volání modelu
      const command = new InvokeModelCommand(params);
      const response = await this.bedrockClient.send(command);

      // Získání odpovědi modelu, která by měla být v poli `body`
      const responseBody = response.body ? JSON.parse(new TextDecoder().decode(response.body)) : '';
      const correctedText = responseBody?.text || '';

      return correctedText.trim();
    } catch (error) {
      throw new Error(`Error invoking model for text correction: ${error}`);
    }
  }
}
