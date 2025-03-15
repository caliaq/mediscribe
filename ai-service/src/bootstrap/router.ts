import * as express from 'express';
import { ProcessController } from '../controllers/processAudioController';
import Config from '../domain/config';

class MainRouter {
  public router: express.Router;
  public config: Config

  constructor(config: Config) {
    this.router = express.Router();
    this.config = config;
  }

  run() {
    const processController: ProcessController = new ProcessController(this.config);
    processController.routes(this.router);
    return this.router;
  }
}

export default MainRouter;
