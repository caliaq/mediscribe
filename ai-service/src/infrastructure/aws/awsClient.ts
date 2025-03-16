import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";
import Config from "../../domain/config";

export class AwsClient {
  private s3Client: S3Client;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.s3Client = new S3Client({
      region: this.config.aws.account.region,
      credentials: {
        accessKeyId: this.config.aws.account.accessKeyId,
        secretAccessKey: this.config.aws.account.secretAccessKey,
      },
    });
<<<<<<< HEAD

    this.bucketName = AWS_BUCKET_NAME;
  }

  // private extractKeyFromPath(bucketPath: string | undefined): string {
  //   if (!bucketPath) {
  //     throw new Error("Invalid bucketPath: undefined or empty");
  //   }
  //   return bucketPath.replace(/^s3:\/\/[^/]+\//, "").replace(/^https:\/\/[^/]+\//, "");
  // }
=======
  }
>>>>>>> master

  async getFile(bucketPath: string | undefined): Promise<Buffer> {
    if (!bucketPath) {
      throw new Error("Invalid bucketPath: undefined or empty");
    }
<<<<<<< HEAD
    
    // const key = this.extractKeyFromPath(bucketPath);
    // if (!key) {
    //   throw new Error("Extracted key is empty after processing bucketPath");
    // }

    try {
      const response = await this.s3Client.send(new GetObjectCommand({
        Bucket: "mediscribe-bucket",
        Key: bucketPath,
      }));
=======

    try {
      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: this.config.aws.bucket.name,
          Key: bucketPath,
        })
      );
>>>>>>> master

      if (!response.Body) {
        throw new Error("Invalid response body from AWS S3.");
      }

      return this.streamToBuffer(response.Body as Readable);
    } catch (error) {
      throw new Error(`AWS S3 getFile error: ${error}`);
    }
  }

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
    });
  }
}
