import axios from 'axios';
import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import { RecommendDTO } from '../DTOs/recommend.dto';
import ClassValidationHelper from '../services/';



class Controllers {

  getLandingPage(req: Request, res: Response){
    res.render('index.ejs');
  }

  getHomePage(req: Request, res: Response){
    res.render('home.ejs');
  }

  // getHealthPage(req: Request, res: Response){
  //   res.render('health.ejs');
  // }

  getCropPage(req: Request, res: Response){
    res.render('crop.ejs', { prediction_text: "" });
  }

  getFertilizerPage(req: Request, res: Response) {
    res.render('fertiliser.ejs',{ prediction_text: "" });
  }

  async getCropRecommendation(req: Request, res: Response, next : NextFunction) : Promise<void> {
    try{
      const reqBody : RecommendDTO = await ClassValidationHelper.validateOrRejectHelper<RecommendDTO>(req.body, RecommendDTO);
      const requestUrl = "https://dfs-mlapi.onrender.com/api/croprecommend";
      const {data} : {data : {payload : string}}= await axios.post(requestUrl, reqBody);
      res.render('crop.ejs', { prediction_text: data.payload.toLocaleUpperCase() });
    }
    catch(err){
      next(err);
    }
  }

  async getFertilizerSuggestion(req: Request, res: Response, next: NextFunction){
    try{
      const requestUrl = "https://dfs-mlapi.onrender.com/api/suggest";
      const {data} : {data : {payload : string}}= await axios.post(requestUrl, req.body);
      res.render('fertiliser.ejs', { prediction_text: data.payload.toLocaleUpperCase() });
    }
    catch(err){
      next(err);
    }

  }

  healthCheck(req: Request, res : Response){
  res.status(200).json({message : "Service is up"});
  }

  public init(app: Application): void {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../../../views'));
    app.use('/static', express.static(path.join(__dirname, '../../../static')));
    app.get('/api',this.healthCheck);
    app.get('/', this.getLandingPage);
    app.get('/landing_page', this.getLandingPage);
    app.get('/home', this.getHomePage);
    //app.get('/health', this.getHealthPage);
    app.get('/crop', this.getCropPage);
    app.get('/fertiliser', this.getFertilizerPage);
    app.post('/recommend', this.getCropRecommendation);
    app.post('/suggest',this.getFertilizerSuggestion);
  }
}

export default new Controllers();
