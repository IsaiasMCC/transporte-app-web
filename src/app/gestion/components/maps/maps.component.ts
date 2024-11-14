import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef; // Obtener referencia al contenedor del mapa
  @Input('origen') public origen!: any;
  @Input('destino') public destino!: any;


  center: google.maps.LatLngLiteral = { lat: -17.7862900, lng: -63.1811700 };
  zoom = 12;
  apiLoaded = false;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;
  routeOptions: google.maps.PolylineOptions = { strokeColor: '#007bff', strokeWeight: 4 };
  map!: google.maps.Map;

  constructor(
    private mapDirectionsService: MapDirectionsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Inicializar los servicios de direcciones
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({ polylineOptions: this.routeOptions });
  }

  ngAfterViewInit() {
    // Verifica si la API está cargada
    if (typeof google !== 'undefined') {
      this.apiLoaded = true;
      this.cdr.detectChanges();  // Forzar la detección de cambios

      // Inicializar el mapa
      this.map = new google.maps.Map(this.mapContainer.nativeElement, {
        center: this.center,
        zoom: this.zoom
      });

      this.directionsRenderer.setMap(this.map); // Asociar el directionsRenderer al mapa
      this.calculateRoute(); // Ejecutar el cálculo de la ruta
    } else {
      console.error('Google Maps API no se ha cargado correctamente.');
    }
  }

  private calculateRoute() {
    const start = { lat: parseFloat(this.origen.lat), lng: parseFloat(this.origen.lng) }; // Punto de partida
    const end = { lat: parseFloat(this.destino.lat), lng: parseFloat(this.destino.lng) }; // Punto final

    this.directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK && response) {
          // Asocia la ruta calculada al renderer para dibujar la ruta
          this.directionsRenderer.setDirections(response);
        } else {
          console.error('Error al calcular la ruta:', status);
        }
      }
    );
  }
}
