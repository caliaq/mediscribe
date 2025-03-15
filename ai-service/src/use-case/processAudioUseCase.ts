import { AwsClient } from '../infrastructure/aws/awsClient';
import { KkyClient } from '../infrastructure/kky/kkyClient';
import Config from '../domain/config';

export class ProcessAudioUseCase {
  private config: Config;
  private awsClient: AwsClient;
  private kkyClient: KkyClient;

  constructor(config: Config) {
    this.config = config;
    this.awsClient = new AwsClient();
    this.kkyClient = new KkyClient(config);
  }

  async execute(fileUrl: string): Promise<string> {
    // Stažení zvukového souboru z AWS
    const audioBuffer = await this.awsClient.getFile(fileUrl);

    console.log(audioBuffer)
    // Přepis audio souboru na text pomocí KKY
    const transcript = await this.kkyClient.speechToText(audioBuffer);


    console.log("transcript: ", transcript)
    // Korektura transkriptu pomocí AWS AI
    const correctedTranscript = await this.awsClient.correctText(transcript);

    console.log(correctedTranscript)
    return correctedTranscript;
  }
}

export default ProcessAudioUseCase;
