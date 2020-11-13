import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPublicacaoPage } from './view-publicacao.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPublicacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPublicacaoPageRoutingModule {}
