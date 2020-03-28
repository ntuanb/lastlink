import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class Search {
    private searches = []
    
    private url = 'https://api.ll.tuanb.me/search';
    private key = '91a74457-a0ef-473c-b6a0-86b9a25229e9';
    private headers = new Headers({ key: this.key });

    constructor(private http: Http) {
    }

    getSearches() {
        return this.searches;
    }

    get(id) {
        let self = this;

        let http = this.http;
        
        return new Promise(function(resolve, reject) {
            if (self.searches.length > 0) {
                resolve(true);
                return;
            }

            http
                .get(self.url, { headers: self.headers })
                .map((res: Response) => res.json())
                .subscribe(function(res) {
                    self.searches = res.slice(0, 5);
                    resolve(true);
                }, function(err) {
                    if (err) {
                        reject(err);
                    }
                });

        });
        
    }
}