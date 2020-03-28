import { Injectable, Component, enableProdMode } from '@angular/core';
import { Device } from '@ionic-native/device';

import { ModalController, ViewController, LoadingController } from 'ionic-angular';

import { Search } from '../../services/search';

import 'rxjs/Rx';

enableProdMode();

@Injectable()
@Component({
    selector: 'page-recent',
    templateUrl: 'recent.html'
})
export class RecentPage {

    private searches = [];
    private loading = null;

    constructor(
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        private search: Search
    )
    {
        let self = this;

        this.searches = self.search.getSearches();

        if (this.searches.length > 0) return;

        this.present();

        this.search.get(null).then(res => {
            self.searches = self.search.getSearches();
            self.dismiss();
        });
        
    }
    
    ionViewDidLoad() {
        console.log('Recent Page');
    }

    present() {
        this.loading = this.loadingCtrl.create({
            content: ''
        });
      
        this.loading.present();
    }
    
    dismiss() {
        let self = this;

        setTimeout(() => {
            self.loading.dismiss();
        }, 100);
    }
    
    close() {
        this.viewCtrl.dismiss();
    }
}
