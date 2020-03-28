import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AdMobFree } from '@ionic-native/admob-free';

import { HttpModule } from '@angular/http';

import { Settings } from '../services/settings';
import { Search } from '../services/search';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { RecentPage } from '../pages/recent/recent';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    SettingsPage,
    RecentPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    SettingsPage,
    RecentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Settings,
    Search,
    AdMobFree
  ]
})
export class AppModule {}
