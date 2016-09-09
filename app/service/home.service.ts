/**
 * Created by Damon on 7/9/16.
 */
import { Injectable }     from '@angular/core';
import {Http, Response, RequestOptions, Headers,Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  //'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&safeSearch=moderate&type=video&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM&q='
  //&maxResults=50&safeSearch=moderate&type=video&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM&q=
  //+"&maxResults="+this.maxResults
  constructor (private http: Http,private jsonp:Jsonp) {}
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
    return this.jsonp.request(pageUrl);
  }

  public edmondponLive(){
    let pageUrl=this.url+"&key="+this.apikey+"&maxResults=20&safeSearch=moderate&type=channel&&q=EdmondPoon%7C"+"&regionCode="+this.regionCode;
    return this.http.get(pageUrl);
  }

  public ourradioDigi(){
    let url="http://rss2json.com/api.json?rss_url=http://feeds.feedburner.com/damon/digi?format=xml";
    return this.http.get(url);
  }

  public radioservice(call:string){
    let xmltojson="http://rss2json.com/api.json?rss_url=";
    let digi="http://feeds.feedburner.com/damon/digi?format=xml";
    let hkpug="http://feeds.feedburner.com/damon/hkpug?format=xml";
    let randgad="http://download.randgad.com/feed.xml";
    let url;
    if(call=="hkpug"){
      url=xmltojson+hkpug;
    }else if(call=="digi"){
      url=xmltojson+digi;
    }else if(call=="randgad"){
      url=xmltojson+randgad;
    }
    return this.http.get(url);
  }

}
