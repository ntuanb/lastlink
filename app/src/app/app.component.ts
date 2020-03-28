import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { Settings } from '../services/settings';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { RecentPage } from '../pages/recent/recent';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage:any = HomePage;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        public modalCtrl: ModalController,
        public settings: Settings,
        private admobFree: AdMobFree
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleBlackOpaque();
            splashScreen.hide();
            this.settings.load();

            const config: AdMobFreeBannerConfig = {
                id: 'ca-app-pub-2068883636620399',
                isTesting: false,
                autoShow: true
            };
            this.admobFree.banner.config(config);
            this.admobFree.banner.prepare()
                .then((res) => {
                    // banner Ad is ready
                    // if we set autoShow to false, 
                    // then we will need to call the show method here
                })
                .catch(e => console.log(e));
        });
    }

    view(page) {
        let modal = null;

        if (page === 'about') modal = this.modalCtrl.create(AboutPage);
        if (page === 'recent') modal = this.modalCtrl.create(RecentPage);
        if (page === 'settings') modal = this.modalCtrl.create(SettingsPage);

        modal.present();
    }
}

