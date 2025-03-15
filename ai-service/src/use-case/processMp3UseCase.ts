import { AwsClient } from "../infrastructure/aws/awsClient";
import { KkyClient } from "../infrastructure/kky/kkyClient";

export class ProcessMp3UseCase {
  constructor(
    private kkyClient: KkyClient,
    private awsClient: AwsClient
  ) {}

  /**
   * Provede zpracování mp3 souboru.
   * 1. Stáhne soubor z bucketu.
   * 2. Odešle soubor na KKY API pro převod řeči na text.
   * 3. Odešle text na AWS pro úpravu a shrnutí.
   *
   * @param bucketPath Cesta ve tvaru "bucketName/key/to/file.mp3".
   * @returns Shrnutí zpracovaného textu.
   */
  async execute(bucketPath: string): Promise<string> {
    const audioFileBuffer = await this.awsClient.downloadFile(bucketPath);
    const text = await this.kkyClient.speechToText(audioFileBuffer);
    const summary = await this.awsClient.summarizeText(text);
    return summary;
  }
}
