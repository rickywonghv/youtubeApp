/**
 * Created by Damon on 10/9/16.
 */
import { Injectable }     from '@angular/core';
import {Observable} from "rxjs";
import {Platform} from "ionic-angular";
import { Toast } from 'ionic-native';

@Injectable()
export class playerService {
  public playingRadio:string;
  public audio:any;
  public timer;
  public playUrl;
  public currentTime;
  public durat;
  public isPlaying;

  constructor (private platform: Platform) {
    platform.ready().then(() => {

    })
  }

  public playItem(url:string,name:string){
    if(this.isPlaying){
      this.pause();
      this.audio.pause();
    }else{

    }
    this.playUrl=url;
    this.isPlaying=true;
    this.audio= new Audio;
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
    this.updateCrt();
    if(this.audio.onprogress){
      this.playingRadio="Loading";
    }else{
      this.playingRadio=name;
    }
    this.showToast(name+" is playing","bottom");
    this.durat=this.audio.duration;
  }

  public pause(){
    this.audio.pause();
    this.clearupdateCrt();
  }
  public play() {
    this.audio.play();
    this.updateCrt();
  }
  public updateCrt(){
    this.timer=Observable.interval(500).map((x) => x+1).subscribe((x) => {this.update()});
  }

  public update(){

    this.currentTime=this.audio.currentTime;
    if(this.audio.ended){
      this.showToast("Play ended","bottom");
      this.clearupdateCrt();
    }

  }

  public clearupdateCrt(){
    this.timer.unsubscribe();
  }

  public ff(){
    this.audio.currentTime=this.audio.currentTime+10;
  }
  public rs(){
    if(this.audio.currentTime>10){
      this.audio.currentTime=this.audio.currentTime-10;
    }
  }
  public showToast(msg:string,position:string){
    Toast.show(msg, '5000', position).subscribe(
      toast => {

      }
    );
  }

}
