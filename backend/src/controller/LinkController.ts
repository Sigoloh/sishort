import { Request, Response } from 'express';
import {LinksService} from '../service/LinksService';
export class LinkController{
  async getLink(request: Request, response: Response){
    try{
      const linksService = new LinksService();

      const { alias } = request.params;
      console.log(alias);
      await linksService.getUrl(alias);
      response.sendStatus(200);
    } catch (error){
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
