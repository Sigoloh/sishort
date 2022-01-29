import { Request, Response } from 'express';
import {LinksService} from '../service/LinksService';
export class LinkController{
  async getLink(request: Request, response: Response){
    try{
      const linksService = new LinksService();
      const { alias } = request.params;
      console.log(alias);
      const url = await linksService.getUrl(alias);
      if(url !== 'Not Found'){
        response.set('Access-Control-Allow-Origin', '*');
        response.json({
                status: 'Ok',
                url: url
              });
      }else{
        response.set('Access-Control-Allow-Origin', '*');
        response.sendStatus(404);
      }
      
    } catch (error){
      response.status(500);
      console.log(error);
      throw new Error('Error in the links controller: getLink');
    }
  }

  async createNewLink(request: Request, response: Response): Promise<void>{
    try{
      const linksService = new LinksService();

      const { url, alias } = request.body;

      await linksService.createLink(url, alias);

      response.json({
        status: 'Created',
      });

    } catch (error){
      console.log(error);
      response.sendStatus(500);
      throw new Error('Error in the links controller: createNewLink');
    }
  }
}
