/**
 * Created by Damon on 7/9/16.
 */
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AppService {
  //'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&safeSearch=moderate&type=video&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM&q='
  //&maxResults=50&safeSearch=moderate&type=video&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM&q=
  //+"&maxResults="+this.maxResults
  constructor (private http: Http) {}
  private url = 'https://www.googleapis.com/youtube/v3/search?part=snippet';  // URL to web API
  private maxResults=50;
  private searchType="video";
  private apikey="AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM";
  private regionCode="HK";

  public getSearch (key){
    return this.http.get(this.url+"&maxResults=20&safeSearch=moderate&type="+this.searchType+"&key="+this.apikey+"&q="+key+"%7C"+"&regionCode="+this.regionCode);
  }

  public page(pageTk:string,keyword:string){
    let pageUrl=this.url+"&key="+this.apikey+"&maxResults=20&safeSearch=moderate&type=video&pageToken="+pageTk+"&q="+keyword+"%7C"+"&regionCode="+this.regionCode;
    return this.http.get(pageUrl);
  }

  public edmondponLive(){
    let pageUrl=this.url+"&key="+this.apikey+"&maxResults=20&safeSearch=moderate&type=channel&&q=EdmondPoon%7C"+"&regionCode="+this.regionCode;
    return this.http.get(pageUrl);
  }
}
