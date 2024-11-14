import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

import Swal from 'sweetalert2';
import { EspecialidadService } from 'src/app/gestion/services/especialidad.service';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HorariosEspecialidadesService } from 'src/app/gestion/services/horarios-especialidades.service';
import { FichasService } from 'src/app/gestion/services/fichas.service';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-reserva-ficha',
  templateUrl: './reserva-ficha.component.html',
  styleUrls: ['./reserva-ficha.component.css']
})
export class ReservaFichaComponent implements OnInit {
  servicios: any[] = [];
  especialidades: any[] = [];
  diasDisponibles: any[] = [];
  horariosDisponibles: any[] = [];
  fichasDisponibles: any[] = [];
  especialidadId = null;
  isAuthenticated$ = this.authService.isAuthenticated$;

  @ViewChild('serviceSelect', { static: true }) serviceSelect!: ElementRef;
  @ViewChild('horaFicha', { static: true }) horaFicha!: ElementRef;
  @ViewChild('fechaFicha', { static: true }) fechaFicha!: ElementRef;

  public formFichas: FormGroup = this.fb.group({
    'especialidad': ['', Validators.required],
    'nombre': ['', Validators.required],
    'apellido': ['', Validators.required],
    'fecha': ['', Validators.required],
    'hora': ['', Validators.required],
    'fichaId': ['', Validators.required],
    'pacienteId': ['', Validators.required]
  });
  isAuthenticated: boolean = false;
  userNameInitial: any = null
  rol = null
  user: any = null;
  constructor(
    private fb: FormBuilder,
    private fichaService: FichasService,
    private authService: AuthService,
    private especialidadService: EspecialidadService,
    private horariosEspecialidades: HorariosEspecialidadesService,
    private citasService: CitasService,
    private toastr: ToastrService,
    private renderer: Renderer2,
  ) {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.user = this.authService.getUser();
    if (this.user !== null) {
      this.formFichas.patchValue({ pacienteId: this.user.id, nombre: this.user.nombre, apellido: this.user.apellido })
    }
  }

  ngOnInit(): void {
    this.userNameInitial = this.authService.getUser();
    this.rol = this.user.rol;
    this.getEspecialidades();
  }


  onServiceSelect(event: any) {
    console.log(event)
    this.especialidadId = event.target.value;
    this.getDias();
    this.formFichas.patchValue({ especialidad: event.srcElement.selectedOptions[0].innerText});
    this.addOption(this.especialidadId!, event.srcElement.selectedOptions[0].innerText);
  }

  onDaySelect(event: any) {
    console.log(event.target.value);
    this.formFichas.patchValue({ hora: event.srcElement.selectedOptions[0].innerText });
    this.getFichasDisponibles(event.target.value);
  }

  onHorarioSelect(event: any) {
    const fecha = event.srcElement.selectedOptions[0].innerText
    this.formFichas.patchValue({ fecha: this.convertDateToYYYYMMDD(fecha.split('-')[0]) });
    this.formFichas.patchValue({ fichaId: event.target.value });
  }

  onSubmit() {
    if (this.formFichas.invalid) {
      this.toastr.warning('Ficha invalida');
      console.log(this.formFichas.value)
    } else {

      this.citasService.createCita(this.formFichas.value)
      .pipe(
        catchError(err => {
          this.toastr.error('Error al crear cita');
          console.log(err);
          throw new Error(err);
        }
        )
      )
      .subscribe((response: any) => {
        this.toastr.success('Cita creada exitosamente');
        Swal.fire('Ficha reservada con éxito');
          this.ngOnInit();
          this.formFichas.reset();
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
        this.especialidades = this.especialidadService.especialidades
      });
  }

  public getDias() {
    this.horariosEspecialidades.getDias(this.especialidadId!)
      .pipe(
        catchError(error => {
          this.toastr.error('Error al cargar los datos');
          return of([])
        })
      )
      .subscribe((response: any[]) => {
        console.log(response)
        this.diasDisponibles = response
      });
  }

  public getFichasDisponibles(id: number) {
    this.fichaService.getAllFichasById(id)
      .pipe(
        catchError(error => {
          this.toastr.error('Error al cargar los datos');
          return of([])
        })
      )
      .subscribe((response: any[]) => {
        console.log(response)
        this.fichasDisponibles = response
      });
  }

  addOption(value: string, name: string) {
    this.serviceSelect.nativeElement.innerHTML = '';
    const opcion = this.renderer.createElement('option');
    this.renderer.setProperty(opcion, 'value', value);
    this.renderer.setProperty(opcion, 'textContent', name);
    this.renderer.appendChild(this.serviceSelect.nativeElement, opcion);

    // Seleccionar automáticamente la opción agregada
    this.renderer.setProperty(this.serviceSelect.nativeElement, 'value', value);
  }

  convertDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  logout(): void {
    this.authService.logout();
  }

}
