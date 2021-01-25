import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private DB:AngularFirestore,
    private afa:AngularFireAuth,
  ) { }

  listar(id : string){
    return this.DB.collection('materias').doc(id).collection('mensagens').snapshotChanges().pipe(
      map(action => action.map(a=>{
        const dados = {
          id: a.payload.doc.id,
          data: a.payload.doc.data() as any,
        };

        return dados;
      }))
    )
  }

  enviar(id : string, dados : any){
    return this.DB.collection('materias').doc(id).collection('mensagens').add(dados);
  }
}
