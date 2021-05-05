import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import swal from 'sweetalert';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor( private _usuarioService: UsuarioService,
              public router: Router ) { }

  ngOnInit(): void {
    init_plugins();

    this.form = new FormGroup({
      nombre: new FormControl( null,Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.validarContraseñas( 'password', 'password2') });
  }

  registrar() {

    if(this.form.invalid){
      return;
    }

    if(!this.form.value.condiciones){
      Swal.fire('Importante', 'Debe de aceptar las condiciones', 'warning')
      return;
    }

    let usuario = new UsuarioModel(this.form.value.nombre, this.form.value.email, this.form.value.password)

    this._usuarioService.registrarUsuario(usuario).subscribe( resp => {
      console.log(resp);
      
      this.router.navigate(['/login']);
    });
  }


  validarContraseñas(campo1: string, campo2: string) {

    return (group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if( pass1 == pass2 ) {
        return null;
      }
      
      return {
        sonValidas: true
      };
    }
  }
}
