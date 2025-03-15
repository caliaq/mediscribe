import * as express from 'express';
import Config from '../domain/config';
// import ControllerAuth from '../controller/authController';
import { AwsClient } from '../infrastructure/aws/awsClient';
import { KkyClient } from '../infrastructure/kky/kkyClient';
import ProcessController from '../controllers/processController';

class MainRouter {
    public router: express.Router;
    public config: Config;
    public awsClient: AwsClient;
    public kkyCient: KkyClient;

    constructor(config: Config, awsClient: AwsClient, kkyClient: KkyClient) {
        this.router = express.Router();

        this.config = config;
        this.awsClient = awsClient;
        this.kkyCient = kkyClient;
    }

    run() {
        // Initialize the auth controller
        // var authController: ControllerAuth = new ControllerAuth(this.config, this.awsClient);
        var processController: ProcessController = new ProcessController(this.config, this.awsClient);

        // authController.routes(this.router, "");
        return this.router;
    }
 
}

export default MainRouter;