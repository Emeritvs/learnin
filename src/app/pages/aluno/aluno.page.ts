import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/routes/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { PopoverService } from 'src/app/services/popover.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { MateriasPage } from '../materias/materias.page';
import { ModalConfirmPage } from '../modal-confirm/modal-confirm.page';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage implements OnInit {

  @Input() data : any;
  private user : any = {};

  constructor(
    private modals : ModalService,
    private modal : ModalController,
    private toaster : ToasterService,
    private auths : AuthService,
    private popovers : PopoverService
  ) { }

  ngOnInit() {
    if (!this.data) console.error("Falha ao carregar dados");
    console.warn(this.data);
    this.user = this.data;
  }

  async admin(event : any){
    if (event.detail.checked) {
      this.auths.setUserRole(this.data.id, {role: 'admin'}).then(() => {
        this.toaster.presentToast('Administrador adicionado com sucesso', 'success', 2000);
      })

    }
    else {
      this.auths.setUserRole(this.data.id, {role: 'user'}).then(() => {
        this.toaster.presentToast('Administrador removido com sucesso', 'success', 2000);
      })
    }
  }

  materias(){
    this.popovers.presentPopover(MateriasPage, {}, '').then(dados => console.log(dados));
  }

  closeModal(){
    this.modal.dismiss();
  }
}
