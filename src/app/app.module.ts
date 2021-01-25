import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from './routes/auth.service';
import { FormsModule } from '@angular/forms';
import { AddPageModule } from './pages/materias/add/add.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ChatPageModule } from './pages/materias/chat/chat.module';
import { AddPublicacaoPageModule } from './pages/publicacao/add-publicacao/add-publicacao.module';
import { ModalConfirmPageModule } from './pages/modal-confirm/modal-confirm.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ColorPickerModule,

    //Modals
    AddPageModule,
    AddPublicacaoPageModule,
    ChatPageModule,
    ModalConfirmPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
