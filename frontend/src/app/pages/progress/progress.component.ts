import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progresoAzul: number = 50; 
  progresoVerde: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
