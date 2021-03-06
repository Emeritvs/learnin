import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private currentUser : string;
  constructor(
    private DB:AngularFirestore,
    private afa:AngularFireAuth,
  ) { 
    this.currentUser = localStorage.getItem('user');
  }

  listar(){
    return this.DB.collection('materias').snapshotChanges()
    .pipe(
      map(action => action.map(a=>{
        const dados = {
          id: a.payload.doc.id,
          data: a.payload.doc.data() as any,
        };

        dados.data.color = this.getRandomColor();
        return dados;
      }))

    )
  }

  adicionar(data : any){
    data.createAt = new Date().getTime();

    return this.DB.collection('materias').add(data);
  }

  editar(){

  }

  apagar(id : string){
    return this.DB.collection("materias").doc(id).delete();
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }  
}
