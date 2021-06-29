import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mostrarMensagem: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  itemValidado(validado: boolean): void {
    this.mostrarMensagem = validado;
  }

}
