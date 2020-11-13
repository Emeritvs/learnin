import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MuralService {

  constructor(
    private DB:AngularFirestore,
    private afa:AngularFireAuth,
  ) { }

  listarArquivos(id : string){
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

  listarPublicacoes(id : string){
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

  enviarArquivo(id : string, dados : any){
    console.log(`${id} - ${dados}`);
    return this.DB.collection('materias').doc(id).collection('arquivos').add(dados);
  }

  enviarPost(id : string, dados : any){
    return this.DB.collection('materias').doc(id).collection('publicacoes').add(dados);
  }
}
