import { Injectable } from '@angular/core';
import { MateriasComponent } from '../components/materias/materias.component';
import { MuralComponent } from '../components/materias/mural/mural.component';
import { MeusDadosComponent } from '../components/meus-dados/meus-dados.component';
import { SobreComponent } from '../components/sobre/sobre.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentsRenderService {

  constructor() { }

  async resolveComponentsName(componentName : any) {

    console.log('Resolvendo '+componentName)
    if (componentName === 'materiasComponent') {
      return MateriasComponent;
    }
    else if (componentName === 'dadosComponent') {
      return MeusDadosComponent;
    }
    else if (componentName === 'muralComponent') {
      return MuralComponent;
    }
    else if (componentName === 'sobreComponent') {
      return SobreComponent;
    }
    else
    {
      alert('error')
      return false;
    }
  }
}
