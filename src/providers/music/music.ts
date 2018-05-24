import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



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

  getMusic():Observable<Music>{
      //with the .get method we send the GET request to our endpoint which will return an endpoint
      return this.http.get(API)
      //the RxJS map operator to convert the Observable returned
          .map(products => {
              return products.map((music) => new Music(music));
          })


          //.catch logs any thrown errors
          .catch((err) => {
              console.error(err);
          });
  }

}


