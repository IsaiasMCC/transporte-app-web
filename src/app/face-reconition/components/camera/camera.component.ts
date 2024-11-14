import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  isCameraActive = false;

  ngAfterViewInit() {
    this.startCamera();
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
      this.isCameraActive = true;
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      this.isCameraActive = false;
    }
  }

  stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    this.videoElement.nativeElement.srcObject = null;
    this.isCameraActive = false;
  }
}
