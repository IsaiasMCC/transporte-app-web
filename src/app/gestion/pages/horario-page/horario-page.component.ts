import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { HorariosService } from '../../services/horarios.service';
import { HorariosEspecialidadesService } from '../../services/horarios-especialidades.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-horario-page',
  templateUrl: './horario-page.component.html',
  styleUrls: ['./horario-page.component.css']
})
export class HorarioPageComponent implements OnInit  {
  public displayedColumns: string[] = ['id', 'especialidad', 'dia', 'hora', 'medico', 'accion'];
  public dataSource: any;
  @ViewChild(MatSort)
  public sort!: MatSort;

  @ViewChild('alertForm') alertForm!: TemplateRef<any>;
  public alertRef!: MatDialogRef<any>;

  @ViewChild('alertFormFichas') alertFormFichas!: TemplateRef<any>;
  public alertRefFichas!: MatDialogRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public custonForm: FormGroup = this.formBuilder.group({
    'fecha': [new Date(), Validators.required],
    'medicoId': ['', Validators.required],
    'horarioId': ['', Validators.required],
    'especialidadId': ['', Validators.required]
  });


  public horarios: any[] = [];
  public horarios_especialidades: any[] = [];
  public medicos: any[] = [];
  public especialidades: any[] = [];
  fechaControl = new FormControl(new Date());

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private horarioService: HorariosService,
    private especialidadService: EspecialidadService,
    private medicosService: MedicosService,
    private horariosEspecialidadesService: HorariosEspecialidadesService
  ) {
    this.getHorarios();
    this.getEspecialidades();
    this.getMedicos();
    this.getHorariosEspecialidades();
  }

  ngOnInit(): void {
    this.getHorariosEspecialidades();
  }

  public openDialog() {
    this.alertRef = this.dialog.open(this.alertForm);
  }
  public openDialogFichas(id: number) {
    this.alertRefFichas = this.dialog.open(this.alertForm);
  }

  public fieldValidator(name: string): boolean | null {
    return this.custonForm.controls[`${name}`].errors && this.custonForm.controls[`${name}`].touched;
  }

  public changeSelect(event: any): void {
    this.custonForm.patchValue({
      [`${event.target.name}`]: event.target.value
    })
  }

  public submitForm(): void {
    if (this.custonForm.invalid) {
      this.custonForm.markAllAsTouched();
      this.toastr.warning('Rellene los campos obligatorios');
    } else {
      this.horariosEspecialidadesService.registerHorarioEspecialidad(this.custonForm.value)
        .pipe(
          catchError(err => {
            this.toastr.error('HorarioEspecialidad no agregada');
            console.log(err);
            throw new Error(err);
          }
          )
        )
        .subscribe((response: any) => {
          this.toastr.success('Horario agregado exitosamente');
            this.ngOnInit();
            this.custonForm.reset();
            this.alertRef.close();
        });
      }
  }



  public getEspecialidades() {
    this.especialidadService.getEspecialidades()
    .pipe(
      catchError(error => {
        this.toastr.error('Error al cargar los datos');
        return of([])
      })
    )
    .subscribe((response: any[]) => {
      console.log(response)
      this.especialidadService.setEspecialidades(response);
      this.especialidades = this.especialidadService.especialidades;

    });
  }

  public getHorarios() {
    this.horarioService.getHorarios()
    .pipe(
      catchError(error => {
        this.toastr.error('Error al cargar los datos');
        return of([])
      })
    )
    .subscribe((response: any[]) => {
      console.log(response)
      this.horarioService.setHorarios(response);
      this.horarios = this.horarioService.horarios;
      // this.dataSource = new MatTableDataSource<any>(this.horarios);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }

  public getHorariosEspecialidades() {
    this.horariosEspecialidadesService.getHorariosEspecialidades()
    .pipe(
      catchError(error => {
        this.toastr.error('Error al cargar los datos');
        return of([])
      })
    )
    .subscribe((response: any[]) => {
      console.log(response)
      this.horariosEspecialidadesService.setHorariosEspecialidades(response);
      this.horarios_especialidades = this.horariosEspecialidadesService.horariosEspecialidades;
      this.dataSource = new MatTableDataSource<any>(this.horarios_especialidades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public getMedicos() {
    this.medicosService.getMedicos()
    .pipe(
      catchError(error => {
        this.toastr.error('Error al cargar los datos');
        return of([])
      })
    )
    .subscribe((response: any[]) => {
      console.log(response)
      this.medicosService.setMedicos(response);
      this.medicos = this.medicosService.medicos;
    });
  }

  public handleGoToEditPage(id: number) {
    console.log(id);
  }
  public handleGoToCreateFicha(id: number) {
    this.router.navigate(['gestion/fichas', id]);
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
          this.horarioService.getHorarioById(id)
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
