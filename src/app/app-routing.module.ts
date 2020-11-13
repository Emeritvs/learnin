import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-desktop',
    pathMatch: 'full'
  },
  {
    path: 'home-desktop',
    loadChildren: () => import('./pages/home-desktop/home-desktop.module').then( m => m.HomeDesktopPageModule)
  },
  {
    path: 'home-mobile',
    loadChildren: () => import('./pages/home-mobile/home-mobile.module').then( m => m.HomeMobilePageModule)
  },
  {
    path: 'publicacao',
    loadChildren: () => import('./pages/publicacao/publicacao.module').then( m => m.PublicacaoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'verificacao',
    loadChildren: () => import('./pages/verificacao/verificacao.module').then( m => m.VerificacaoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
