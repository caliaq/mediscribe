import express from 'express';
import { ProcessController } from '../controllers/processAudioController.js';
import Config from '../domain/config.js';

class MainRouter {
  public router: express.Router;
  public config: Config;

  constructor(config: Config) {
    this.router = express.Router();
    this.config = config;
  }

  run(): express.Router {
    const processController = new ProcessController(this.config);
    processController.routes(this.router);
    return this.router;
  }
}

export default MainRouter;
