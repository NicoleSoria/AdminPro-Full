import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
              private title: Title,
              private meta: Meta ) { 

    this.getDataReoute().subscribe( evento => {
      this.titulo = evento.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'Description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {
  }

  getDataReoute(): Observable<any> {
    return this.router.events.pipe( 
            filter( evento => evento instanceof ActivationEnd ),
            filter( (evento: ActivationEnd) => evento.snapshot.firstChild == null ),
            map( (evento: ActivationEnd) => evento.snapshot.data )
          )
  }
}
