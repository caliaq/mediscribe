type Config = {
  server: {
    port: number;
    host: string;
  };
  aws: {
    account: {
      username: string;
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
    };
    bucket: {
      name: string;
    };
    bedrock: {
      arn: string;
    }
  };
  kky: {
    username: string;
    password: string;
    chatHost: string;
    ttsHost: string;
    sttUrl: string;
    sttConvUrl: string;
  };
  services: {
    apiServicePort: number;
  };
};

export default Config;
