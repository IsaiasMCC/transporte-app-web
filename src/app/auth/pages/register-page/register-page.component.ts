import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/gestion/services/pacientes.service';
import { UsersService } from 'src/app/gestion/services/users.service';

@Component({
  selector: 'app-register-page',
  templateUrl: 'register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  custonForm: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router, private pacientesServices: PacientesService, private userServices : UsersService ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],



    });
     this.custonForm = this.fb.group({

      'userId': ['', Validators.required],
      'tipo': ['Paciente', Validators.required]
    });
  }



  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.warning('Rellene los campos obligatorios');
    } else {
        this.userServices.registerUsers(this.registerForm.value)
        .pipe(
          catchError(err => {
            this.toastr.error('usuario no registrado');
            console.log(err);
            throw new Error(err);
          }
          )
        )
        .subscribe((response: any) => {
                 //TODO REGISTRER PACIENTE.
                 const newPaciente = {
                  tipo: this.custonForm.get('tipo')?.value,
                  userId: response.id,
                };
                this.pacientesServices.registerPacientes(newPaciente)
                .pipe(
                  catchError(err => {
                     this.toastr.error('Paciente no agregado');
                    console.log(err);
                    throw new Error(err);
                  }
                  )
                )
                .subscribe((res: any) => {
                  this.toastr.success('Paciente agregado exitosamente');

                  this.custonForm.reset();

                });
          this.toastr.success('Usuario creado exitosamente');
            this.registerForm.reset();
            this.router.navigate(["/auth/login"]);
        });
      }
  }
}
