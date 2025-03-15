import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

export class AwsClient {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env;
    console.log(AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME)
    if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_BUCKET_NAME) {
      throw new Error('AWS environment variables are missing.');
    }

    this.s3Client = new S3Client({
      region: "us-west-2",
      credentials: {
        accessKeyId: "AKIAXREW53MVAB5D3YIV",
        secretAccessKey: "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",
      },
    });

    this.bucketName = AWS_BUCKET_NAME;
  }

  private extractKeyFromPath(bucketPath: string | undefined): string {
    if (!bucketPath) {
      throw new Error("Invalid bucketPath: undefined or empty");
    }
    return bucketPath.replace(/^s3:\/\/[^/]+\//, "").replace(/^https:\/\/[^/]+\//, "");
  }

  async getFile(bucketPath: string | undefined): Promise<Buffer> {
    if (!bucketPath) {
      throw new Error("Invalid bucketPath: undefined or empty");
    }
    
    const key = this.extractKeyFromPath(bucketPath);
    if (!key) {
      throw new Error("Extracted key is empty after processing bucketPath");
    }

    try {
      const response = await this.s3Client.send(new GetObjectCommand({
        Bucket: "mediscribe-bucket",
        Key: key,
      }));

      if (!response.Body) {
        throw new Error("Invalid response body from AWS S3.");
      }

      return this.streamToBuffer(response.Body as Readable);
    } catch (error) {
      throw new Error(`AWS S3 getFile error: ${error}`);
    }
  }

  async correctText(text: string): Promise<string> {
    // Implement actual AWS AI text correction logic here
    return `Corrected text: ${text}`;
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
