// ficha.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = environment.serverApi; // Actualiza con tu URL

  constructor(private http: HttpClient) {}

  public getCitas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/citas`);
  }
  public getAllByPacienteId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/citas/paciente/${id}`);
  }
  public getAllByMedicoId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/citas/medico/${id}`);
  }

  public createCita(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/citas`, data);
  }

}
