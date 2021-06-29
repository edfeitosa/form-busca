import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeWhile } from 'rxjs/operators';

import { AgenciasService } from '../../services/agencias.service';

@Component({
  selector: 'component-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {

  formInput!: FormGroup;
  private itemValido$: Subject<any> = new Subject();
  private inscrito: boolean = true;
  @Output() validado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private agenciasService: AgenciasService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.changeForm();
    this.getAgencias();
  }

  ngOnDestroy(): void {
    this.inscrito = false;
  }

  private createForm(): void {
    this.formInput = this.formBuilder.group({
      nome: ''
    });
  }

  private changeForm(): void {
    this.formInput.get('nome')!.valueChanges
    .pipe(takeWhile(() => this.inscrito))
    .subscribe(() => this.itemValido$.next());
  }

  private getAgencias(): void {
    this.itemValido$
      .pipe(
        takeWhile(() => this.inscrito),
        debounceTime(1000),
        switchMap(() => this.agenciasService.getAgencias())
      )
      .subscribe(
        dados => this.validado.emit(dados['valido']),
        erro => console.log(erro)
      )
  }

}
