import Config from "../domain/config";
import { resolve } from "path";
import * as dotenv from "dotenv";

function getEnv(envType: string) {
  const envPath = resolve(__dirname, `../../.env`);

  dotenv.config({ path: envPath });
}

function newConfig(envType: string): Config {
  getEnv(envType);

  var path = resolve(__dirname, `../../src/config/config.json`);
  var config = require(path);

  if (
    !process.env.AWS_USERNAME ||
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_BUCKET_NAME ||
    !process.env.AWS_BEDROCK_ARN ||
    !process.env.KKY_USERNAME ||
    !process.env.KKY_PASSWORD
  ) {
    throw new Error("Some of the environment variables are missing.");
  }

  config.aws.account.username = process.env.AWS_USERNAME;
  config.aws.account.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  config.aws.account.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  config.aws.bucket.name = process.env.AWS_BUCKET_NAME;
  config.aws.bedrock.arn = process.env.AWS_BEDROCK_ARN;
  config.kky.username = process.env.KKY_USERNAME;
  config.kky.password = process.env.KKY_PASSWORD;

  return config;
}

export default newConfig;
