import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EspecialidadService } from '../../services/especialidad.service';

import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { MedicosService } from '../../services/medicos.service';
import { UsersService } from '../../services/users.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-citas-medicas-page',
  templateUrl: './citas-medicas-page.component.html',
  styleUrls: ['./citas-medicas-page.component.css']
})
export class CitasMedicasPageComponent implements OnInit  {
  public displayedColumns: string[] = ['id', 'fecha', 'nombre', 'hora_inicio', 'hora_fin', 'name', 'apellido', 'accion'];
  public dataSource: any;
  public title: string = "Citas Medicas: ";
  @ViewChild(MatSort)
  public sort!: MatSort;

  @ViewChild('alertForm') alertForm!: TemplateRef<any>;
  public alertRef!: MatDialogRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public custonForm: FormGroup = this.formBuilder.group({
    'nombre': ['', Validators.required],
    'apellido': ['', Validators.required],
    'ci': ['', Validators.required],
    'telefono': ['', Validators.required],
    'direccion': ['', Validators.required],
    'genero': ['', Validators.required],
    'email': ['', Validators.required],
    'password': ['', Validators.required],
    'especialidad': ['', Validators.required],
    'tipo': ['Medico', Validators.required]
  });

  public citas: any[] = [];
  isAuthenticated = false;
  userNameInitial: any = '';
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private medicosService: MedicosService,
    private toastr: ToastrService,
    private authService: AuthService,
    private citasService: CitasService,
    private usersServices: UsersService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.userNameInitial = this.authService.getUser();
    this.title = this.title + " " + this.userNameInitial.nombre + " " + this.userNameInitial.apellido;
    this.getCitasMedicos(this.userNameInitial.id);
  }

  public openDialog() {
    this.alertRef = this.dialog.open(this.alertForm);
  }

  public fieldValidator(name: string): boolean | null {
    return this.custonForm.controls[`${name}`].errors && this.custonForm.controls[`${name}`].touched;
  }

  public changeSelect(event: any): void {
    // this.custonForm.patchValue({
    //   [`${event.target.name}`]: event.target.value
    // })
  }

  public submitForm(): void {
    if (this.custonForm.invalid) {
      this.custonForm.markAllAsTouched();
      this.toastr.warning('Rellene los campos obligatorios');
    } else {

    const newEspecialidad = {
      nombre: this.custonForm.get('nombre')?.value,
      apellido: this.custonForm.get('apellido')?.value,
      ci: this.custonForm.get('ci')?.value,
      email: this.custonForm.get('email')?.value,
      telefono: this.custonForm.get('telefono')?.value,
      direccion: this.custonForm.get('direccion')?.value,
      password: this.custonForm.get('password')?.value,
      genero: this.custonForm.get('genero')?.value,
      rolId: 2
    };
      this.usersServices.registerUsers(newEspecialidad)
        .pipe(
          catchError(err => {
            this.toastr.error('Usuario no agregada');
            console.log(err);
            throw new Error(err);
          }
          )
        )
        .subscribe((response: any) => {
          //TODO REGISTRER MEDICO.
          const mewMedico = {
            especialidad: this.custonForm.get('especialidad')?.value,
            tipo: this.custonForm.get('tipo')?.value,
            userId: response.id,
          };
          this.medicosService.registerMedicos(mewMedico)
          .pipe(
            catchError(err => {
               this.toastr.error('Medico no agregado');
              console.log(err);
              throw new Error(err);
            }
            )
          )
          .subscribe((res: any) => {
            this.toastr.success('Medico agregado exitosamente');
            this.ngOnInit();
            this.custonForm.reset();
            this.alertRef.close();
          });
        });
      }
  }


  public getCitasMedicos(id: number) {

    this.citasService.getAllByMedicoId(id)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al cargar los datos');
        return of([])
      })
    )
    .subscribe((response: any[]) => {
      console.log(response)
      this.citas = response;
      this.dataSource = new MatTableDataSource<any>(this.citas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public handleGoToHistorialMedico(id: number, name: string, lastname: string) {
    console.log(id);
    this.router.navigate(['/gestion/historial-medico', id], { queryParams: { nombre: (name + " " + lastname )} });
  }

  public handleDeleteProduct(id: number) {
    if (id) {
      Swal.fire({
        title: 'Seguro de desea eliminar el medico?',
        text: "Los cambios no se podran revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          //TODO DELETE MEDICO:
          this.medicosService.deleteMedicosById(id)
          .pipe(
            catchError( error => {
              this.toastr.error('Error al eliminar el medico');
              throw new Error(error);
            })
          )
          .subscribe( (response: any) => {
            this.toastr.success('Medico eliminado correctamente');
            this.ngOnInit();
          });
        }
      })
    }
  }

}
