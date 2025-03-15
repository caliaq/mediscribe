import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

export class AwsClient {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env;

    if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_BUCKET_NAME) {
      throw new Error('AWS environment variables are missing.');
    }

    this.s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = AWS_BUCKET_NAME;
  }

  private extractKeyFromPath(bucketPath: string): string {
    if (!bucketPath) {
      throw new Error("Invalid bucketPath: undefined or empty");
    }
    return bucketPath.replace(/^s3:\/\/[^/]+\//, "").replace(/^https:\/\/[^/]+\//, "");
  }

  async getFile(bucketPath: string): Promise<Buffer> {
    if (!bucketPath) {
      throw new Error("Invalid bucketPath: undefined or empty");
    }
    
    const key = this.extractKeyFromPath(bucketPath);
    if (!key) {
      throw new Error("Extracted key is empty after processing bucketPath");
    }

    const response = await this.s3Client.send(new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    }));

    if (!response.Body || !(response.Body instanceof Readable)) {
      throw new Error("Invalid response body from AWS S3.");
    }

    return this.streamToBuffer(response.Body);
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