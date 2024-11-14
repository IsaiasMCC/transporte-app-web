import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private APIURL: string = environment.serverApi
  private _horarios: any[] = [];

  constructor(private http: HttpClient) { }

  public get horarios() {
    return this._horarios
  }

  public setHorarios(horarios: any[]): void {
    this._horarios = horarios;
  }

  public getHorarios(): Observable<any[]> {
    const url = `${this.APIURL}/horarios`
    return this.http.get<any[]>(url);
  }

  public getHorarioById(id: number): Observable<any> {
    const url = `${this.APIURL}/horarios/${id}`;
    return this.http.get<any>(url);
  }

  public registerHorario(data: any): Observable<any> {
    const url = `${this.APIURL}/horarios`;
    return this.http.post<any>(url, data);
  }

  public updateHorarioById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/horarios/${id}`;
    return this.http.put<any>(url, data);
  }

  public deleteHorarioById(id: number): Observable<any> {
    const url = `${this.APIURL}/horarios/${id}`;
    return this.http.delete<any>(url);
  }
}
