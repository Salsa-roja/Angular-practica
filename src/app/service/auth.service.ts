import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';
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

  public  login(loginForm: any)  {
    const url = `${this.global.apiUrl}api/login`;
    return this.http.get<UsuarioToken>(url, { headers: this.global.httpOptions, params: loginForm });
  }
  // public guardar(params: any): Observable<HttpResponse> {
  //   const url = `${this.global.apiUrl}api/productos`;
  //   return this.http.post<HttpResponse>(url, params, { headers: this.global.httpOptionsFormData });
  // }
}
