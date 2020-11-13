import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    ) {}

  async presentLoading(message:string) {
    const loading =  await this.loadingController.create({
      message
    });
    return loading
  }

  async presentToast(message : string, color:string, duration : number) {
    const toast = await this.toastController.create({
      message: message || 'Your settings have been saved.',
      color: color || "primary",
      duration: duration || 2000
    });
    toast.present();
  }

  async presentToastWithOptions(header : string, message : string, position : "top" | "bottom" | "middle", button1 : string, button2 : string) {
    const toast = await this.toastController.create({
      header: header,
      message: message || 'Click to Close',
      position: position || 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: button1 || 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: button2 || 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
