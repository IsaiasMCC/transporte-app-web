import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private APIURL: string = environment.serverApi
  private _especialidades: any[] = [
    {
      "carga": {
        "id": 1,
        "fecha": "2024-11-13",
        "nombre": "Carga A",
        "origen": {
          "lat": -17.7862900,
          "long": -63.1811700
        },
        "destino": {
          "lat": -17.8000000,
          "long": -63.1600000
        },
        "peso": 500,
        "descripcion": "Carga de productos electrónicos",
        "conductor": {
          "id": 101,
          "nombre": "Juan",
          "apellido": "Pérez"
        }
      }
    },
    {
      "carga": {
        "id": 2,
        "fecha": "2024-11-14",
        "nombre": "Carga B",
        "origen": {
          "lat": -17.7850000,
          "long": -63.1750000
        },
        "destino": {
          "lat": -17.7950000,
          "long": -63.1550000
        },
        "peso": 300,
        "descripcion": "Carga de alimentos perecederos",
        "conductor": {
          "id": 102,
          "nombre": "Carlos",
          "apellido": "Gómez"
        }
      }
    },
    {
      "carga": {
        "id": 3,
        "fecha": "2024-11-15",
        "nombre": "Carga C",
        "origen": {
          "lat": -17.7900000,
          "long": -63.1800000
        },
        "destino": {
          "lat": -17.8050000,
          "long": -63.1700000
        },
        "peso": 700,
        "descripcion": "Carga de materiales de construcción",
        "conductor": {
          "id": 103,
          "nombre": "Ana",
          "apellido": "Martínez"
        }
      }
    },
    {
      "carga": {
        "id": 4,
        "fecha": "2024-11-16",
        "nombre": "Carga D",
        "origen": {
          "lat": -17.7855000,
          "long": -63.1850000
        },
        "destino": {
          "lat": -17.7955000,
          "long": -63.1650000
        },
        "peso": 250,
        "descripcion": "Carga de ropa",
        "conductor": {
          "id": 104,
          "nombre": "Luis",
          "apellido": "Torres"
        }
      }
    },
    {
      "carga": {
        "id": 5,
        "fecha": "2024-11-17",
        "nombre": "Carga E",
        "origen": {
          "lat": -17.7800000,
          "long": -63.1900000
        },
        "destino": {
          "lat": -17.7950000,
          "long": -63.1600000
        },
        "peso": 600,
        "descripcion": "Carga de maquinaria pesada",
        "conductor": {
          "id": 105,
          "nombre": "Pedro",
          "apellido": "Ramírez"
        }
      }
    }
  ]
  ;

  constructor(private http: HttpClient) { }

  public get especialidades() {
    return this._especialidades
  }

  public setEspecialidades(especialidades: any[]): void {
    this._especialidades = especialidades;
  }

  public getEspecialidades(): Observable<any[]> {
    const url = `${this.APIURL}/especialidades`
    return this.http.get<any[]>(url);
  }

  public getEspecialidadById(id: number): Observable<any> {
    const url = `${this.APIURL}/especialidades/${id}`;
    return this.http.get<any>(url);
  }

  public registerEspecialidad(data: any): Observable<any> {
    const url = `${this.APIURL}/especialidades`;
    return this.http.post<any>(url, data);
  }

  public updateEspecialidadById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/especialidades/${id}`;
    return this.http.put<any>(url, data);
  }

  public deleteEspecialidadById(id: number): Observable<any> {
    const url = `${this.APIURL}/especialidades/${id}`;
    return this.http.delete<any>(url);
  }
}
