import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPublicacaoPageRoutingModule } from './view-publicacao-routing.module';

import { ViewPublicacaoPage } from './view-publicacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPublicacaoPageRoutingModule
  ],
  declarations: [ViewPublicacaoPage]
})
export class ViewPublicacaoPageModule {}
