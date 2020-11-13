import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { MateriasComponent } from './materias/materias.component';
import { MuralComponent } from './materias/mural/mural.component';
import { MeusDadosComponent } from './meus-dados/meus-dados.component';
import { SobreComponent } from './sobre/sobre.component';


const PAGES_COMPONENTS = [
    MateriasComponent,
    MeusDadosComponent,
    SobreComponent,
    MuralComponent
];

@NgModule({
    declarations: [
        PAGES_COMPONENTS
    ],
    exports: [
        PAGES_COMPONENTS
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ColorPickerModule
    ]
})
export class ComponentsModule { }