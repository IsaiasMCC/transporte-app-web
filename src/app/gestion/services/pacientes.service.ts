import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private APIURL: string = environment.serverApi
  private _pacientes: any[] = [];

  constructor(private http: HttpClient) { }

  public get pacientes() {
    return this._pacientes
  }

  public setPacientes(pacientes: any[]): void {
    this._pacientes = pacientes;
  }

  public getPacientes(): Observable<any[]> {
    const url = `${this.APIURL}/pacientes`
    return this.http.get<any[]>(url);
  }

  public getPacientesById(id: number): Observable<any> {
    const url = `${this.APIURL}/pacientes/${id}`;
    return this.http.get<any>(url);
  }

  public registerPacientes(data: any): Observable<any> {
    const url = `${this.APIURL}/pacientes`;
    return this.http.post<any>(url, data);
  }

  public updatePacientesById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/pacientes/${id}`;
    return this.http.put<any>(url, data);
  }

  public deletePacientesById(id: number): Observable<any> {
    const url = `${this.APIURL}/pacientes/${id}`;
    return this.http.delete<any>(url);
  }
}
