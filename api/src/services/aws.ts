import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION!,
});

const bucketName = process.env.AWS_BUCKET_NAME!;

const addFile = async (filePath: string, data: string) => {
  const base64Data = Buffer.from(data, "base64");

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: filePath,
      Body: base64Data,
    },
  });

  return upload.done();
};

const removeFile = async (filePath: string) => {
  return s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: filePath,
    })
  );
};

const getFile = async (filePath: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: filePath,
    });

    const response = await s3Client.send(command);

    const bodyContents = await streamToBuffer(response.Body);
    return bodyContents;
  } catch (error) {
    console.error("Error getting file from S3:", error);
    throw error;
  }
};

// Helper function to convert stream to buffer
const streamToBuffer = async (stream: any) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};

export default {
  addFile,
  removeFile,
  getFile,
};
