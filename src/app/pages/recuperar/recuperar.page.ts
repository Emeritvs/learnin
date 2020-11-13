import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/routes/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  private email : string;
  constructor(
    private auth : AuthService
  ) { }

  ngOnInit() {
  }

  recuperar(){
    this.auth.ForgotPassword(this.email);
  }
}
