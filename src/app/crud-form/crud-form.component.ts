import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/Usuario.Service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/Usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.css']
})
export class CrudFormComponent implements OnInit {
  public createForm: FormGroup;

  public accion: String = '';
  public usuario: Usuario = new Usuario();
  public passErrors: String[] = []
  public passLengthErr = ""
  public loginActivo: boolean = false;

  constructor(
    public Ahut: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private UsuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar

  ) {
    this.createForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      pass_repeat: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  public id?: number;

  ngOnInit(): void {

    this.detalle();


  }

  public detalle() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    console.log(this.id)
    if (this.id) {
      this.accion = 'Actualizar';
      this.loginActivo = true;

      this.UsuarioService.getDetalleUsuarioId(this.id).subscribe(
        (response: any) => {
          if (response) {
            this.createForm.patchValue(
              this.usuario = response
            );
          }
        }
      );
    } else {
      this.accion = 'Agregar';
      this.loginActivo = false;

    }
  }

  public crud() {
    this.router.navigate(['crud']);
  }
  public logut() {
    this.router.navigate(['']);
  }
  public onSubmit() {

    if (this.id) {
      if (this.createForm.valid) {
        this.UsuarioService.saveOrUpdate(this.createForm.value)
          .subscribe({
            next: ((result) => {

              console.log(result.info.msg)
              this.router.navigate(['crud']);
            }
            )
          });
      } else {
        console.log('error update')
      }
    }

    if (this.id == undefined) {
      console.log(this.createForm);

      if (this.createForm.valid && this.createForm != undefined) {
        this.UsuarioService.guardar(this.createForm.value)
          .subscribe({
            next: ((result: any) => {
              if (!result.msg) {
                let params = { 'email': this.createForm.value['email'], 'password': this.createForm.value['password'] }
                this.Ahut.login(params).subscribe(
                  (result) => {
                    this.openSnackBar(result.message, 'Cerrar');
                    if (result.status === true) {

                      this.router.navigate(['crud']);
                    }
                  })
              } else {
                this.openSnackBar(result.msg, 'error 400')
              }
            }
            )
          });
      } else {
        console.log('error save')
      }
    }

  }
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }
  public passValid() {
    let pass = this.createForm.value["password"]
    this.passErrors = []
    if (pass.length >= 8) {
      if (pass === pass.toLowerCase()) this.passErrors.push("usa una letra mayúscula")
      if (pass === pass.toUpperCase()) this.passErrors.push("usa una letra minúscula")
      if (!/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(pass)) this.passErrors.push("usa un caracter especial")
      if (!/\d/.test(pass)) this.passErrors.push("usa un número")
      if (pass !== this.createForm.value["pass_repeat"]) this.passErrors.push("Las contraseñas deben coincidir")
      this.passLengthErr = ""
    } else {
      this.passLengthErr = "La contraseña debe tener al menos de 8 caracteres"
    }
  }

  producto() {

    var Cantidad_articulos_producidos;
    var Utilidad_total;

    const Precio_de_venta_por_Unidad = 10;
    const Horas_de_trabajo = 5;
    const Horas_laborables = 40;
    Cantidad_articulos_producidos = Horas_laborables / Horas_de_trabajo;
    Utilidad_total = Precio_de_venta_por_Unidad *
      Cantidad_articulos_producidos;
    console.log("Utilidad total :" + Utilidad_total);
    console.log("Cantidad de articulos producidos :" +
      Cantidad_articulos_producidos);
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const passRepeat = control.get('pass_repeat');

    if (password && passRepeat && password.value !== passRepeat.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }


}
