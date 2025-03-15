import express from 'express';
import Config from '../domain/config';
import { ProcessMp3Request } from '../domain/requests';
import { ProcessMp3Response } from '../domain/responses';
import { ProcessMp3UseCase } from '../use-case/processMp3UseCase';

class ProcessController {
  public config: Config;
  public usecase: ProcessMp3UseCase;

  constructor(config: Config, usecase: ProcessMp3UseCase) {
    this.config = config;
    this.usecase = usecase;
    // Navázání metod na instanci
    this.processFile = this.processFile.bind(this);
  }

  // Endpoint pro zpracování MP3 souboru
  async processFile(req: express.Request, res: express.Response): Promise<void> {
    const input: ProcessMp3Request = req.body;

    if (!input || !input.fileKey) {
      res.status(400).json({ error: "Missing fileKey in request body" });
      return;
    }

    try {
      const summary = await this.usecase.execute(input.fileKey);
      const response: ProcessMp3Response = { summary };
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Registrace endpointů pro tento controller
  routes(router: express.Router, routeString: string): express.Router {
    router.post(routeString + '/process', this.processFile);
    return router;
  }
}

export default ProcessController;
