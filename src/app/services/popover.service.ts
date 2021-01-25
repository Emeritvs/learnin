import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(
    private popover : PopoverController
  ) { }

  async presentPopover(page : any, props : any, css : string) {
    const popover = await this.popover.create({
      component: page,
      cssClass: 'my-custom-class',
      translucent: true
    });
    return await popover.present();
  }
}
