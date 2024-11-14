import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargasPageComponent } from './pages/cargas-page/cargas-page.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { HorarioPageComponent } from './pages/horario-page/horario-page.component';
import { FichasComponent } from './pages/fichas/fichas.component';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { CitasMedicasPageComponent } from './pages/citas-medicas-page/citas-medicas-page.component';
import { HistorialMedicoPageComponent } from './pages/historial-medico-page/historial-medico-page.component';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'cargas',
        component: CargasPageComponent
      },
      {
        path: 'vehiculos',
        component: VehiculoComponent
      },
      {
        path: 'conductores',
        component: PacientesComponent
      },
      {
        path: 'roles',
        component: RolesPageComponent
      },
      {
        path: 'horarios',
        component: HorarioPageComponent
      },
      {
        path: 'citas',
        component: CitasMedicasPageComponent
      },
      {
        path: 'historial-medico/:id',
        component: HistorialMedicoPageComponent
      },
      {
        path: 'fichas/:id',
        component: FichasComponent
      },
      {
        path: 'maps/:id',
        component: MonitoreoComponent
      },
      {
        path: '**',
        redirectTo: 'especialidades'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
