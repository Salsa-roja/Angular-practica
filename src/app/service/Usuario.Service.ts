
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { HttpResponse } from '../model/HttpResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(
    private http: HttpClient,
    private global: Globals
  ) {
  }


  public getListado(): Observable<Usuario[]> {
    const url = `${this.global.apiUrl}api/listing`;
    return this.http.get<Usuario[]>(url, { headers: this.global.httpOptions });
  }

  public saveOrUpdate(params: any): Observable<HttpResponse> {
    const url = `${this.global.apiUrl}api/saveOrUpdate`;
    return this.http.post<HttpResponse>(url, params, { headers: this.global.httpOptionsFormData });
  }
  
  public guardar(params: any): Observable<HttpResponse> {
    const url = `${this.global.apiUrl}api/save`;
    return this.http.post<HttpResponse>(url, params, { headers: this.global.httpOptionsFormData });
  }
  public eliminar(UsuarioId: number) {  
    const url = `${this.global.apiUrl}api/user/${UsuarioId}`;
    return this.http.delete<Usuario[]>(url, { headers: this.global.httpOptions });
  }
  getDetalleUsuarioId(id:number): Observable<Usuario> {
    const url = `${this.global.apiUrl}api/dtailUser/${id}`;
    return this.http.get<Usuario>(url, { headers: this.global.httpOptions });
  }
}
