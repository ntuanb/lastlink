import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class Settings {
    private settings = {
        usePreviousAction: null
    }

    constructor(private storage: Storage) {
    }

    get() {
        return this.settings;
    }
    
    update(form) {
        this.settings = form;
        this.save();
    }

    load() {
        this.storage.get('settings').then((res) => {
            if (res) this.settings = res;
        });
    }

    save() {
        this.storage.set('settings', this.settings);
    }
}