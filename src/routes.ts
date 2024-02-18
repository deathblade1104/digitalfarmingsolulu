import { Application } from 'express';
import DFS from './DFS';

export default (app: Application) => {
  DFS(app);
};
