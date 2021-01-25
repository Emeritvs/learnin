import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user_id : any;
  constructor(
    private DB:AngularFirestore,
    private afa:AngularFireAuth,
  )
  {

  }

  public dadosLogado:any;

  async getUserData(){
    let userUid =  localStorage.getItem('user');
    if (userUid) {
      return this.DB.collection('usuarios', ref => ref.where('doc.id','==', userUid )).snapshotChanges().pipe(
        map(action => action.map(a=>{
          const dados = {
            id: a.payload.doc.id,
            data: a.payload.doc.data() as any,
          };
  
          return dados;
        }))
      )
    }
  }

  async getUserDados(){
    let userUid =  localStorage.getItem('user');
    if (userUid) {
      // return this.DB.collection('usuarios').doc(userUid).get().subscribe(data => {
      //   return data.data();
      // })

      return this.DB.collection('usuarios').doc(userUid).collection('dados').snapshotChanges().pipe(
        map(action => action.map(a=>{
          const dados = {
            id: a.payload.doc.id,
            data: a.payload.doc.data() as any,
          };
  
          return dados;
        }))
      )
    }
  }

  async getUsers(){
    return this.DB.collection('usuarios').snapshotChanges().pipe(
      map(action => action.map(a=>{
        const dados = {
          id: a.payload.doc.id,
          data: a.payload.doc.data() as any,
        };

        return dados;
      }))

    )
  }

  userUpdate(id : string, dados : any){
    return this.DB.collection('usuarios').doc(id).update(dados);
  }
}

