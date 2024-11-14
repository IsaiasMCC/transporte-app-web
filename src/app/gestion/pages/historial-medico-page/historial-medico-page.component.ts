import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { HistorialesService } from '../../services/historiales.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historial-medico-page',
  templateUrl: './historial-medico-page.component.html',
  styleUrls: ['./historial-medico-page.component.css']
})
export class HistorialMedicoPageComponent implements OnInit {
  public id: string | null = null;
  public historialMedico: any = null;
  public nombre: string = "Historial Medica:";
  fechaControl = new FormControl(new Date());
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private historialesService: HistorialesService
  ) {
    // this.getFichas();
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
     this.nombre = "Historial Medico: "+ params['nombre'];
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.custonFormFichas.get("pacienteId")?.setValue(this.id);
    this.getHistorialMedico();
  }

  public custonFormFichas: FormGroup = this.formBuilder.group({
    'title': ['', Validators.required],
    'description': ['', Validators.required],
    'pacienteId': ['', Validators.required]
  });



  public submitFormFichas(): void {
    if (this.custonFormFichas.invalid) {
      this.custonFormFichas.markAllAsTouched();
      this.toastr.warning('Rellene los campos obligatorios');
    } else {
        this.historialesService.registerHistoriales(this.custonFormFichas.value)
        .pipe(
          catchError(err => {
            this.toastr.error('Historial Medico no agregada');
            console.log(err);
            throw new Error(err);
          }
          )
        )
        .subscribe((response: any) => {
          this.toastr.success('Historial Medico agregado exitosamente');
            this.ngOnInit();
            this.getHistorialMedico();
            this.custonFormFichas.reset();
        });
      }
  }

  public getHistorialMedico() {
    this.historialesService.getHistorialPacienteById(this.id )
    .pipe(
      catchError(error => {
        this.toastr.warning('El paciente no tiene historial medico');
        return of([])
      })
    )
    .subscribe((response: any) => {
      console.log(response)
      this.historialMedico = response;
      if (this.historialMedico !== null) {
        this.custonFormFichas.patchValue({title: this.historialMedico.title, description: this.historialMedico.description, pacienteId: this.historialMedico.paciente.id})
      }
    });
  }

  volverAtras() {
    this.location.back()
  }
}
