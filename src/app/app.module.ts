import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule} from "@angular/common/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MusicProvider } from '../providers/music/music';
import { StorageHandlerProvider } from '../providers/storage-handler/storage-handler';
import { IonicStorageModule} from "@ionic/storage";


@NgModule({
  declarations: [
      MyApp,
      HomePage,
      ListPage
  ],
  imports: [
      IonicStorageModule.forRoot(),
      HttpClientModule,
      BrowserModule,
      IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MusicProvider,
    StorageHandlerProvider
  ]
})
export class AppModule {}
