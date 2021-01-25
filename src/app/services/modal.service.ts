import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalConfirmPage } from '../pages/modal-confirm/modal-confirm.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public params : any;
  constructor(
    private modal : ModalController,
  ) { }

  async modalOpen(page : any, props : any, css : string) {
    const modal = await this.modal.create({
      component: page,
      mode: 'ios',
      showBackdrop: true,
      cssClass:`selector-modal ${css}`,
      componentProps: {
        data: props
      }
    });
    modal.onDidDismiss().then((dados) => {
      return dados;
    });

    await modal.present();
  }

  closeModal(){
    this.modal.dismiss();
  }
}
