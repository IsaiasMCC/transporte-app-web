import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APIURL: string = environment.serverApi
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated.next(!!this.getUser());
  }

  public login(data: any): Observable<any> {
    const url = `${this.APIURL}/auth/login`;
    return this.http.post<any>(url, data).pipe(
      tap((response: any) => {
        this.setUser(response.user); // Guarda el usuario
        this.isAuthenticated.next(true); // Actualiza el estado de autenticación
      })
    );
  }

  public register(data: any): Observable<any> {
    const url = `${this.APIURL}/auth/register`;
    return this.http.post<any>(url, data);
  }

  // Obtiene el token del localStorage
  public getUser() {
    const userData = localStorage.getItem('user'); // o sessionStorage
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data', error);
        return null;
      }
    }
  }

  // Guarda el token en el localStorage
  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Limpia el token del localStorage
  public clearUser(): void {
    localStorage.removeItem('user');
  }

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.getUser();
  }

  public logout(): void {
    this.clearUser(); // Limpia el user
    this.isAuthenticated.next(false); // Cambia el estado de autenticación
    this.router.navigate(['']); // Redirige a la página de login
  }


}
