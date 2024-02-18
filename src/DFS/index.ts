import { Application } from 'express';
import Controller from './controllers/DFS.controller';

const init = (app: Application): void => {
  Controller.init(app);
};

export default init;
