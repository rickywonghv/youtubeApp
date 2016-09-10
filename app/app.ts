import {Component, provide} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, BackgroundMode} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {AppService} from "./service/home.service";
import {playerService} from "./service/player";
BackgroundMode.setDefaults();
BackgroundMode.enable();

@Component({
  templateUrl: 'build/menu.html'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }
}

ionicBootstrap(MyApp,[playerService]);
