import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable, catchError, map } from 'rxjs';
import { UsuarioToken } from '../model/UsuarioToken';
import { HttpResponse } from '../model/HttpResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    private global: Globals) {

  }

  public login(loginForm: any): Observable<any> {
    const url = `${this.global.apiUrl}api/login`;

    return this.http.get<UsuarioToken>(url, {
      headers: this.global.httpOptions,
      params: loginForm,
    }).pipe(
      map((result) => {
        // Realiza la lógica de autenticación aquí
        if (result.status === true) {
          localStorage.setItem('token', result.token);
        }
        return result; // Emite el resultado al observable
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
