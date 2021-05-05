import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObservable()
        //.pipe( retry(2) )
        .subscribe( numero => {console.log("subs", numero)},
                      error => console.error("error", error),
                      () => console.log("termino de recibir datos")
                      
        );

   }

  ngOnDestroy(): void {
    console.log("cerrar la pagina")
    this.subscripcion.unsubscribe();
  }

  ngOnInit(): void {
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      
      let contador = 0;
      let intervalo = setInterval( () => {

        contador += 1;

        let salida = {
          valor: contador
        }

        observer.next( salida );

        // if( contador == 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if( contador == 2) {
        //   //clearInterval(intervalo);
        //   observer.error("Axulio!!")
        // }

      }, 1000);
    }).pipe( 
      map( resp => {
      return resp.valor;
      }),
      filter( (valor, index) => {
        
        if( (valor % 2) === 1) {
          //impar
          return true;
        }
        else {
          //par
          return false;
        }
      })
    )
  }
}
