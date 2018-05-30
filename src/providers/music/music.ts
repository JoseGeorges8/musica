import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {map} from "rxjs/operators";


export class Music{

    id: number;

    name: string;

    music_url: string;

    description: string;

    duration: string;

    image: string;

    thumb: string;

    created_by: string;

    file_name_original: string;

    isFavorite: boolean = false;

    constructor(values: Object = {}) {

        Object.assign(this, values);

    }
}

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API: string = "https://orangevalleycaa.org/api/music";
@Injectable()
export class MusicProvider {



  constructor(public http: HttpClient) {
    console.log('Hello MusicProvider Provider');
  }

  getMusic():Observable<any>{
      //with the .get method we send the GET request to our endpoint which will return an endpoint
      //the RxJS map operator to convert the Observable returned
      return this.http.get(API).pipe(
          map(products => {
          return products;
          }));


          // //.catch logs any thrown errors
          // .catch((err) => {
          //     console.error(err);
          // }));
  }

  getOneSong():Observable<any>{
      let oneSongUrl = API + "/qty/1";
      return this.http.get(oneSongUrl).pipe(
          map(products => {
              return products;
          }));
  }

}


