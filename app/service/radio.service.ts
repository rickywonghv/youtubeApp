/**
 * Created by damon on 9/9/16.
 */
import { Injectable }     from '@angular/core';
import {Http,Jsonp} from '@angular/http';

@Injectable()
export class RadioService {
  constructor (private http: Http,private jsonp:Jsonp) {}

  public ourradioDigi(){
    let url="http://rss2json.com/api.json?rss_url=http://feeds.feedburner.com/damon/digi?format=xml";
    return this.http.get(url);
  }
}
