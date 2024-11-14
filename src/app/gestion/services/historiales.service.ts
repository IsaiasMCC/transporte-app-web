import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class HistorialesService {


  private APIURL: string = environment.serverApi
  private _historiales: any[] = [];

  constructor(private http: HttpClient) { }

  public get historiales() {
    return this._historiales
  }

  public sethistoriales(historiales: any[]): void {
    this._historiales = historiales;
  }

  public gethistoriales(): Observable<any[]> {
    const url = `${this.APIURL}/historiales`
    return this.http.get<any[]>(url);
  }
  public getHistorialPacienteById(id: any): Observable<any[]> {
    const url = `${this.APIURL}/historiales/paciente/${id}`
    return this.http.get<any[]>(url);
  }

  public getHistorialesById(id: number): Observable<any> {
    const url = `${this.APIURL}/historiales/${id}`;
    return this.http.get<any>(url);
  }

  public registerHistoriales(data: any): Observable<any> {
    const url = `${this.APIURL}/historiales`;
    return this.http.post<any>(url, data);
  }

  public updateHistorialesById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/historiales/${id}`;
    return this.http.put<any>(url, data);
  }

  public deleteHistorialesById(id: number): Observable<any> {
    const url = `${this.APIURL}/historiales/${id}`;
    return this.http.delete<any>(url);
  }
}
