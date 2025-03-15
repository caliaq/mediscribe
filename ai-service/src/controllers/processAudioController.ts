import express, { Request, Response, NextFunction } from 'express';
import Config from '../domain/config';
import { ProcessAudioUseCase } from '../use-case/processAudioUseCase';

export class ProcessController {
  private config: Config;
  private usecase: ProcessAudioUseCase;

  constructor(config: Config) {
    this.config = config;
    this.usecase = new ProcessAudioUseCase(this.config);

    this.process = this.process.bind(this);
  }

  async process(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fileUrl } = req.body;
      const correctedText = await this.usecase.execute(fileUrl);
      res.status(200).json({ correctedText });
    } catch (error) {
      next(error);
    }
  }

  routes(router: express.Router): express.Router {
    router.post('/process', this.process);
    return router;
  }
}

export default ProcessController;