import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {AppService} from "../../service/home.service";
import {JSONP_PROVIDERS} from '@angular/http';
import {SafeResourceUrl, DomSanitizationService} from "@angular/platform-browser";
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the RadioPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/radio/radio.html',
  providers:[AppService,JSONP_PROVIDERS]
})
export class RadioPage {
  public items;
  public playingRadio;
  public playUrl;
  public itProgramme;
  private selectedPro;
  audio = new Audio();
  currentTime;

  timer;

  constructor(private navCtrl: NavController,private appserivce:AppService,private sanitizer: DomSanitizationService) {
    this.init();
  }
  private init(){
      this.appserivce.radioservice("digi").subscribe(res=>this.listProgramme(res.json()));
      this.selectedPro="數碼生活頻道";
  }
  private listProgramme(result:any){
    this.items=result.items;
  }
  private itProgrammeSel(pro:string){
    this.appserivce.radioservice(pro).subscribe(res=>this.listProgramme(res.json()));
  }
  private playItem(url:string,name:string){
    this.playUrl=url;
    this.playingRadio=name;
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
    this.updateCrt();

  }
  private pause(){
    this.audio.pause();
    this.clearupdateCrt();
  }
  private play() {
    this.audio.play();
    this.updateCrt();
  }
  private updateCrt(){
    this.timer=Observable.interval(500).map((x) => x+1).subscribe((x) => {this.currentTime=this.audio.currentTime});
  }
  private clearupdateCrt(){
    this.timer.unsubscribe();
  }

}
