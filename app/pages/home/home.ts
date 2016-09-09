import {Component} from '@angular/core';
import {NavController, Platform,Storage, LocalStorage} from 'ionic-angular';
import {AppService} from '../../service/home.service';
import {DomSanitizationService, SafeResourceUrl} from "@angular/platform-browser";
import {SettingPage} from "../setting/setting";
import {RadioPage} from "../radio/radio";
import { BackgroundMode } from 'ionic-native';
import {JSONP_PROVIDERS} from '@angular/http';


BackgroundMode.setDefaults();
BackgroundMode.enable();

declare var window: any;

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AppService,SettingPage,RadioPage,JSONP_PROVIDERS]
})
export class HomePage{
  public videoList;
  public videoUrl;
  public playingName;
  private nextPageTk;
  private previousPageTk;
  private searchKey;
  private edmondPoon=false;
  public showImg=false;
  local:Storage=new Storage(LocalStorage);
  searchInput;
  private currentVideoId;
  private currentVidName;

  constructor(public navCtrl: NavController,private appservice:AppService,private sanitizer: DomSanitizationService,private platform: Platform,private setting:SettingPage) {
    this.init();
  }

  private setImg(res){
    if(res&&res=="true"){
      this.showImg=true;
    }else{
      this.showImg=false;
    }
  }

  public goToSettingPage(){
    this.navCtrl.push(SettingPage);
  }
  public goToRadioPage(){
    this.navCtrl.push(RadioPage);
  }

  public listResult(result:any){
    this.videoList=result.items;
    this.nextPageTk=result.nextPageToken;
    this.previousPageTk=result.prevPageToken;
    this.setting.showImg().then(res=>this.setImg(res));
  }

  private init(){
    this.getCurrentSearchKey();
    this.getCurrentVideo();
  }

  public search(key:string){
    this.appservice.getSearch(key).subscribe(res=>this.listResult(res.json()));
    this.searchKey=key;
    this.setCurrentSearchKey(key);
  }

  public playVideo(Id,playingName,autoPlay){
    this.videoUrl=this.url(Id,autoPlay);
    this.playingName=playingName;
    this.playingToast(playingName);
    this.setCurrentVideo(Id,playingName);
  }

  private url(Id,autoPlay):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${Id}?autoplay=${autoPlay}&controls=2&theme=dark&origin=youtube.damonwong.xyz&enablejsapi=1&playsinline=1&playerapiid=ytplayer`);
    //https://www.youtube.com/watch?v=
  }
  private page(pageTk:string,key:string){
    this.appservice.page(pageTk,key).subscribe(res=>this.listResult(res.json()));
  }

  public playingToast(text:string){
    /*
    this.platform.ready().then(() => {
      window.plugins.toast.show(text, "short", "bottom");
    });
    */
  }
  private edmondpoonLive(){
    this.edmondPoon=true;
  }

  private setCurrentVideo(videoId:string,videoName:string){
    this.local.setJson("currentVid",{videoId:videoId,videoName:videoName});
  }

  private setCurrentSearchKey(searchKey:string){
    this.local.set("currentSearch",searchKey);
  }

  private getCurrentVideo(){
    this.local.getJson("currentVid").then(res=>this.setVideo(res));
  }
  private getCurrentSearchKey(){
    this.local.get("currentSearch").then(res=>this.setSearch(res));
  }
  private setSearch(key:string){
    if(key){
      this.search(key);
      this.searchInput=key;
    }else{
      this.search("雲海");
      this.searchInput="雲海";
    }
  }
  private setVideo(result){
    if(result){
      this.playVideo(result.videoId,result.videoName,0);
    }else{
      this.playVideo("QMQbAoTLJX8","Initial",0);
    }
  }
}
