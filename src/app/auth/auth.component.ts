import { Component } from '@angular/core';

import { Usuario } from '../model/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UsuarioToken } from '../model/UsuarioToken';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  Usuario!: Usuario[];
  public loginForm: FormGroup;
  public errMessage: string = "";
  loginActivo: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', Validators.required]
      });
  }
  ngOnInit(): void {
    this.singIn();
  }
  public singIn() {
    if (this.loginForm.valid) {

      let params = { ...this.loginForm.value };

      this.authService.login(params).subscribe(
        {
          next: ((result) => {

            this.openSnackBar(result.message, 'Cerrar');

            if (result.status === true) {
              this._saveToken(result.token);
              this.loginActivo = true;
              this.router.navigate(['crud']);  
            } 
          }),
          error: ((error) => {

            switch (error.status) {
              case 500:
                this.errMessage = "La conexión con el servidor ha fallado (500)"
                break;
              case 400:
                this.errMessage = error.error.message
                break;
              case 0:
                this.errMessage = "Error desconocido, intente mas tarde"
                break;
            }

            console.log('completo')
          })

        }
      )
    }
  }

  public logOut() {
    localStorage.clear();
    this.loginActivo =false;
}

public registrarse() {
  this.router.navigate(['formulario']);  
}

  private _saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }
}
