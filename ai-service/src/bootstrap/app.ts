import Config from '../domain/config';
import newConfig from './config';
import express from 'express';
import CORS from 'cors';
import { ListBucketsCommand } from '@aws-sdk/client-s3';
import MainRouter from './router';
import { KkyClient } from '../infrastructure/kky/kkyClient';
import { AwsClient } from '../infrastructure/aws/awsClient';

class Application {
    public config: Config;
    public app: express.Application = express();
    public awsClient: AwsClient;
    public kkyClient: KkyClient;

    constructor(envType: string) {
        this.config = newConfig(envType);

        // Inicializace AWS klienta a otestování spojení s AWS S3
        this.awsClient = new AwsClient(this.config);
        this.pingAws().then((message: string) => {
            console.log(message);
        }).catch((error: Error) => {
            console.error(error);
        });

        // Inicializace KKY klienta a otestování spojení s KKY API
        this.kkyClient = new KkyClient(this.config);
        this.pingKky().then((message: string) => {
            console.log(message);
        }).catch((error: Error) => {
            console.error(error);
        });
        
        // Inicializace aplikace
        this.app.use(express.json());
        this.app.use(CORS());
    }

    private async pingAws(): Promise<string> {
        try {
            const client = this.awsClient.getClient();
            const command = new ListBucketsCommand({});
            const response = await client.send(command);
            return 'Connected to AWS S3. Buckets: ' + JSON.stringify(response.Buckets);
        } catch (error: any) {
            throw new Error('Error connecting to AWS S3: ' + error.message);
        }
    }

    private async pingKky(): Promise<string> {
        try {
          const result = await this.kkyClient.ping();
          return 'Connected to KKY API: ' + result;
        } catch (error: any) {
          throw new Error('Error connecting to KKY API: ' + error.message);
        }
      }

    // Spuštění aplikace
    run() {
        // Předpokládáme, že MainRouter nyní pracuje s awsClient, případně lze předat i kkyClient
        const mainRouter: MainRouter = new MainRouter(this.config, this.awsClient, this.kkyClient);

        this.app.use('/api/v2', mainRouter.run());

        this.app.listen(this.config.server.port, () => {
            console.log(`Server běží na portu ${this.config.server.port}`);
        });
    }
}

export default Application;
