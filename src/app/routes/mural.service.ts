import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MuralService {

  constructor(
    private DB:AngularFirestore,
    private afa:AngularFireAuth,
    private storage: AngularFireStorage,
  ) { }

  async listarArquivos(id : string){
    return this.DB.collection('materias').doc(id).collection('arquivos').snapshotChanges().pipe(
      map(action => action.map(a=>{
        const dados = {
          id: a.payload.doc.id,
          data: a.payload.doc.data() as any,
        };

        return dados;
      }))
    )
  }

  async listarPublicacoes(id : string){
    return this.DB.collection('materias').doc(id).collection('publicacoes').snapshotChanges().pipe(
      map(action => action.map(a=>{
        const dados = {
          id: a.payload.doc.id,
          data: a.payload.doc.data() as any,
        };

        return dados;
      }))
    )
  }

  async listarAlunos(id : string){
    return this.DB.collection('materias').doc(id).collection('participantes').snapshotChanges().pipe(
      map(action => action.map(a=>{
        const dados = {
          id: a.payload.doc.id,
          data: a.payload.doc.data() as any,
        };

        return dados;
      }))
    )
  }

  adicionarAluno(id : string, dados : any){
    return this.DB.collection('materias').doc(id).collection('participantes').add(dados);
  }

  adicionarMateriaAluno(id: string, materias : any){
    return this.DB.collection('usuarios').doc(id).update({materias: materias});
  }

  enviarArquivo(id : string, dados : any){
    return this.DB.collection('materias').doc(id).collection('arquivos').add(dados);
  }

  enviarPost(id : string, dados : any){
    return this.DB.collection('materias').doc(id).collection('publicacoes').add(dados);
  }

  apagarArquivo(materia_id : string, arquivo_id : string){
    return this.DB.collection('materias').doc(materia_id).collection('arquivos').doc(arquivo_id).delete()
  }

  apagarPost(materia_id : string, publicacao_id : string){
    return this.DB.collection('materias').doc(materia_id).collection('publicacoes').doc(publicacao_id).delete();
  }
}
