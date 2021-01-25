import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/routes/auth.service';
import { MuralService } from 'src/app/routes/mural.service';
import { UserService } from 'src/app/routes/user.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-publicacao',
  templateUrl: './add-publicacao.page.html',
  styleUrls: ['./add-publicacao.page.scss'],
})
export class AddPublicacaoPage implements OnInit {

  @Input() data : any;
  private currentId : any = {};
  private currentUser: any = {};
  private device : string = "desktop";
  private tipo : string = "post";
  private form : any = {
    materia: '',
    autor: '',
    titulo: '',
    descricao: '',
    anexos: [],
    createAt: ''
  };

  private fileUrl : string = "";

  private arquivos : any[] = [];
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(
    private modal : ModalController,
    private murals : MuralService,
    private storage: AngularFireStorage,
    private toaster : ToasterService,
    private platform : Platform,
    private user : UserService,
    private auth : AuthService

  ) { }

  ngOnInit() {
    this.currentId = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentId);

    if (this.platform.is('hybrid')) {
      this.device = "hybrid";
    }

    if (this.currentId) {
      this.loadUser(this.currentId);
    }
    else {
      this.toaster.presentToast('Falha ao carregar usuário', 'danger', 2000);
      this.auth.SignOut();
    }

    console.warn(this.data);
    if (this.data.item) {
      if(this.data.action === 'view-post') {
        this.tipo = "post";
        this.form.materia = this.data.materia;
        this.form.autor = this.data.item.autor;
        this.form.titulo = this.data.item.data.titulo;
        this.form.descricao = this.data.item.data.descricao;
        this.form.anexos = this.data.item.data.anexos;
        this.form.createAt = this.data.item.data.anexos;
      }
      else {
        this.tipo = "arquivo";
        this.form.materia = this.data.materia;
        this.form.autor = this.data.item.autor;
        this.form.titulo = this.data.item.data.name;
        this.form.createAt = this.data.item.data.createAt;
        this.fileUrl = this.data.item.data.url;

        this.arquivos.push(this.data.item.data);
      }  
    }
  }

  async loadUser(id : string){
    (await this.user.getUsers()).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          this.currentUser = data[i].data;
        }
      }
    });
  }

  startDownload(url : string) {
    window.open(url, "_blank")
  }

  async salvar(){
    if (this.tipo === 'arquivo') {
      console.log('arquivo!');
      await this.uploadArquivos().then(() => {
        this.form  = {
          materia: '',
          autor: '',
          titulo: '',
          descricao: '',
          anexos: [],
          createAt: ''
        };

        this.modal.dismiss();
      });
    }
    else {
      console.log('post!');
      await this.uploadArquivos().then(() => {
        console.warn(this.form);
        this.murals.enviarPost(this.data.materia, this.form)
        .then(() => {
          this.form  = {
            materia: '',
            autor: '',
            titulo: '',
            descricao: '',
            anexos: [],
            createAt: ''
          };

          this.modal.dismiss();
        })
      }
      );
    }
  }

  async apagar(){
    if (this.tipo === 'arquivo') {
      this.murals.apagarArquivo(this.data.materia, this.data.item.id).then(() => {
        this.toaster.presentToast('Arquivo apagado com sucesso', 'success', 2000);
        this.modal.dismiss();
      })
    }
    else {
      this.murals.apagarPost(this.data.materia, this.data.item.id).then(() => {
        this.toaster.presentToast('Post apagado com sucesso', 'success', 2000);
        this.modal.dismiss();
      })
    }
  }

  selecionarArquivo(event : any){
    if(event.target.files.length > 0){
      let files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        this.arquivos.push(files.item(i));
      }
    }
  }

  removerArquivo(id : number){
    console.log('remover arquivo '+id)
    this.arquivos.splice(id, 1);
  }

  async uploadArquivos() {
    if (this.arquivos.length > 0) {
      const n = Date.now();
      const files = this.arquivos;

      for (let i = 0; i < files.length; i++) {
        let fileName = files[i].name;
        // fileName = fileName.split('.').shift();
        const createName = `${n}_${fileName}`;
        const filePath = `materias/${this.data.materia}/${n}_${fileName}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`materias/${this.data.materia}/${createName}`, files[i]);
        const fileObj = {
          lastModified: files[i].lastModified,
          name: createName,
          size: files[i].size,
          type: files[i].type,
        };

        task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => { 
              if (url){
                fileObj['url'] = url;
                fileObj['createAt'] = new Date().getTime();
                
                this.murals.enviarArquivo(this.data.materia, fileObj);
              }
            });
            this.toaster.presentToast('Arquivos enviados com sucesso!', 'success', 2000);
          })
        )
        .subscribe(url => {});

        this.form.anexos.push(fileObj);
      }

    }
    else {
      this.toaster.presentToast('Selecione arquivos para enviar!', 'danger', 2000);
    }

  }

  closeModal(){
    this.modal.dismiss();
  }

}
