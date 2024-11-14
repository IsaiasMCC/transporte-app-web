import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargasPageComponent } from './pages/cargas-page/cargas-page.component';
import { GestionRoutingModule } from './gestion-routing.module';
import { MaterialModule } from '../material/material.module';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { AlertComponent } from './components/alert/alert.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { HorarioPageComponent } from './pages/horario-page/horario-page.component';
import { FichasComponent } from './pages/fichas/fichas.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { HistorialMedicoPageComponent } from './pages/historial-medico-page/historial-medico-page.component';
import { CitasMedicasPageComponent } from './pages/citas-medicas-page/citas-medicas-page.component';
import { EditortextComponent } from './components/editortext/editortext.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsComponent } from './components/maps/maps.component';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { MonitoreoPasosComponent } from './components/monitoreo-pasos/monitoreo-pasos.component';


@NgModule({
  declarations: [
    CargasPageComponent,
    CardHeaderComponent,
    AlertComponent,
    EspecialidadesComponent,
    VehiculoComponent,
    RolesPageComponent,
    HorarioPageComponent,
    FichasComponent,
    PacientesComponent,
    HistorialMedicoPageComponent,
    CitasMedicasPageComponent,
    EditortextComponent,
    MapsComponent,
    MonitoreoComponent,
    MonitoreoPasosComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    GestionRoutingModule,
    MaterialModule,
    GoogleMapsModule
  ]
})
export class GestionModule { }
