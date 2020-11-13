import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatPage } from 'src/app/pages/materias/chat/chat.page';
import { MuralService } from 'src/app/routes/mural.service';
import { ExecuteService } from 'src/app/services/execute.service';
import { ModalService } from 'src/app/services/modal.service';
import { AddPublicacaoPage } from 'src/app/pages/publicacao/add-publicacao/add-publicacao.page';
import { ViewPublicacaoPageModule } from 'src/app/pages/publicacao/view-publicacao/view-publicacao.module';
import { ViewPublicacaoPage } from 'src/app/pages/publicacao/view-publicacao/view-publicacao.page';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss'],
})
export class MuralComponent implements OnInit {

  @Input() data : any;
  private arquivos : any[];
  private arquivoShow : boolean = false;
  private posts : any[];
  private postShow : boolean = false;

  constructor(
    private execute : ExecuteService,
    private modals : ModalService,
    private modal : ModalController,
    private murals : MuralService
  ) { 
  }

  async ngOnInit() {
    if (this.data == undefined) {
      this.data = this.execute.data;
      console.log(this.data);
    }

    await this.carregar();
  }

  voltar(){
    this.execute.functionExecute('materiasComponent', {});
  }

  visualizar(dados : any){
    this.modals.modalOpen(ViewPublicacaoPage, dados, 'fullscreen-modal');
  }

  publicar(){
    this.modals.modalOpen(AddPublicacaoPage, this.data.id, 'fullscreen-modal');
  }

  async carregar(){
    this.murals.listarArquivos(this.data.id).subscribe(dados => {
      console.log(dados);
      this.arquivos = dados;
    });
    this.murals.listarPublicacoes(this.data.id).subscribe(dados => this.posts = dados);
  }

  editar(){

  }

  remover(){

  }

  async abrirChat(){
    await this.modals.modalOpen(ChatPage, { id: this.data.id, nome: this.data.data.nome }, 'fullscreen-modal')
  }

  showPosts(){
    this.postShow ? this.postShow = false : this.postShow = true;
  }

  showArquivos(){
    this.arquivoShow ? this.arquivoShow = false : this.arquivoShow = true;
  }
}
