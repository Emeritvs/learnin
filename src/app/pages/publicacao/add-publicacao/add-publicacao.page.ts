import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MuralService } from 'src/app/routes/mural.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-publicacao',
  templateUrl: './add-publicacao.page.html',
  styleUrls: ['./add-publicacao.page.scss'],
})
export class AddPublicacaoPage implements OnInit {

  @Input() data : any;
  private tipo : string = "post";
  private form : any = {
    materia: '',
    autor: '',
    titulo: '',
    descricao: '',
    anexos: [],
    createAt: ''
  };
  private arquivos : File[] = [];
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(
    private modal : ModalController,
    private murals : MuralService,
    private storage: AngularFireStorage,
    private toaster : ToasterService
  ) { }

  ngOnInit() {
  }

  async salvar(){
    if (this.tipo === 'arquivo') {
      console.log('arquivo!');
      await this.uploadArquivos();
    }
    else {
      console.log('post!');
      await this.uploadArquivos().then(() => this.murals.enviarPost(this.data, this.form)
        .then(() => {
          this.form  = {
            materia: '',
            autor: '',
            titulo: '',
            descricao: '',
            anexos: [],
            createAt: ''
          };

          this.modal.dismiss() ;
        })
      );
    }
  }

  selecionarArquivo(event : any){
    if(event.target.files.length > 0){
      let files = event.target.files;

      for (let i = 0; i < files.length; i++) {
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
      var n = Date.now();
      const files = this.arquivos;

      for (let i = 0; i < files.length; i++) {
        let fileName = files[i].name;
        fileName = fileName.split('.').shift();
        const filePath = `materias/${this.data}/${n}_${fileName}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`materias/${this.data}/${n}_${fileName}`, files[i]);
        let fileObj = {
          lastModified: files[i].lastModified,
          name: files[i].name,
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
                
                this.form.anexos.push(fileObj);

                console.log(this.form.anexos);
                for (let i = 0; i < this.form.anexos.length; i++) {
                  this.murals.enviarArquivo(this.data, this.form.anexos[i]);
                }
              }
            });
            this.toaster.presentToast('Arquivos enviados com sucesso!', 'success', 2000);
          })
        )
        .subscribe(url => {});
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
