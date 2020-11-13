import { Component, OnInit } from '@angular/core';
import { AddPage } from 'src/app/pages/materias/add/add.page';
import { MateriasService } from 'src/app/routes/materias.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { ExecuteService } from 'src/app/services/execute.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
})
export class MateriasComponent implements OnInit {
  private materiasList : any[] = [];
  constructor(
    private emitter : EventEmitterService,
    private modals : ModalService,
    private execute : ExecuteService,
    private materias : MateriasService
  ) { }

  ngOnInit() {
    this.materias.listar().subscribe(data => {
      this.materiasList = data;
    });
  }

  abrirMateria(materia : string){
    this.execute.functionExecute('muralComponent', materia);
  }

  criarMateria(){
    this.modals.modalOpen(AddPage, {}, '');
  }

}
