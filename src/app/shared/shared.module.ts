import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenusidebarComponent } from './components/menusidebar/menusidebar.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ReservaFichaComponent } from './pages/reserva-ficha/reserva-ficha.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { FichasPacientePageComponent } from './pages/fichas-paciente-page/fichas-paciente-page.component';



@NgModule({
  declarations: [
    HomePageComponent,
    NavBarComponent,
    SidebarComponent,
    MenusidebarComponent,
    LayoutComponent,
    ReservaFichaComponent,
    DashboardComponent,
    FichasPacientePageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    SidebarComponent,
    LayoutComponent,
    ReservaFichaComponent,
    DashboardComponent,
    FichasPacientePageComponent
  ]
})
export class SharedModule { }
