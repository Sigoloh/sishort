import * as fs from 'fs'
import * as path from 'path'
import {CachedLinks} from '../types/CacheType';
import {Link} from '../entity/Links';

export class LinksProvider{
  private cachePath: string;

  private cachedData: CachedLinks[];

  private removeOldDataFromCache(){
    const clearCache = this.cachedData.filter(element => {
      return element.timestamp - new Date().getTime() > -86400000   
    });
    this.cachedData = clearCache;
    fs.writeFileSync(this.cachePath, JSON.stringify(this.cachedData));
  }

  constructor(){
    this.cachePath = path.resolve('cache', 'LinksCache.json');
    this.cachedData = JSON.parse(
      fs.readFileSync(
        this.cachePath
      ).toString());
    this.removeOldDataFromCache();
  }

  
  
  setLinkInCache( link:Link ): void{
    const newLink = {} as CachedLinks;

    newLink.alias = link.alias;

    newLink.url = link.url;

    newLink.timestamp = new Date().getTime();

    this.cachedData.push(newLink);
    fs.writeFileSync(this.cachePath, JSON.stringify(this.cachedData));
  }

  getLinkInCache( alias: string ): string{
    for(const link of this.cachedData){
      if(link.alias === alias){
        return link.url;
      }
    }
    return '-1';
  }
}

