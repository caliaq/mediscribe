import Config from "../domain/config";
import { resolve } from "path";
import * as dotenv from "dotenv";

function getEnv(envType: string) {
  const envPath = resolve(__dirname, `../../.env`);

  dotenv.config({ path: envPath });
}

function newConfig(envType: string): Config {
  getEnv(envType);

  var path = resolve(__dirname, `../../src/config/config.dev.json`);
  var config = require(path);

  if (
    !process.env.AWS_USERNAME ||
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY
  ) {
    throw new Error("AWS environment variables are missing.");
  }

  console.log(process.env.AWS_ACCESS_KEY_ID);
  config.aws.account.username = process.env.AWS_USERNAME;
  config.aws.account.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  config.aws.account.secretAccessKey =
    process.env.AWS_SECRET_ACCESS_KEY;

  if (!process.env.AWS_BUCKET_NAME) {
    throw new Error("AWS_BUCKET_NAME environment variable is missing.");
  }
  config.aws.bucket.name = process.env.AWS_BUCKET_NAME;

  if (!process.env.KKY_USERNAME || !process.env.KKY_PASSWORD) {
    throw new Error("KKY environment variables are missing.");
  }
  config.kky.username = process.env.KKY_USERNAME;
  config.kky.password = process.env.KKY_PASSWORD;

  return config;
}

export default newConfig;
