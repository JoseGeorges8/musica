import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import {Music, MusicProvider} from "../../providers/music/music";
import {StorageHandlerProvider} from "../../providers/storage-handler/storage-handler";
import { SocialSharing } from "@ionic-native/social-sharing";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic = [];

  constructor(
      private socialSharing: SocialSharing,
      private actionSheetController: ActionSheetController,
      private loadingController: LoadingController ,
      private storageProvider: StorageHandlerProvider,
      private musicProvider: MusicProvider,
      public navCtrl: NavController) {
  }

  ionViewDidLoad(){
      let allMusicLoadingController = this.loadingController.create({
          content: "Getting Your Music From Server"
      });
      allMusicLoadingController.present();
      this.musicProvider.getMusic()
          .subscribe((music: any) => {
          allMusicLoadingController.dismiss();
          this.allMusic = music
      });
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

  addOneSong(refresher){
      this.musicProvider.getMusic()
          .subscribe((music: any) => {
              this.allMusic.unshift(music[0]);
              refresher.complete();
          });
  }

  shareSong(music){
      let shareSongActionSheet = this.actionSheetController.create({
          title: "Share Song",
          buttons: [
              {
                  text: "Share On Facebook",
                  icon: "logo-facebook",
                  handler: ()=>{
                      this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url)
                  }
              },
              {
                  text: "Share on Twitter",
                  icon: "logo-twitter",
                  handler: ()=>{
                      this.socialSharing.shareViaInstagram(music.name, music.image)
                  }
              },
              {
                  text: "Share",
                  icon: "share",
                  handler: ()=>{
                      this.socialSharing.share(music.name, "", music.image, music.music_url)
                  }
              },
              {
                  text: "Cancel",
                  role: "destructive"
              }
          ]
      });
      shareSongActionSheet.present();
  }

}
