import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioModel } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recordar = false;
  email: string;
  password: string;
  password2: string;


  constructor( public router: Router,
              private _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recordar = true;
    }
  }

  ingresar(form: NgForm) {

    let usuario = new UsuarioModel(null, form.value.email, form.value.password);

    this._usuarioService.login(usuario, form.value.recordar).subscribe( resp => {
      this.router.navigate(['/dashboard']);
    });
  }

}
