import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class Globals {

  apiUrl = `${environment.hostname}${(environment.api_port != "")? ':'+environment.api_port : ''}/`;

  

  get httpOptions(): any {
    let header = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') ??  '',
        
      }
    );
    return header;
  }

  get httpOptionsFormData(): any {
    let header = new HttpHeaders(
      {
        'token': localStorage.getItem('token') ?? '',
        'Authorization': 'Bearer ' + localStorage.getItem('token') ??  '',
      }
    );
    return header;
  }

  get httpOptionsAsync(): any {
    return { headers: new HttpHeaders({}), reportProgress: true };
    // return  { headers: new HttpHeaders({ 'token': this.storage.get('token') }), reportProgress: true };
  }
}
