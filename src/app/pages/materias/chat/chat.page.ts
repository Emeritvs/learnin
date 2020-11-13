import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/routes/chat.service';
import { UserService } from 'src/app/routes/user.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @Input() data : any;
  private currentUser : any;
  private messages : any[] = [];
  private input : any;
  constructor(
    private modal : ModalController,
    private modals : ModalService,
    private chats : ChatService,
    private user : UserService
  ) { }

  ngOnInit() {
    this.loadMessages();
    this.loadUser();
  }

  loadUser(){
    this.user.getUserData().then(dados => {
      console.log(dados);
      // user = user.uid;
      // this.currentUser = dados.id;
    })
  }

  loadMessages(){
    this.chats.listar(this.data.id).subscribe(dados => {

      for (let i = 0; i < dados.length; i++) {
        let search = this.messages.some(message =>  message.id === dados[i].id);

        !search ? this.messages.push(dados[i]) : console.log('mensagem já adicionada');
      }
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

  sendMessage(){
    let dadosUser = localStorage.getItem('user');
    dadosUser = JSON.parse(dadosUser);

    let dadosMsg = {
      id: dadosUser['uid'],
      displayName: 'Admin',
      message: this.input,
      createAt: new Date().getTime()
    };

    this.chats.enviar(this.data.id, dadosMsg);
  }

}
