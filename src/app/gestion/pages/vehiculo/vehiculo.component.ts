import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { MedicosService } from '../../services/medicos.service';
import { Apollo, gql } from 'apollo-angular';


interface Vehiculo {
  id: number;
  placa: string;
  marca: string;
  modelo: string,
  anioFabricacion: number;
  numeroChasis: string;
  color: string;
}

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'placa', 'marca', 'modelo', 'anioFabricacion', 'numeroChasis', 'color', 'accion'];
  public dataSource: any;
  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild('alertForm') alertForm!: TemplateRef<any>;
  public alertRef!: MatDialogRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public custonForm: FormGroup = this.formBuilder.group({
    'placa': ['', Validators.required],
    'marca': ['', Validators.required],
    'modelo': ['', Validators.required],
    'anioFabricacion': ['', Validators.required],
    'numeroChasis': ['', Validators.required],
    'color': ['', Validators.required],
  });

  public vehiculos: Vehiculo[] = [
    // {
    //     "id": 1,
    //     "placa": "ABC123",
    //     "marca": "Volvo",
    //     "modelo": "FH16",
    //     "anioFabricacion": 2019,
    //     "numeroChasis": "1XKFD49X2JJ123456",
    //     "color": "Blanco"
    // },
    // {
    //     "id": 2,
    //     "placa": "DEF456",
    //     "marca": "Mercedes-Benz",
    //     "modelo": "Actros",
    //     "anioFabricacion": 2020,
    //     "numeroChasis": "WDB9340351L123456",
    //     "color": "Azul"
    // },
    // {
    //     "id": 3,
    //     "placa": "GHI789",
    //     "marca": "Scania",
    //     "modelo": "R500",
    //     "anioFabricacion": 2018,
    //     "numeroChasis": "YS2R6X20005212345",
    //     "color": "Rojo"
    // },
    // {
    //     "id": 4,
    //     "placa": "JKL012",
    //     "marca": "Kenworth",
    //     "modelo": "T680",
    //     "anioFabricacion": 2021,
    //     "numeroChasis": "1XKYD49X4MJ123456",
    //     "color": "Negro"
    // },
    // {
    //     "id": 5,
    //     "placa": "MNO345",
    //     "marca": "Mack",
    //     "modelo": "Anthem",
    //     "anioFabricacion": 2017,
    //     "numeroChasis": "1M1AN4GY6LM123456",
    //     "color": "Verde"
    // }
]


  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private vehiculosService: MedicosService,
    private toastr: ToastrService,
    private apollo: Apollo,
  ) {

  }

  ngOnInit(): void {
    this.getVehiculos();

  }

  public openDialog() {
    this.alertRef = this.dialog.open(this.alertForm);
  }

  public handleGoToEditPage(id: number) {

  }

  public handleDeleteVehicle(id: number) {

  }

  public fieldValidator(name: string): boolean | null {
    return this.custonForm.controls[`${name}`].errors && this.custonForm.controls[`${name}`].touched;
  }


  public submitForm(): void {
    if (this.custonForm.invalid) {
      this.custonForm.markAllAsTouched();
      this.toastr.warning('Rellene los campos obligatorios');
    } else {
      this.registerVehicle();
      this.toastr.success('Vehículo agregado exitosamente');
      this.custonForm.reset();
      this.alertRef.close();
    }
  }

  public handleDeleteVehiculo(id: number) {
    if (id) {
      Swal.fire({
        title: '¿Seguro que desea eliminar el vehículo?',
        text: "Los cambios no se podrán revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.vehiculos = this.vehiculos.filter(vehiculo => vehiculo.id !== id);
          this.dataSource.data = this.vehiculos; // Actualizar la tabla
          this.toastr.success('Vehículo eliminado correctamente');
        }
      })
    }
  }

  registerVehicle() {
    const REGISTER_VEHICLE = gql`
      mutation RegisterVehicle($createVehiculoInput: CreateVehiculoInput!) {
        create(createVehiculoInput: $createVehiculoInput) {
          id
          placa
          marca
          modelo
          anioFabricacion
          numeroChasis
          color
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: REGISTER_VEHICLE,
        variables: {
          createVehiculoInput: this.custonForm.value,
        },
      })
      .subscribe(
        (response: any) => {
          console.log('Vehículo registrado:', response.data.create);
          this.vehiculos = response.data.create;
          this.dataSource = new MatTableDataSource(this.vehiculos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error al registrar el vehículo:', error);
        }
      );
  }

  public getVehiculos(){
    this.apollo
    .watchQuery({
      query: gql`
        {
          vehiculos {
            id
            placa
            marca
            modelo
            anioFabricacion
            numeroChasis
            color
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.vehiculos = result.data.vehiculos;
      this.dataSource = new MatTableDataSource(this.vehiculos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
