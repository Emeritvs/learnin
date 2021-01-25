import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacaoPage } from './publicacao.page';

const routes: Routes = [
  {
    path: '',
    component: PublicacaoPage
  },
  {
    path: 'add-publicacao',
    loadChildren: () => import('./add-publicacao/add-publicacao.module').then( m => m.AddPublicacaoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacaoPageRoutingModule {}
