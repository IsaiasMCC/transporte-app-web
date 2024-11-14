import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private APIURL: string = environment.serverApi
  private _roles: any[] = [];

  constructor(private http: HttpClient) { }

  public get roles() {
    return this._roles
  }

  public setRoles(roles: any[]): void {
    this._roles = roles;
  }

  public getRoles(): Observable<any[]> {
    const url = `${this.APIURL}/roles`
    return this.http.get<any[]>(url);
  }

  public getRolesById(id: number): Observable<any> {
    const url = `${this.APIURL}/roles/${id}`;
    return this.http.get<any>(url);
  }

  public registerRoles(data: any): Observable<any> {
    const url = `${this.APIURL}/roles`;
    return this.http.post<any>(url, data);
  }

  public updateRolesById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/roles/${id}`;
    return this.http.put<any>(url, data);
  }

  public deleteRolesById(id: number): Observable<any> {
    const url = `${this.APIURL}/roles/${id}`;
    return this.http.delete<any>(url);
  }
}
