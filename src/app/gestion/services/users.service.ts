import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private APIURL: string = environment.serverApi
  private _users: any[] = [];

  constructor(private http: HttpClient) { }

  public get users() {
    return this._users
  }

  public setUsers(users: any[]): void {
    this._users = users;
  }

  public getUsers(): Observable<any[]> {
    const url = `${this.APIURL}/users`
    return this.http.get<any[]>(url);
  }

  public getUsersById(id: number): Observable<any> {
    const url = `${this.APIURL}/users/${id}`;
    return this.http.get<any>(url);
  }

  public registerUsers(data: any): Observable<any> {
    const url = `${this.APIURL}/users`;
    return this.http.post<any>(url, data);
  }

  public updateUsersById(id: number, data: any): Observable<any>  {
    const url = `${this.APIURL}/users/${id}`;
    return this.http.put<any>(url, data);
  }

  public deleteUsersById(id: number): Observable<any> {
    const url = `${this.APIURL}/users/${id}`;
    return this.http.delete<any>(url);
  }
}
