import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDesktopPage } from './home-desktop.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDesktopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDesktopPageRoutingModule {}
