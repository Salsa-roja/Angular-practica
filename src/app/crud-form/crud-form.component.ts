import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/Usuario.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/Usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.css']
})
export class CrudFormComponent implements OnInit {
  public createForm: FormGroup;
 
  public accion: String = '';
  public usuario: Usuario = new Usuario();
  public passErrors:String[]=[] 
  public passLengthErr=""

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private UsuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar

  ) {
    this.createForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      email: ['', Validators.email],
      password: ['',Validators.email],
      pass_repeat: ['']
    });
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
    if (this.id ) {
      this.accion = 'Actualizar';
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
    }
  }

  public regresar() {
    this.router.navigate(['crud']);
  }
  public onSubmit() {
    
     if(this.id!=0){
      const contrasenaControl = this.createForm.get('password');
      if (contrasenaControl && contrasenaControl.value) {
        contrasenaControl.clearValidators();
        contrasenaControl.updateValueAndValidity();
      }
     }
      
    if (this.createForm.valid) {
      this.UsuarioService.saveOrUpdate(this.createForm.value)
        .subscribe({

          next: ((result) => {
            this.router.navigate(['crud']);
           
          }

          )
        });
    }else{
      console.log('error')
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
}
