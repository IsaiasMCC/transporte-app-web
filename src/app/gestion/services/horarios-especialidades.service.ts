import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HorariosEspecialidadesService {

  private APIURL: string = environment.serverApi
  private _horarios_especialidades: any[] = [];

  constructor(private http: HttpClient) { }

  public get horariosEspecialidades() {
    return this._horarios_especialidades
  }

  public setHorariosEspecialidades(horarios_especialidades: any[]): void {
    this._horarios_especialidades = horarios_especialidades;
  }

  public getHorariosEspecialidades(): Observable<any[]> {
    const url = `${this.APIURL}/horarios_especialidad`
    return this.http.get<any[]>(url);
  }
  public getDias(id: number): Observable<any[]> {
    const url = `${this.APIURL}/horarios_especialidad/dias/${id}`
    return this.http.get<any[]>(url);
  }

  public getHorarioEspecialidadById(id: number): Observable<any> {
    const url = `${this.APIURL}/horarios_especialidad/${id}`;
    return this.http.get<any>(url);
  }

  public registerHorarioEspecialidad(data: any): Observable<any> {
    const url = `${this.APIURL}/horarios_especialidad`;
    return this.http.post<any>(url, data);
  }

  public updateHorarioEspecialidadById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/horarios_especialidad/${id}`;
    return this.http.put<any>(url, data);
  }

  public deleteHorarioEspecialidadById(id: number): Observable<any> {
    const url = `${this.APIURL}/horarios_especialidad/${id}`;
    return this.http.delete<any>(url);
  }
}
