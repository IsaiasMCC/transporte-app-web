import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EspecialidadService } from '../../services/especialidad.service';

import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-cargas-page',
  templateUrl: './cargas-page.component.html',
  styleUrls: ['./cargas-page.component.css']
})
export class CargasPageComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'fecha', 'nombre', 'peso', 'conductor', 'accion'];
  public dataSource: any;
  @ViewChild(MatSort)
  public sort!: MatSort;

  @ViewChild('alertForm') alertForm!: TemplateRef<any>;
  public alertRef!: MatDialogRef<any>;

  public custonForm: FormGroup = this.formBuilder.group({
    'fecha': ['', Validators.required],
    'nombre': ['', Validators.required],
    'origen_lat': ['', Validators.required],
    'origen_lng': ['', Validators.required],
    'destino_lat': ['', Validators.required],
    'destino_lng': ['', Validators.required],
    'peso': ['', Validators.required],
    'descripcion': ['', Validators.required],
    'conductor': ['', Validators.required],
  });
  public usuarios: any[] = []
  public cargas: any[] = [
    {
      "id": 1,
      "fecha": "2024-11-13",
      "nombre": "Carga A",
      "origen": {
        "lat": "-17.7862900",
        "long": "-63.1811700"
      },
      "destino": {
        "lat": "-17.8000000",
        "long": "-63.1600000"
      },
      "peso": 500,
      "descripcion": "Carga de productos electrónicos",
      "conductor": {
        "id": 101,
        "nombre": "Juan",
        "apellido": "Pérez"
      }
    },
    {
      "id": 2,
      "fecha": "2024-11-14",
      "nombre": "Carga B",
      "origen": {
        "lat": "-17.7850000",
        "long": "-63.1750000"
      },
      "destino": {
        "lat": "-17.7950000",
        "long": "-63.1550000"
      },
      "peso": 300,
      "descripcion": "Carga de alimentos perecederos",
      "conductor": {
        "id": 102,
        "nombre": "Carlos",
        "apellido": "Gómez"
      }
    },
    {
      "id": 3,
      "fecha": "2024-11-15",
      "nombre": "Carga C",
      "origen": {
        "lat": "-17.7900000",
        "long": "-63.1800000"
      },
      "destino": {
        "lat": "-17.8050000",
        "long": "-63.1700000"
      },
      "peso": 700,
      "descripcion": "Carga de materiales de construcción",
      "conductor": {
        "id": 103,
        "nombre": "Ana",
        "apellido": "Martínez"
      }
    },
    {
      "id": 4,
      "fecha": "2024-11-16",
      "nombre": "Carga D",
      "origen": {
        "lat": "-17.7855000",
        "long": "-63.1850000"
      },
      "destino": {
        "lat": "-17.7955000",
        "long": "-63.1650000"
      },
      "peso": 250,
      "descripcion": "Carga de ropa",
      "conductor": {
        "id": 104,
        "nombre": "Luis",
        "apellido": "Torres"
      }
    },
    {
      "id": 5,
      "fecha": "2024-11-17",
      "nombre": "Carga E",
      "origen": {
        "lat": "-17.7800000",
        "long": "-63.1900000"
      },
      "destino": {
        "lat": "-17.7950000",
        "long": "-63.1600000"
      },
      "peso": 600,
      "descripcion": "Carga de maquinaria pesada",
      "conductor": {
        "id": 105,
        "nombre": "Pedro",
        "apellido": "Ramírez"
      }
    }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private especialidadService: EspecialidadService,
    private toastr: ToastrService,
    private router: Router,
    private apollo: Apollo
  ) {

  }
  ngOnInit(): void {
    this.getCargas();
    this.getUsuarios()
  }

  public openDialog() {
    this.alertRef = this.dialog.open(this.alertForm);
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
      this.registerCarga()
      this.toastr.success('Carga agregada exitosamente');
      this.custonForm.reset();
      this.ngOnInit();
      this.alertRef.close();

    }
  }

  private resetForm(): void {
    this.custonForm.patchValue({
      name: '',
      description: '',
      state: ''
    });
    this.custonForm.markAsUntouched();
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
        this.cargas = this.especialidadService.especialidades
        this.dataSource = new MatTableDataSource<any>(this.cargas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }


  public handleGoToEditPage(id: number) {
    console.log(id);

  }
  public handleGoToMapRoute(id: number, origen: any, destino: any) {
    console.log(origen, destino)
    this.router.navigate(['/gestion/maps', id], { queryParams: { origen: JSON.stringify(origen), destino: JSON.stringify(destino) } });

  }

  public handleDeleteProduct(id: number) {
    if (id) {
      Swal.fire({
        title: 'Seguro de desea eliminar esta especialidad?',
        text: "Los cambios no se podran revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          //TODO DELETE ESPECIALIDAD:
          this.especialidadService.deleteEspecialidadById(id)
            .pipe(
              catchError(error => {
                this.toastr.error('Error al eliminar el especialidad');
                throw new Error(error);
              })
            )
            .subscribe((response: any) => {
              this.toastr.success('Especialidad eliminado correctamente');
              this.ngOnInit();
            });
        }
      })
    }
  }

  registerCarga() {
    const REGISTER_CARGA = gql`
      mutation RegisterCarga($createCargasInput: CreateCargasInput!) {
        createCargas(createCargasInput: $createCargasInput) {
            id
            fecha
            nombre
            origen {
              lat
              lng
            }
            destino {
              lat
              lng
            }
            peso
            descripcion
            conductor {
              id
              nombre
              apellido
              ci
              telefono
              licencia
              direccion
              email
              password
              rol
            }
        }
      }
    `;

const { __typename, ...conductorData } = this.custonForm.get('conductor')!.value;
    const data = {
      fecha: this.custonForm.get('fecha')!.value,
      nombre: this.custonForm.get('nombre')!.value,
      origen: {
        lat: this.custonForm.get('origen_lat')!.value,
        lng: this.custonForm.get('origen_lng')!.value
      },
      destino: {
        lat: this.custonForm.get('destino_lat')!.value,
        lng: this.custonForm.get('destino_lng')!.value
      },
      peso: this.custonForm.get('peso')!.value,
      descripcion: this.custonForm.get('descripcion')!.value,
      conductor: conductorData,
    }
    console.log(data)
    this.apollo
      .mutate({
        mutation: REGISTER_CARGA,
        variables: {
          createCargasInput: data,
        },
      })
      .subscribe(
        (response: any) => {
          console.log('Vehículo registrado:', response.data.createCargas);
          this.cargas = response.data.createCargas;
          this.dataSource = new MatTableDataSource(this.cargas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error al registrar el vehículo:', error);
        }
      );
  }

  public getCargas() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          cargas {
            id
            fecha
            nombre
            origen {
              lat
              lng
            }
            destino {
              lat
              lng
            }
            peso
            descripcion
            conductor {
              id
              nombre
              apellido
              ci
              telefono
              licencia
              direccion
              email
              password
              rol
            }
          }
        }
      `,
      })
      .valueChanges.subscribe((result: any) => {
        this.cargas = result.data.cargas;
        this.dataSource = new MatTableDataSource(this.cargas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public getUsuarios() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          users {
            id
            nombre
            apellido
            ci
            telefono
            direccion
            licencia
            rol
            email
            password
          }
        }
      `,
      })
      .valueChanges.subscribe((result: any) => {
        this.usuarios = result.data.users;
      });
  }

}
