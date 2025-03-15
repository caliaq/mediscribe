import { AwsClient } from '../infrastructure/aws/awsClient.js';
import { KkyClient } from '../infrastructure/kky/kkyClient.js';
import Config from '../domain/config.js';

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
    try {
      console.log(`🔄 Stahuji soubor z AWS: ${fileUrl}`);
      const audioBuffer = await this.awsClient.getFile(fileUrl);

      if (!audioBuffer || audioBuffer.length === 0) {
        throw new Error(`❌ Chyba: Soubor ${fileUrl} je prázdný nebo neexistuje.`);
      }

      console.log(`✅ Soubor stažen (${audioBuffer.length} bajtů)`);
      
      // Přepis audio souboru na text pomocí KKY
      console.log(`🔄 Přepisuji audio pomocí KKY API`);
      const transcript = await this.kkyClient.speechToText(audioBuffer);
      
      if (!transcript) {
        throw new Error('❌ Chyba: Transkript je prázdný.');
      }

      console.log(`✅ Transkript přijat: ${transcript.substring(0, 50)}...`);

      // Korektura transkriptu pomocí AWS AI
      console.log(`🔄 Korektura textu pomocí AWS AI`);
      const correctedTranscript = await this.awsClient.correctText(transcript);

      if (!correctedTranscript) {
        throw new Error('❌ Chyba: Korekce textu selhala.');
      }

      console.log(`✅ Korekce hotová: ${correctedTranscript.substring(0, 50)}...`);

      return correctedTranscript;
    } catch (error) {
      console.error(`❌ Chyba při zpracování souboru: ${error}`);
      throw error;
    }
  }
}

export default ProcessAudioUseCase;
