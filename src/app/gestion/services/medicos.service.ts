import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private APIURL: string = environment.serverApi
  private _medicos: any[] = [];

  constructor(private http: HttpClient) { }

  public get medicos() {
    return this._medicos
  }

  public setMedicos(medicos: any[]): void {
    this._medicos = medicos;
  }

  public getMedicos(): Observable<any[]> {
    const url = `${this.APIURL}/medicos`
    return this.http.get<any[]>(url);
  }

  public getMedicosById(id: number): Observable<any> {
    const url = `${this.APIURL}/medicos/${id}`;
    return this.http.get<any>(url);
  }

  public registerMedicos(data: any): Observable<any> {
    const url = `${this.APIURL}/medicos`;
    return this.http.post<any>(url, data);
  }

  public updateMedicosById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/medicos/${id}`;
    return this.http.put<any>(url, data);
  }

  public deleteMedicosById(id: number): Observable<any> {
    const url = `${this.APIURL}/medicos/${id}`;
    return this.http.delete<any>(url);
  }
}
