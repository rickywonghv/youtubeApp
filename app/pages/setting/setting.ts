import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from 'app';

/*
  Generated class for the SettingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class SettingPage {

  constructor(private navCtrl: NavController,private myapp:MyApp) {

  }

}