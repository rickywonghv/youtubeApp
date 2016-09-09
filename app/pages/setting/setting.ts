import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { Storage, LocalStorage } from 'ionic-angular';

declare var window: any;

/*
  Generated class for the SettingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/setting/setting.html'
})
export class SettingPage {
  public local:Storage=new Storage(LocalStorage);
  public imageSetting;

  constructor(private navCtrl: NavController,private platform: Platform) {
    this.initSetting();
  }

  public initSetting(){
    this.getImgSetting();
  }

  private changeImgSetting(setting){
    this.setImgSetting(setting);
    this.platform.ready().then(() => {
      window.plugins.toast.show("Image setting changed to "+setting, "short", "bottom");
    });
  }

  public getImgSetting(){
    this.local.get("img").then(res=>this.setting(res),error=>console.log(error));
  }
  private setting(result){
    if(result){
      this.imageSetting=result;
    }else{
      this.setImgSetting(false);
      this.imageSetting=false;
    }
  }
  public setImgSetting(setting){
    this.local.set("img",setting);
  }
  public removeImgSetting(){
    this.local.remove("img");
  }

  public showImg(){
    return this.local.get("img");
  }
  private clearHis(){
    this.local.clear();
  }

}
