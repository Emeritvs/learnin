import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPublicacaoPageRoutingModule } from './add-publicacao-routing.module';

import { AddPublicacaoPage } from './add-publicacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPublicacaoPageRoutingModule
  ],
  declarations: [AddPublicacaoPage]
})
export class AddPublicacaoPageModule {}
