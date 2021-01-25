import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.page.html',
  styleUrls: ['./modal-confirm.page.scss'],
})
export class ModalConfirmPage implements OnInit {

  @Input() data : any;
  constructor(
    private modal : ModalController
  ) { }

  ngOnInit() {
  }

  modalResponse(response : boolean){
    this.modal.dismiss({value: response});
  }

}
