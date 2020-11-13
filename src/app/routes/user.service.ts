import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private DB:AngularFirestore,
    private afa:AngularFireAuth,
  )
  {

  }

  public dadosLogado:any;

  async getUserData(){
    let userUid =  localStorage.getItem('user');
    userUid = JSON.parse(userUid);

    // return this.DB.collection('usuarios').doc(userUid).get().subscribe(data => {
    //   return data.data();
    // })

    return this.DB.collection('usuarios').doc(userUid).valueChanges();

  }
}

