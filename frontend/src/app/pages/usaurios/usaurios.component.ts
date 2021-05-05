import { UsuarioModel } from 'src/app/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usaurios',
  templateUrl: './usaurios.component.html'
})
export class UsauriosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  loading: boolean = true;

  constructor( private _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;

    this._usuarioService.getUsuarios(this.desde).subscribe((resp: any) => { 
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.loading = false;
    })
  }

  buscarUsuario( termino: string ) {
    this.loading = true;

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this._usuarioService.buscarUsuarios(termino).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.loading = false;

    });
  }

  eliminarUsuarios(usuario: UsuarioModel) {

    if(usuario._id == this._usuarioService.usuario._id) {
      Swal.fire('Error', 'No puede eliminar usuario logueado', 'error');
      return;
    }

    Swal.fire({
      title: `Seguro de borrar ${usuario.nombre}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._usuarioService.borrarUsuario(usuario).subscribe( (resp: any) => {
          Swal.fire('Eliminado!', `Se elimino el usuario: ${resp.usuario.nombre}`, 'success');
          this.cargarUsuarios();
        });

      } else if (result.isDenied) {
        Swal.fire('Cambios no generados', '', 'info')
      }
    })
  }
  
  cambiarDesde(valor: number) {

    let desde = this.desde + valor;

    if( desde >= this.totalRegistros ) {
      return;
    }

    if( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

}
