import { Component, OnInit } from '@angular/core';

import { AgenciasService } from '../../services/agencias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private agenciasService: AgenciasService) { }

  ngOnInit(): void {
    this.getAgencias();
  }

  getAgencias(): void {
    this.agenciasService.getAgencias().subscribe(dados => console.log(dados));
  }

}
