import express, { Request, Response, NextFunction } from 'express';
import Config from '../domain/config.js';
import { ProcessAudioUseCase } from '../use-case/processAudioUseCase.js';

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
      const { filePath } = req.body;

      if (!filePath) {
        res.status(400).json({ error: 'filePath is required' });
        return;
      }

      console.log(`🔄 Processing file: ${filePath}`);

      const correctedText = await this.usecase.execute(filePath);

      console.log(`✅ Processed file: ${filePath}`);
      res.status(200).json({ correctedText });
    } catch (error) {
      console.error(`❌ Error processing file: ${error}`);
      next(error);
    }
  }

  routes(router: express.Router): express.Router {
    router.post('/process', this.process);
    return router;
  }
}

export default ProcessController;
