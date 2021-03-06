import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ignoreElements } from 'rxjs/operators';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
              public router: Router ){}

  canActivate() {

    if(this._usuarioService.estaLogueado()){
      console.log('paso por el guard')
      return true;

    }
    else {
      console.log('No paso por el guard')
      this.router.navigate(['/login']);
      return false;

    }

  }
  
}
