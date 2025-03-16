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

  constructor(config: Config) {
    this.config = config;

    this.bedrockClient = new BedrockRuntimeClient({
      region: config.aws.account.region,
      credentials: {
        accessKeyId: config.aws.account.accessKeyId,
        secretAccessKey: config.aws.account.secretAccessKey,
      },
    });
  }

  async processText(inputText: string): Promise<string> {
    try {
      const params = {
        modelId: this.config.aws.bedrock.arn,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31", // Version of the Bedrock model
          max_tokens: 200, // The max number of tokens to generate
          top_k: 250, // The top_k parameter for beam search or sampling
          stop_sequences: [], // Optional, add stop sequences if needed
          temperature: 1, // Temperature for randomness in generation
          top_p: 0.999, // Nucleus sampling for randomness
          messages: [
            {
              role: "user", // Role can be "user", "system", "assistant"
              content: [
                {
                  type: "text", // The type of content
                  text: `Převeďte následující text do profesionální a lékařsky správné podoby. Opravit všechny chyby způsobené převodem, zachovat původní strukturu a informace, ale zajistit, aby byly použity správné lékařské termíny a místo slovních spojení používejte číslice, pokud je to vhodné. Pokud narazíte na výraz, který není jasný nebo je těžké ho interpretovat, označte ho pomocí <check></check> pro pozdější kontrolu. Text musí být v češtině: ${inputText}`,
                },
              ],
            },
          ],
        }),
      };

      const command = new InvokeModelCommand(params);
      const response = await this.bedrockClient.send(command);

      const rawResponse = new TextDecoder().decode(response.body);
      const parsedResponse = JSON.parse(rawResponse);
      const correctedMessage = parsedResponse.content[0].text;

      return correctedMessage.trim();
    } catch (error) {
      throw new Error(`Error invoking model for text correction: ${error}`);
    }
  }
}
