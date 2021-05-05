import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: any[];
  usuario: UsuarioModel;

  constructor( public _sidebarService: SidebarService,
              public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

  logout() {
    this._usuarioService.logout();
  }

}
