import {Component} from '@angular/core';
import {NavController,Platform} from 'ionic-angular';
import {AppService} from '../../service/home.service';
import {DomSanitizationService, SafeResourceUrl} from "@angular/platform-browser";
import { NativeStorage } from 'ionic-native';
import {SettingPage} from "../setting/setting";
import { BackgroundMode } from 'ionic-native';
BackgroundMode.setDefaults();
BackgroundMode.enable();

declare var window: any;

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AppService]
})
export class HomePage {
  public videoList;
  public videoUrl;
  public playingName;
  private nextPageTk;
  private previousPageTk;
  private searchKey;
  private edmondPoon=false;

  constructor(private navCtrl: NavController,public appservice:AppService,private sanitizer: DomSanitizationService,private platform: Platform) {
    this.init();
    BackgroundMode.setDefaults();
    BackgroundMode.enable();
  }

  goToSettingPage(){
    this.navCtrl.push(SettingPage);
  }

  public listResult(result:any){
    this.videoList=result.items;
    this.nextPageTk=result.nextPageToken;
    this.previousPageTk=result.prevPageToken;

    console.log(result);
  }

  private init(){
    this.search("wan hoi");
    this.playVideo("QMQbAoTLJX8","Initial",0);
  }

  public search(key:string){
    this.appservice.getSearch(key).subscribe(res=>this.listResult(res.json()));
    this.searchKey=key;
  }

  public playVideo(Id,playingName,autoPlay){
    this.videoUrl=this.url(Id,autoPlay);
    this.playingName=playingName;
    this.playingToast(playingName);
    BackgroundMode.enable();
  }

  private url(Id,autoPlay):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${Id}?autoplay=${autoPlay}&controls=2&theme=dark&origin=youtube.damonwong.xyz&enablejsapi=1&playsinline=1&playerapiid=ytplayer`);
    //https://www.youtube.com/watch?v=
  }
  private page(pageTk:string,key:string){
    this.appservice.page(pageTk,key).subscribe(res=>this.listResult(res.json()));
  }

  private playingToast(text:string){
    this.platform.ready().then(() => {
      window.plugins.toast.show(text, "short", "bottom");
    });
  }
  private edmondpoonLive(){
    this.edmondPoon=true;
  }

}
