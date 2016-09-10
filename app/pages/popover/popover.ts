import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {JSONP_PROVIDERS} from "@angular/http";
import {SettingPage} from "../setting/setting";
declare var window: any;

/*
  Generated class for the PopoverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/popover/popover.html',
  providers: [JSONP_PROVIDERS,SettingPage]
})
export class PopoverPage {

  constructor(private navCtrl: NavController,private viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  goToSettingPage(){
      this.navCtrl.push(SettingPage);
  }

}
