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
import { RolesService } from '../../services/roles.service';


@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.css']
})
export class RolesPageComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'nombre', 'accion'];
  public dataSource: any;
  @ViewChild(MatSort)
  public sort!: MatSort;

  @ViewChild('alertForm') alertForm!: TemplateRef<any>;
  public alertRef!: MatDialogRef<any>;

  public custonForm: FormGroup = this.formBuilder.group({
    'nombre': ['', Validators.required]
  });

  public roles: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private rolesService: RolesService, private toastr: ToastrService) {
    this.rolesService.getRoles()
    .pipe(
      catchError(error => {
        this.toastr.error('Error al cargar los datos');
        return of([])
      })
    )
    .subscribe((response: any[]) => {
      console.log(response)
      this.rolesService.setRoles(response);
      this.roles = this.rolesService.roles
      this.dataSource = new MatTableDataSource<any>(this.roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit(): void {
    this.getRoles();
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
      this.rolesService.registerRoles(this.custonForm.value)
        .pipe(
          catchError(err => {
             this.toastr.error('Rol no agregada');
            console.log(err);
            throw new Error(err);
          }
          )
        )
        .subscribe(() => {
          //TODO REGISTRER ROLES.
          this.toastr.success('Rol agregado exitosamente');
          this.custonForm.reset();
          this.ngOnInit();
          this.alertRef.close();
        });
    }
  }


  public handleGoToEditPage(id: number) {
    console.log(id);

  }

  public handleDeleteProduct(id: number) {
    if (id) {
      Swal.fire({
        title: 'Seguro de desea eliminar este rol?',
        text: "Los cambios no se podran revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          //TODO DELETE ESPECIALIDAD:
          this.rolesService.deleteRolesById(id)
          .pipe(
            catchError( error => {
              this.toastr.error('Error al eliminar el rol');
              throw new Error(error);
            })
          )
          .subscribe( (response: any) => {
            this.toastr.success('Rol eliminado correctamente');
            this.ngOnInit();
          });
        }
      })
    }
  }


  public getRoles() {
    this.rolesService.getRoles()
    .pipe(
      catchError(error => {
        this.toastr.error('Error al cargar los datos');
        return of([])
      })
    )
    .subscribe((response: any[]) => {
      console.log(response)
      this.rolesService.setRoles(response);
      this.roles = this.rolesService.roles
      this.dataSource = new MatTableDataSource<any>(this.roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
