import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css']
})
export class MonitoreoComponent {

  public origen: any;
  public destino: any;
  constructor(private router: Router, private route: ActivatedRoute) {
       this.route.queryParamMap.subscribe(queryParams => {
        const origenParam = queryParams.get('origen');
        const destinoParam = queryParams.get('destino');

        this.origen = origenParam ? JSON.parse(origenParam) : null;
        this.destino = destinoParam ? JSON.parse(destinoParam) : null;

      });
  }
}
