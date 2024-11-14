import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { ReservaFichaComponent } from './shared/pages/reserva-ficha/reserva-ficha.component';
import { authGuard } from './auth/guards/auth.guard';
import { FichasPacientePageComponent } from './shared/pages/fichas-paciente-page/fichas-paciente-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'reserva',
    component: ReservaFichaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'reserva/fichas',
    component: FichasPacientePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'reconocimiento',
    loadChildren: () => import('src/app/face-reconition/face-reconition.module').then( m => m.FaceReconitionModule)
  },
  {
    path: 'gestion',
    loadChildren: () => import('src/app/gestion/gestion.module').then( m => m.GestionModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
