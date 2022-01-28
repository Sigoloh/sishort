import {getMongoRepository} from "typeorm";
import {Link} from "../entity/Links";
import {LinksProvider} from "../providers/LinksProvider";

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
      const linkProvider = new LinksProvider();

      const linkRepository = await getMongoRepository(Link);
      
      const cached = linkProvider.getLinkInCache(alias_to_search);

      if(cached !== '-1'){
        console.log('Ja existe no cache n tem que buscar');
        return cached;
      } else {
        console.log('N existe no cache, tem que buscar');
        const linkSearched = await linkRepository.findOne({alias: alias_to_search});

        linkProvider.setLinkInCache(linkSearched);

        return linkSearched.url;
      }

    } catch (error){
      console.log(error);
      throw new Error('Error in the links service: getUrl');
    }
  }
}
