import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/routes/user.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss'],
})
export class MeusDadosComponent implements OnInit {
  private currentId : string;
  private nameInput : boolean = false;
  private user = {
    displayName: '',
    photoURL: '',
    theme: {
        color1: '',
        color2: '',
        color3: '',
    }
  };
  private downloadURL : any;

  private dark_mode : boolean = false;

  private cor : string;
  private device : string = "desktop";

  constructor(
    private users : UserService,
    private toaster : ToasterService,
    private storage: AngularFireStorage,
    private afa : AngularFireAuth,
    private platform : Platform,
    @Inject(DOCUMENT) private document : Document
  ) { 

  }

  ngOnInit() {
    this.currentId = JSON.parse(localStorage.getItem('user'));
    this.loadUser();

    if (this.platform.is('hybrid')) {
      this.device = "hybrid";
    }
  }

  async loadUser(){
    // (await this.users.getUserDados()).subscribe(data => console.log(data))
    (await this.users.getUsers()).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == this.currentId) {
          console.log(data[i]);
          this.user = data[i].data;
          return true;
        }
      }
    });
  }

  atualizarDados(){
    console.log(this.user);
    this.users.userUpdate(this.currentId, this.user).then(() => {
      if (this.user.theme.color1 != "") document.documentElement.style.setProperty('--ion-color-learnin-primary', this.user.theme.color1);
      if (this.user.theme.color2 != "") document.documentElement.style.setProperty('--ion-color-learnin-secondary', this.user.theme.color2);
      if (this.user.theme.color3 != "") document.querySelector("body").style.setProperty('--ion-text-color', this.user.theme.color3);

      this.toaster.presentToast('Dados atualizados com sucesso!', 'success', 2000);
    })

  }

  edit(param : string){
    this.nameInput ? this.nameInput = false : this.nameInput = true;
  }

  escuro(event : any){
    if (event.detail.checked) {
      this.user.theme.color1 = '#0f0f0f';
      this.user.theme.color2 = '#080808';
      this.user.theme.color3 = '#ffffff';

      document.documentElement.style.setProperty('--ion-color-learnin-primary', '#0f0f0f');
      document.documentElement.style.setProperty('--ion-color-learnin-secondary', '#080808');
      document.querySelector("body").style.setProperty('--ion-text-color', '#b5b5b5');
      document.documentElement.style.setProperty('--color', '#ffffff');
    }
    else {
      this.user.theme.color1 = 'transparent';
      this.user.theme.color2 = 'transparent';
      this.user.theme.color3 = '#000000';

      document.documentElement.style.setProperty('--ion-color-learnin-primary', 'transparent');
      document.documentElement.style.setProperty('--ion-color-learnin-secondary', 'transparent');
      document.querySelector("body").style.setProperty('--ion-text-color', '#000000');
      document.documentElement.style.removeProperty('--color');
    }
  }

  async uploadFile(event) {
    const file = event.target.files[0];
    
    const randomId = Math.random().toString(36).substring(2);
    const nomeArquivo = new Date().getTime()+randomId+file.name;
    const filePath = nomeArquivo;
    const user_id = localStorage.getItem('user');
    const dadosRef = `usuarios/${user_id}/${filePath}`;
    
    const fileRef = this.storage.ref(dadosRef);
    const task = this.storage.upload(dadosRef, file);
  
    // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() =>{
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(resp=>{
          if(resp != '')
          {
            this.toaster.presentLoading('Carregando Prévia').then(result => {
              result.present();
              this.getBackLink(resp, result);
            });
          }
          else {
            this.toaster.presentToast('Falha ao atualizar prévia, tente novamente.', 'danger', 2000);
          }
        })
        
      })
    )
    .subscribe()
  }

  getBackLink(url:string, resloading : any) {
    this.user.photoURL = url;
    console.log(this.user);
    resloading.dismiss();

    this.toaster.presentToast('Prévia carregada, clique em salvar para confirmar as alterações.', 'secondary', 2000);
  }

}
