import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDesktopPageRoutingModule } from './home-desktop-routing.module';

import { HomeDesktopPage } from './home-desktop.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDesktopPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomeDesktopPage]
})
export class HomeDesktopPageModule {}
