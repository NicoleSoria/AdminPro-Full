
import { DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustesService: SettingsService ) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this._ajustesService.aplicarTema(tema);
   
  }

  aplicarCheck( link: any ) {

    let selectores: any = document.getElementsByClassName('selector');

    for( let i of selectores ) {
      i.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');

    let tema = this._ajustesService.ajustes.tema;

    for( let i of selectores ) {
      if(i.getAttribute('data-theme') == tema) {
        i.classList.add('working');
        break;
      }
    }
  }
}
