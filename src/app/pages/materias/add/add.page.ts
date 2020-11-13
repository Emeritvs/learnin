import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MateriasService } from 'src/app/routes/materias.service';

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
    private materias : MateriasService
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modal.dismiss();
  }

  criar(){
    this.materias.adicionar(this.materia);
  }


}
