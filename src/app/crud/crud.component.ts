import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/Usuario.Service';
import { Subject } from 'rxjs';

import { Usuario } from '../model/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  Usuarios: Array<Usuario> = [];
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private UsuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this._getListado();
  }

  private _getListado() {
    this.UsuarioService.getListado().subscribe({
      next: ((result: any) => {
        this.Usuarios = result;
      })

    })
  }
  public form(id: Number) {
    // let currentPath = this.router.routerState.snapshot.url;
    if(id===0){
      this.router.navigate(['formulario']);  
    }else{
      this.router.navigate(['actualizar/'+id]);  
    }
  }

  public eliminar(Usuario: Usuario) {

    this.UsuarioService.eliminar(Usuario.id).subscribe({
      next: (() => {
        this.openSnackBar("Usuario eliminado correctamente", 'Cerrar');

        this._getListado();
      }),

    })

  }
  public logOut() {
    localStorage.clear();
    this.router.navigate(['']);  
  }
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }
}
