import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/routes/auth.service';
import { UserService } from 'src/app/routes/user.service';
import { ComponentsRenderService } from 'src/app/services/components-render.service';
import { DataService, Message } from 'src/app/services/data.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { ProcessService } from 'src/app/services/process.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-home-desktop',
  templateUrl: './home-desktop.page.html',
  styleUrls: ['./home-desktop.page.scss'],
})
export class HomeDesktopPage implements OnInit {

  @ViewChild('content', { read: ViewContainerRef, static: true }) private  content : ViewContainerRef;
  private currentUser: any = {
    uid: null,
    displayName: null
  };

  constructor(
    private platform : Platform,
    private router : Router,
    private data: DataService,
    private auth : AuthService,
    private components : ComponentsRenderService,
    private resolver: ComponentFactoryResolver,
    private toaster : ToasterService,
    private emitter : EventEmitterService,
    private user : UserService,
    @Inject(DOCUMENT) private document : Document
  ) { }

  async ngOnInit() {
    (await this.user.getUserData()).subscribe(data => {
      this.currentUser.uid = data['uid'];
      this.currentUser.displayName = data['displayName'];
      this.loadTheme(data);
    });

    if (this.emitter.subsVar == undefined) {    
      this.emitter.subsVar = this.emitter.invokeFirstComponentFunction
      .subscribe((param : any) => {  
        let data = param.data;

        //ABRIR COMPONENTE
        this.abrirComponente(this.content, 'D',param.function ,data)
        .catch(err => {
          console.log(err);
          this.toaster.presentToast('Houve um problema ao processar sua solicitação. Tente novamente mais tarde', 'danger',  0);
        })
      });  
    } 
    await this.abrirComponente(this.content, 'D','materiasComponent',{});
    this.loadUser();
  }

  async loadUser(){
    await this.user.getUserData().then(dados => {
      // this.userDados = dados;
    })
  }

  loadTheme(data : any){
    document.documentElement.style.setProperty('--ion-color-learnin-primary', data.theme.color1);
    document.documentElement.style.setProperty('--ion-color-learnin-secondary', data.theme.color2);
    document.documentElement.style.setProperty('--ion-toolbar-background', data.theme.color3);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  async openContent(option : string){
    await this.abrirComponente(this.content, 'D', option,{});
  }

  async abrirComponente(element : ViewContainerRef, container:string,componentName:string,data?:any): Promise<Boolean> {
    return new Promise((resolve, reject) => {
          //DEU CERTO O CARREGAMENTO
          this.toaster.presentLoading('Carregando...')
          .then(async res => {
            res.present();
            try
            {
              let comp : any = await this.components.resolveComponentsName(componentName);
        
              if(comp != false)
              {
                let newItem = new ProcessService(comp, data);
                const factory = this.resolver.resolveComponentFactory(newItem.component);

                //Criar o componente 
                if(container == 'D')
                {
                  element.clear();
                  console.log('Carregando container D')
                  // let componentRef = this.direito.createComponent(factory);
                  this.content.createComponent(factory);
                }
                else
                {
                  console.log('Não existe um container ativo ('+container+')   ');
                }

                res.dismiss();
                resolve(true)
              }
              else
              {
                alert('Falha ao carregar '+componentName);
                console.log('Componente nào esta instanciado');
                reject(false);
              }
            }
            catch(err)
            {
              reject(false)
              console.log(err);
              res.dismiss();
              this.toaster.presentToast(
                'Falha ao carregar tela',
                'danger',
                4000
              )
            }
          })
          .catch(err => {})
          .finally(()=> {})
    });
  }

  logout(){
    this.auth.SignOut();
  }
}
