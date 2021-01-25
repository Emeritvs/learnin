import { DOCUMENT } from '@angular/common';
import { Inject, Input } from '@angular/core';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/routes/auth.service';
import { UserService } from 'src/app/routes/user.service';
import { ComponentsRenderService } from 'src/app/services/components-render.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { ProcessService } from 'src/app/services/process.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-home-desktop',
  templateUrl: './home-desktop.page.html',
  styleUrls: ['./home-desktop.page.scss'],
})
export class HomeDesktopPage implements OnInit {
  @Input() teste : any;
  @ViewChild('content', { read: ViewContainerRef, static: true }) private  content : ViewContainerRef;
  private currentId : any = {};
  private currentUser: any = {};
  private device : string = "desktop";

  constructor(
    private platform : Platform,
    private router : Router,
    private auth : AuthService,
    private components : ComponentsRenderService,
    private resolver: ComponentFactoryResolver,
    private toaster : ToasterService,
    private emitter : EventEmitterService,
    private user : UserService,
    private route: ActivatedRoute,
    private menu : MenuController,
    @Inject(DOCUMENT) private document : Document
  ) { 
  }

  ngOnInit() {
    this.currentId = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentId);

    if (this.platform.is('hybrid')) {
      this.device = "hybrid";
    }

    if (this.currentId) {
      this.loadUser(this.currentId);
    }
    else {
      this.toaster.presentToast('Falha ao carregar usuário', 'danger', 2000);
      this.auth.SignOut();
    }

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
    this.abrirComponente(this.content, 'D','materiasComponent',{});
  }

  async loadUser(id : string){
    (await this.user.getUsers()).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          this.currentUser = data[i].data;
          console.error(this.currentUser);
          this.loadTheme(this.currentUser);
        }
      }
    });
  }

  loadTheme(data : any){
    document.documentElement.style.setProperty('--ion-color-learnin-primary', data.theme.color1);
    document.documentElement.style.setProperty('--ion-color-learnin-secondary', data.theme.color2);
    document.documentElement.style.setProperty('--ion-background-color', data.theme.color1);
    document.documentElement.style.setProperty('--ion-item-background', data.theme.color1);
    document.querySelector("body").style.setProperty('--ion-text-color', data.theme.color3);
  }

  async openContent(option : string){
    this.menu.close();
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
                  // let componentRef = this.direito.createComponent(factory);
                  this.content.createComponent(factory);
                }
                else
                {
                  console.error('Não existe um container ativo ('+container+')');
                }

                res.dismiss();
                resolve(true)
              }
              else
              {
                console.error('Falha ao carregar '+componentName);
                console.error('Componente nào esta instanciado');
                reject(false);
              }
            }
            catch(err)
            {
              reject(false);
              console.error(err);
              res.dismiss();
              this.toaster.presentToast('Falha ao carregar tela', 'danger', 4000);
            }
          })
          .catch()
          .finally();
    });
  }

  logout(){
    this.auth.SignOut();
  }
}
