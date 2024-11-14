import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { FichasService } from '../../services/fichas.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent implements OnInit{
  public id: string | null = null;
  public fichas: any[] = [];
  public displayedColumns: string[] = ['id', 'fecha', 'especialidad', 'cantidad', 'cantidad_vendida', 'dia', 'hora', 'medico', 'accion'];
  public dataSource: any;
  @ViewChild(MatSort)
  public sort!: MatSort;

  @ViewChild('alertFormFichas') alertFormFichas!: TemplateRef<any>;
  public alertRefFichas!: MatDialogRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  fechaControl = new FormControl(new Date());
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private fichasService: FichasService
  ) {
    // this.getFichas();
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.custonFormFichas.get("horarioEspecialidadId")?.setValue(this.id);
    this.getFichas();
  }

  public custonFormFichas: FormGroup = this.formBuilder.group({
    'fecha': [new Date(), Validators.required],
    'cantidad': ['', Validators.required],
    'horarioEspecialidadId': ['', Validators.required]
  });

  public openDialog() {
    this.alertRefFichas = this.dialog.open(this.alertFormFichas);
  }


  public submitFormFichas(): void {
    if (this.custonFormFichas.invalid) {
      this.custonFormFichas.markAllAsTouched();
      this.toastr.warning('Rellene los campos obligatorios');
    } else {
        this.fichasService.registerFichas(this.custonFormFichas.value)
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
            this.custonFormFichas.reset();
            this.alertRefFichas.close();
        });
      }
  }

  public getFichas() {
    this.fichasService.getAllFichasById(this.id)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al cargar los datos');
        return of([])
      })
    )
    .subscribe((response: any[]) => {
      console.log(response)
      this.fichasService.setFichas(response);
      this.fichas = this.fichasService.fichas;
      this.dataSource = new MatTableDataSource<any>(this.fichas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
