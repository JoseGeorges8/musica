import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Music, MusicProvider} from "../../providers/music/music";
import {StorageHandlerProvider} from "../../providers/storage-handler/storage-handler";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic = [];

  constructor(private storageProvider: StorageHandlerProvider, private musicProvider: MusicProvider, public navCtrl: NavController) {

  }

  ionViewDidLoad(){
      this.musicProvider.getMusic()
          .subscribe((music: any) => this.allMusic = music);

  }

  ionViewDidEnter(){
      for(let i = 0; i <= this.allMusic.length-1; i++){
          this.storageProvider.isFavorite(this.allMusic[i].id).then(isFav => {
            this.allMusic[i].isFavorite = isFav;
          })
      }
  }

  unfavoriteSong(song: Music){
      this.storageProvider.unfavoriteSong(song.id).then(() => {
          song.isFavorite = false;
      });
      console.log(song.isFavorite);
  }

  favoriteSong(song: Music){
      this.storageProvider.favoriteSong(song.id).then(() => {
          song.isFavorite = true;
      });
      console.log(song.isFavorite);
  }

}
