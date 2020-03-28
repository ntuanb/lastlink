import { Injectable, Component, enableProdMode } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Device } from '@ionic-native/device';

import { Settings } from '../../services/settings';

import 'rxjs/Rx';

enableProdMode();

@Injectable()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    private url = 'https://api.ll.tuanb.me/search';
    private key = '91a74457-a0ef-473c-b6a0-86b9a25229e9';
    private headers = new Headers({ key: this.key });

    public form = {
        lucky: false,
        device: undefined,
        text: ''
    }

    constructor(private http: Http, private settings: Settings) {
    }

    ionViewDidLoad() {
        console.log('Home Page');
    }

    reset() {
        this.form = {
            lucky: false,
            device: undefined,
            text: ''
        }
    }

    submit() {
        var self = this;

        if (Device) this.form.device = Device;

        var lucky = this.form;
        var settings = this.settings.get();

        return this.http
            .post(this.url, this.form, { headers: this.headers })
            .map((res: Response) => res.json())
            .subscribe(function(res) {
                if (res && res.safe) {
                    if (settings.usePreviousAction) {
                        window.open(res.url, '_blank')
                    } else {
                        if (lucky) {
                            window.open(res.url, '_blank')
                        } else {
                            window.open(res.safe, '_blank');     
                        }
                    }
                    
                    self.reset();         
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
    }

    lucky() {
        this.form.lucky = true;
    }

    search() {
        this.form.lucky = false;
    }
}