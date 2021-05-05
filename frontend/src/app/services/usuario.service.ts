import { UsuarioModel } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlService } from '../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UploadArchivosService } from './upload-archivos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: UsuarioModel;
  token: string;

  constructor( public http: HttpClient,
              public router: Router,
              public _uploadService: UploadArchivosService ) { 

                this.usuario = JSON.parse(localStorage.getItem('usuario'));
                this.token = localStorage.getItem('token');
              }

  registrarUsuario( usuario: UsuarioModel ) {

    let url = urlService + 'usuario'

    return this.http.post(url, usuario).pipe(map( (resp: any) => {

      Swal.fire('Usuarios creado', usuario.email, 'success');
      return resp.usuario;
    }))
  }

  login( usuario: UsuarioModel, recordar: boolean = false ) {

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }
    else {
      localStorage.removeItem('email');
    }

    let url = urlService + 'login';
    return this.http.post( url, usuario ).pipe(map( (resp: any) => {

      // localStorage.setItem('id', resp.id);
      // localStorage.setItem('token', resp.token);
      // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      this.guardarStorange(resp.id, resp.token, resp.usuario);

      return true;
    }));
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  estaLogueado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  actualizarUsuario(usuario: UsuarioModel) {

    let url = urlService + 'usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map( (resp: any) => {
        this.guardarStorange(resp.usuario._id, this.token, resp.usuario);  
        Swal.fire('Usuario actualizado', usuario.nombre, 'success');

        return true;
      })
    );
  }

  actualizarImagen(archivo: File, id: string) {

    this._uploadService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {
            this.usuario.img = resp.usuario.img;
            Swal.fire('Imagen actualizado', this.usuario.nombre, 'success');

            this.guardarStorange( id, this.token, this.usuario );

          })
          .catch( error => {
            console.log(error);
          });
  }

  getUsuarios(desde: number = 0) {

    let url = urlService + 'usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = urlService + `busqueda/coleccion/usuarios/${termino}`;

    return this.http.get(url);
  }

  borrarUsuario(usuario: UsuarioModel) {
    let url = urlService + `usuario/${usuario._id}?token=${this.token}`;

    return this.http.delete(url);
  }


  private guardarStorange(id: string, token: string, usuario: UsuarioModel){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }
}
