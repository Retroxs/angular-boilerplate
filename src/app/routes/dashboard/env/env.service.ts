import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableResponse } from '@zsx/core/net/response.interface';
import { FormEncode } from '@zsx/core/net/rest.decorators';


export interface Env {
  create_time: string;
  define: string;
  fn_code: string;
  fn_id: number;
  remark: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  constructor(private http: HttpClient) {
  }

  prefix = 'function';

  fetch(params): Observable<TableResponse<Env[]>> {
    return this.http.get<TableResponse<Env[]>>(`${this.prefix}/index`, {params});
  }

  @FormEncode()
  create(data) {
    return this.http.post(`${this.prefix}/add`, data);
  }

  @FormEncode()
  update(data) {
    return this.http.post(`${this.prefix}/edit`, data);
  }

  @FormEncode()
  delete(data) {
    return this.http.post(`${this.prefix}/delete`, data);
  }

  @FormEncode()
  active(data) {
    return this.http.post(`${this.prefix}/set-status`, data);
  }
}
