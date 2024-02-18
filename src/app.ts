import express, { Express } from 'express';
import BackendServer from './setupServer';
import dotenv from 'dotenv';



class Application {
  static className = 'Application';

  public async initialize(): Promise<void> {
    dotenv.config();
    //await databaseConnection();
    const app: Express = express();

    const server: BackendServer = new BackendServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
