import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FichasService {

  private APIURL: string = environment.serverApi
  private _fichas: any[] = [];

  constructor(private http: HttpClient) { }

  public get fichas() {
    return this._fichas
  }

  public setFichas(fichas: any[]): void {
    this._fichas = fichas;
  }

  public getFichas(): Observable<any[]> {
    const url = `${this.APIURL}/fichas`
    return this.http.get<any[]>(url);
  }
  public getAllFichasById(id: any): Observable<any[]> {
    const url = `${this.APIURL}/fichas/fichas/${id}`
    return this.http.get<any[]>(url);
  }

  public getFichasById(id: number): Observable<any> {
    const url = `${this.APIURL}/fichas/${id}`;
    return this.http.get<any>(url);
  }

  public registerFichas(data: any): Observable<any> {
    const url = `${this.APIURL}/fichas`;
    return this.http.post<any>(url, data);
  }

  public updateFichasById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/fichas/${id}`;
    return this.http.put<any>(url, data);
  }

  public deleteFichasById(id: number): Observable<any> {
    const url = `${this.APIURL}/fichas/${id}`;
    return this.http.delete<any>(url);
  }
}
