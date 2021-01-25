import { Component, Input, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/routes/auth.service';
import { ChatService } from 'src/app/routes/chat.service';
import { UserService } from 'src/app/routes/user.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @Input() data : any;
  private currentId : any = {};
  private currentUser: any = {};
  private messages : any[] = [];
  private input : any;
  constructor(
    private modal : ModalController,
    private modals : ModalService,
    private chats : ChatService,
    private user : UserService,
    private toaster : ToasterService,
    private auth : AuthService

  ) { }

  ngOnInit() {
    console.warn(this.data);
    this.currentId = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentId);

    if (this.currentId) {
      this.loadUser(this.currentId);
    }
    else {
      this.toaster.presentToast('Falha ao carregar usuário', 'danger', 2000);
      this.auth.SignOut();
    }

    this.loadMessages();
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

  loadMessages(){
    this.chats.listar(this.data.id).subscribe(dados => {

      for (let i = 0; i < dados.length; i++) {
        let search = this.messages.some(message =>  message.id === dados[i].id);

        !search ? this.messages.push(dados[i]) : console.log('mensagem já adicionada');
      }

      // this.messages.sort((a, b) => {
      //   let c = new Date(a.date);
      //   let d = new Date(b.date);
      //   return c-d;
      // });
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

  clickSend(){
    this.sendMessage('click');
  }

  sendMessage(event : any){
    if (this.input.length <= 0) {
      this.toaster.presentToast('Digite uma mensagem para enviar!', 'danger', 2000);
      return false;
    }

    if (event !== 'click') {
      if (event.keyCode != 13) {
        return false;
      }
    }

    let dadosMsg = {
      id: this.currentUser.uid,
      displayName: this.currentUser.displayName,
      message: this.input,
      createAt: new Date().getTime()
    };

    this.chats.enviar(this.data.id, dadosMsg).then(() => this.input = "");
  }

}
