import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/routes/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  private signData = {
    email: '',
    password: ''
  };

  constructor(
    private auth : AuthService,
    private toaster : ToasterService
  ) { }

  ngOnInit() {
  }

  cadastrar(){
    this.auth.SignUp(this.signData.email, this.signData.password)
    .then(() => this.toaster.presentToast('Uma confirmação foi enviada para o seu email, confirme-a para concluir o cadastro.', 'success', 2000))
    .catch(err => this.toaster.presentToast(`[ERRO]: ${err}`, 'danger', 2000));
  }

}
