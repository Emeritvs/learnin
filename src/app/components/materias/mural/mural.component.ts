import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ChatPage } from 'src/app/pages/materias/chat/chat.page';
import { MuralService } from 'src/app/routes/mural.service';
import { ExecuteService } from 'src/app/services/execute.service';
import { ModalService } from 'src/app/services/modal.service';
import { AddPublicacaoPage } from 'src/app/pages/publicacao/add-publicacao/add-publicacao.page';
import { AlunosComponent } from '../../alunos/alunos.component';
import { AlunoPage } from 'src/app/pages/aluno/aluno.page';
import { UserService } from 'src/app/routes/user.service';
import { AuthService } from 'src/app/routes/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss'],
})
export class MuralComponent implements OnInit {

  @Input() data : any;
  private currentId : any = {};
  private currentUser: any = {};
  private arquivos : any[];
  private arquivoShow : boolean = false;
  private posts : any[];
  private postShow : boolean = false;
  private alunos : any[];
  private alunoShow : boolean = false;
  private device : string = "desktop";

  constructor(
    private execute : ExecuteService,
    private modals : ModalService,
    private modal : ModalController,
    private murals : MuralService,
    private platform : Platform,
    private user : UserService,
    private auth : AuthService,
    private toaster : ToasterService
  ) { 
  }

  async ngOnInit() {
    this.currentId = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentId);

    if (this.currentId) {
      this.loadUser(this.currentId);
    }
    else {
      this.toaster.presentToast('Falha ao carregar usuário', 'danger', 2000);
      this.auth.SignOut();
    }

    if(this.platform.is('hybrid')){
      this.device = "hybrid";
    }


    if (this.data == undefined) this.data = this.execute.data;
    await this.carregar();
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

  voltar(){
    this.execute.functionExecute('materiasComponent', {});
  }

  visualizar(item : any, tipo : string){
    let css = "";
    if (this.device === 'desktop') css = "fullscreen-modal";

    if (tipo === 'arquivo') {
      this.modals.modalOpen(AddPublicacaoPage, { materia: this.data.id, action: 'view-file', item: item }, css);
    }
    else {
      this.modals.modalOpen(AddPublicacaoPage, { materia: this.data.id, action: 'view-post', item: item }, css);
    }
  }

  alunosAdd(){
    let css = "";
    if (this.device === 'desktop') css = "fullscreen-modal";

    this.modals.modalOpen(AlunosComponent, {action: 'modal', id: this.data.id}, css);
  }

  publicar(){
    let css = "";
    if (this.device === 'desktop') css = "fullscreen-modal";
    this.modals.modalOpen(AddPublicacaoPage, { materia: this.data.id, action: 'add' }, css);
  }

  async carregar(){
    (await this.murals.listarArquivos(this.data.id)).subscribe(dados => this.arquivos = dados);
    (await this.murals.listarPublicacoes(this.data.id)).subscribe(dados => this.posts = dados);
    (await this.murals.listarAlunos(this.data.id)).subscribe(dados => { 
      if (!dados) return false;
      this.alunos = dados;
    });
  }

  editar(){

  }

  remover(){

  }

  visualizarAluno(dados : any){
    let css = "";
    if (this.device === 'desktop') css = "fullscreen-modal";

    this.modals.modalOpen(AlunoPage, dados, css);
  }

  async abrirChat(){
    let css = "";
    if (this.device === 'desktop') css = "fullscreen-modal";
    await this.modals.modalOpen(ChatPage, { id: this.data.id, nome: this.data.data.nome }, css)
  }

  showPosts(){
    this.postShow ? this.postShow = false : this.postShow = true;
  }

  showArquivos(){
    this.arquivoShow ? this.arquivoShow = false : this.arquivoShow = true;
  }

  showAlunos(){
    this.alunoShow ? this.alunoShow = false : this.alunoShow = true;
  }
}
