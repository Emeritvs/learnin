import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AlunoPage } from 'src/app/pages/aluno/aluno.page';
import { MuralService } from 'src/app/routes/mural.service';
import { UserService } from 'src/app/routes/user.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss'],
})
export class AlunosComponent implements OnInit {

  @Input() data : any;
  private usersList : any[] = [];
  private materiaId : string;
  private device : string = "desktop";
  private userOptions : any = {
    action: 'component',
    device: 'desktop'
  };

  constructor(
    private modals : ModalService,
    private modal : ModalController,
    private murals : MuralService,
    private users : UserService,
    private platform : Platform
  ) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data);
      this.userOptions.action = this.data.action;
      this.materiaId = this.data.id;
    }

    if (this.platform.is('hybrid')) {
      this.device = "hybrid";
    }

    this.list();
  }

  viewAluno(dados : any){
    let css = "";
    if (this.device === 'desktop') css = "fullscreen-modal";
    dados.action = "modal";
    this.modals.modalOpen(AlunoPage, dados, css);
  }

  addAluno(aluno : any){
    const dados = {
      user_id: aluno.id,
      user_name: aluno.data.displayName,
      user_photo: aluno.data.photoURL
    };

    this.murals.adicionarAluno(this.materiaId, dados).then(() => this.alunoMateria(aluno, this.materiaId));
  }

  alunoMateria(aluno : any,  materia : string){
    const usuario = aluno;
    usuario.materias.push(materia);
    this.murals.adicionarMateriaAluno(usuario.id, usuario.materias).then(() => this.modal.dismiss());
  }

  listarAlunosMateria(){

  }

  async list(){
    (await this.users.getUsers()).subscribe(async data => {
      if (this.userOptions.action != 'modal') {
        this.usersList = data;
        return false;
      }

      this.usersList = data;
      (await this.murals.listarAlunos(this.data.id)).subscribe(dados => {
        if (dados.length <= 0) {
          this.usersList = data;
          return false;
        }

        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < dados.length; j++) {
            console.log(dados[j])
            console.log(`${dados[j].data.user_id} - ${data[i].id}`);
            if (dados[j].data.user_id == this.usersList[i].id) {
              this.usersList.splice(i, 1);
            }
          }
        }
      });
    });
  }

  closeModal(){
    this.modal.dismiss();
  }
}
