import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

import { Settings } from '../../services/settings';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    private form = {}

    constructor(
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        private settings: Settings) {
     
        this.form = this.settings.get();
    }

    ionViewDidLoad() {
        console.log('Settings Page');
    }

    change() {
        this.settings.update(this.form);
    }

    close() {
        this.viewCtrl.dismiss();
    }
}