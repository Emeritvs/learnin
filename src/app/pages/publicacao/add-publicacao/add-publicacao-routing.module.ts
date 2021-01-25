import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPublicacaoPage } from './add-publicacao.page';

const routes: Routes = [
  {
    path: '',
    component: AddPublicacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPublicacaoPageRoutingModule {}
