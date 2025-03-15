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

  console.log(process.env.AWS_ACCOUNT_ACCESS_KEY_ID)
  config.aws.account.username = process.env.AWS_ACCOUNT_USERNAME;
  config.aws.account.accessKeyId = process.env.AWS_ACCOUNT_ACCESS_KEY_ID;
  config.aws.account.secretAccessKey = process.env.AWS_ACCOUNT_SECRET_ACCESS_KEY;

  config.aws.bucket.name = process.env.AWS_BUCKET_NAME

  config.kky.username = process.env.KKY_USERNAME;
  config.kky.password = process.env.KKY_PASSWORD;

  return config;
}

export default newConfig;
