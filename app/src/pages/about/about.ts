import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(public modalCtrl: ModalController, public viewCtrl: ViewController) {
        
    }

    ionViewDidLoad() {
        console.log('About Page');
    }

    close() {
        this.viewCtrl.dismiss();
    }

    created() {
        window.open('https://tuanb.me/', '_blank');     
    }
}