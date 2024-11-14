import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './components/camera/camera.component';
import { FaceReconitionRoutingModule } from './face-reconition-routing.module';



@NgModule({
  declarations: [
    CameraComponent
  ],
  imports: [
    CommonModule,
    FaceReconitionRoutingModule
  ]
})
export class FaceReconitionModule { }
