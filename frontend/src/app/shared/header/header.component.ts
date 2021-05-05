import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

  logout() {
    this._usuarioService.logout();
  }

}
