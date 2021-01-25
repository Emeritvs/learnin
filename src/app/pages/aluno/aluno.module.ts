import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlunoPageRoutingModule } from './aluno-routing.module';

import { AlunoPage } from './aluno.page';
import { ModalConfirmPageModule } from '../modal-confirm/modal-confirm.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlunoPageRoutingModule,
    ModalConfirmPageModule
  ],
  declarations: [AlunoPage]
})
export class AlunoPageModule {}
