import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-fichas-paciente-page',
  templateUrl: './fichas-paciente-page.component.html',
  styleUrls: ['./fichas-paciente-page.component.css']
})
export class FichasPacientePageComponent implements OnInit {
  fichasCompradas: any[] = [];
  isAuthenticated = false;
  userNameInitial: any = '';
  pacienteId = null;
  rol = null;
  constructor(private authService: AuthService, private citasService: CitasService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.userNameInitial = this.authService.getUser();
    this.rol = this.userNameInitial.rol;

    this.citasService.getAllByPacienteId(this.userNameInitial.id)
    .subscribe((fichas) => {
      this.fichasCompradas = fichas;
      console.log(fichas);
    });
  }

  login(): void {
    this.authService.logout();
  }

  logout(): void {
    this.authService.logout();
  }

  pagar(fichaId: number): void {
    // Lógica para gestionar el pago
  }
}
