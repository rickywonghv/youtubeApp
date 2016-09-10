import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {AppService} from "../../service/home.service";
import {JSONP_PROVIDERS} from '@angular/http';
import {SafeResourceUrl, DomSanitizationService} from "@angular/platform-browser";
import {secondsToTimePipe} from './time.pipe';
import {playerService} from "../../service/player";
import {BackgroundMode} from "ionic-native";

BackgroundMode.setDefaults();
BackgroundMode.enable();

/*
  Generated class for the RadioPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/radio/radio.html',
  pipes:[secondsToTimePipe],
  providers:[AppService,playerService,JSONP_PROVIDERS]
})


export class RadioPage {
  public items;

  public playingRadio;
  public playUrl;
  public itProgramme;
  private selectedPro;
  //audio = new Audio();
  currentTime;

  timer;

  constructor(private navCtrl: NavController,private appserivce:AppService,private sanitizer: DomSanitizationService,private viewCtrl: ViewController,public player:playerService) {
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
    this.player.playItem(url,name);
  }
}
