import {getMongoRepository} from "typeorm";
import {Link} from "../entity/Links";

export class LinksService{
  private adler32 = require('adler-32');
  async createLink(provided_url: string, alias?: string): Promise<void>{
    try{

      const linkRepository = getMongoRepository(Link);

      const newLink = new Link();

      newLink.url = provided_url;

      newLink.alias = alias
        ? alias
        : this.adler32.str(`${this.adler32.str(provided_url)}${new Date().getTime()}`).toString(16);

      await linkRepository.save(newLink);

    } catch (error){
      console.log(error);
      throw new Error('Error in the links service:  createLink');
    }
  }

  async getUrl(alias_to_search: string): Promise<string>{
    try{
      const linkRepository = await getMongoRepository(Link);

      const linkSearched = await linkRepository.findOne({alias: "cermoo"});

      return linkSearched.url;
    } catch (error){
      throw new Error('Error in the links service: getUrl');
    }
  }
}
