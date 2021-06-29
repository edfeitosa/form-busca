import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgenciasService {

  constructor(private http: HttpClient) { }

  getAgencias(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/agencias')
      .pipe(
        take(1),
        tap(sucesso => sucesso),
        catchError(erro => throwError(erro))
      );
  }

}
