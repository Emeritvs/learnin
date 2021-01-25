import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { AddPage } from 'src/app/pages/materias/add/add.page';
import { ModalConfirmPage } from 'src/app/pages/modal-confirm/modal-confirm.page';
import { AuthService } from 'src/app/routes/auth.service';
import { MateriasService } from 'src/app/routes/materias.service';
import { UserService } from 'src/app/routes/user.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { ExecuteService } from 'src/app/services/execute.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
})
export class MateriasComponent implements OnInit {
  private currentId : any = {};
  private currentUser: any = {};
  private materiasList : any[] = [];
  private device : string = "desktop";
  private gridOptions = {
    materias: "2"
  };

  constructor(
    private emitter : EventEmitterService,
    private modal : ModalController,
    private modals : ModalService,
    private execute : ExecuteService,
    private materias : MateriasService,
    private toaster : ToasterService,
    private platform : Platform,
    private menu: MenuController,
    private user : UserService,
    private auth : AuthService
  ) { }

  ngOnInit() {

    this.currentId = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentId);

    if (this.currentId) {
      this.loadUser(this.currentId);
    }
    else {
      this.toaster.presentToast('Falha ao carregar usuário', 'danger', 2000);
      this.auth.SignOut();
    }

    if (this.platform.is('hybrid')) {
      this.device = "hybrid";

      this.gridOptions = {
        materias: "12"
      };
    }

    this.listarMaterias();
  }

  async loadUser(id : string){
    (await this.user.getUsers()).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          this.currentUser = data[i].data;
          console.error(this.currentUser);
        }
      }
    });
  }

  async openMenu() {
    await this.menu.open();
  }

  listarMaterias(){
    this.materias.listar().subscribe(data => {
      this.materiasList = data;
      console.error(this.materiasList);
    });
  }

  abrirMateria(materia : string){
    console.log(materia);
    this.execute.functionExecute('muralComponent', materia);
  }

  criarMateria(){
    let css = "";
    if (this.device === 'desktop') css = "fullscreen-modal";
    this.modals.modalOpen(AddPage, {}, css);
  }

  async removerMateria(id : string){
    const modal = await this.modal.create({
      component: ModalConfirmPage,
      mode: 'ios',
      showBackdrop: true,
      cssClass: 'alert-modal',
      componentProps: {
        data: 'Deseja excluir esta matéria?'
      }
    });

    modal.onDidDismiss().then(dados => {
      let data = dados.data.value;

      if (data === true) {
        this.materias.apagar(id)
        .then(() => this.toaster.presentToast("Matéria excluída com sucesso!", "success", 2000))
        .catch(err => this.toaster.presentToast(`Falha ao excluir matéria - ${err}`, "danger", 2000));
      }

    });
    await modal.present();
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }  
}
