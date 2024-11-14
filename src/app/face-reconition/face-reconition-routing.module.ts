import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './components/camera/camera.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'camara',
        component: CameraComponent
      },
      {
        path: '**',
        redirectTo: 'camara'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceReconitionRoutingModule { }
