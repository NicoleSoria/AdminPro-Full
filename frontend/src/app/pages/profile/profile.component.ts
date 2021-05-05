import { UsuarioModel } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  usuario: UsuarioModel;

  imagenSubir: File;
  imagenTemp: any;

  constructor(public _usuarioService: UsuarioService) { 
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: UsuarioModel){
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this._usuarioService.actualizarUsuario(this.usuario).subscribe(resp => {
      
    })
  }

  seleccionImagen(archivo: File) {
    
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es imagen', 'error');
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }
  }

  cambiarImagen() {

    this._usuarioService.actualizarImagen( this.imagenSubir, this.usuario._id );
  }

}
