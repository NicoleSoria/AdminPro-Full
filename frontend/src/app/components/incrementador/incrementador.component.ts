import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda: string;
  @Input() progreso: number = 50;

  @Output() onProgreso: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('inputProgreso') inputProgreso: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onChanges(num: number) {

    if(num >= 100){
      this.progreso = 100;
    }
    else if( num <= 0){
      this.progreso = 0;
    }
    else{
      this.progreso = num;
    }

    this.inputProgreso.nativeElement.value = this.progreso;
    this.onProgreso.emit(this.progreso);
  }

  cambiarValor( valor ) {

    if(this.progreso > 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if(this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;
    this.onProgreso.emit(this.progreso);
    this.inputProgreso.nativeElement.focus();
  }
}
