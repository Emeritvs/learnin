import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss'],
})
export class MeusDadosComponent implements OnInit {
  private user = {
    displayName: null,
    photoURL: null,
    theme: {
        color1: '#ffffff',
        color2: '#ffffff',
        color3: '#fff',
    }
  };

  private dark_mode : boolean = false;

  private cor : string;
  constructor(
    @Inject(DOCUMENT) private document : Document
  ) { 

  }

  ngOnInit() {}

  atualizarDados(){
    console.log(this.user);
  }

  teste(){
    console.log(this.user);
    document.documentElement.style.setProperty('--ion-color-learnin-primary', this.user.theme.color1);
  }

  escuro(shouldAdd){
  }

}
