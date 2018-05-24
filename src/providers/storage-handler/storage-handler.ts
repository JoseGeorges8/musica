import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";

const STORAGE_KEY = 'favouriteSongs';

/*
  Generated class for the StorageHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageHandlerProvider {

  constructor(public storage: Storage) {

  }

  isFavorite(songId){
      return this.getAllFavoriteSongs().then(result => {
          return result && result.indexOf(songId) !== -1;
      });
  }

  favoriteSong(songId){
      return this.getAllFavoriteSongs().then(result => {
          if(result){
              result.push(songId);
              return this.storage.set(STORAGE_KEY, result);
          }else{
              return this.storage.set(STORAGE_KEY, [songId]);
          }
      });
  }

  unfavoriteSong(songId){
      return this.getAllFavoriteSongs().then(result => {
          if(result){
              var index = result.indexOf(songId);
              result.splice(index, 1);
              return this.storage.set(STORAGE_KEY, result);
          }
      });
  }

  getAllFavoriteSongs(){
      return this.storage.get(STORAGE_KEY);
  }

}
