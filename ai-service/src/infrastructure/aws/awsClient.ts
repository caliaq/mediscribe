import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { buffer } from "stream/consumers";
import Config from "../../domain/config";

export class AwsClient {
  private client: S3Client;

  constructor(private config: Config) {
    this.client = new S3Client(this.config.aws.account);
  }

  public getClient() {
    return this.client;
  }

  async summarizeText(text: string): Promise<string> {
    return text.slice(0, 100) + '...';
  }

  public async downloadFile(bucketPath: string): Promise<Buffer> {
    const [bucketName, ...keyParts] = bucketPath.split('/');
    const key = keyParts.join('/');
    const command = new GetObjectCommand({
      Bucket: this.config.aws.bucket.name,
      Key: key,
    });
    const response = await this.client.send(command);

    if (!response.Body) {
      throw new Error("Response Body is undefined");
    }

    return await buffer(response.Body as unknown as Readable);
  }
}
