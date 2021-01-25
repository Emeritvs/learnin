import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MateriasService } from 'src/app/routes/materias.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  private materia = {
    nome : '',
    descricao: ''
  };

  constructor(
    private modal : ModalController,
    private materias : MateriasService,
    private toaster : ToasterService
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modal.dismiss();
  }

  criar(){
    this.materias.adicionar(this.materia).then(() => {
      this.toaster.presentToast('Matéria adicionada com sucesso.', 'success', 2000);
      this.modal.dismiss();
    })
  }


}
