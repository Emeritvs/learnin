import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/routes/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData = {
    login : '',
    password: ''
  };

  constructor(
    private auth : AuthService,
    private router : Router,
    private toast : ToasterService
  ) { }

  ngOnInit() {
  }

  login(){
    this.auth.SignIn(this.userData.login, this.userData.password);
  }
}
