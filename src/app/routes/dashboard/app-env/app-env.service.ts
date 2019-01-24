import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableResponse } from '@zsx/core/net/response.interface';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';

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
export class AppEnvService {

  constructor(private http: HttpClient) {}

  baseUrl = 'function';

  @QuerySearch()
  fetch(params): Observable<TableResponse<Env[]>> {
    return this.http.get<TableResponse<Env[]>>(`${this.baseUrl}/index`, {params});
  }

  @FormEncode()
  create(data) {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  @FormEncode()
  update(data) {
    return this.http.post(`${this.baseUrl}/edit`, data);
  }

  @FormEncode()
  delete(data) {
    return this.http.post(`${this.baseUrl}/delete`, data);
  }

  @FormEncode()
  active(data) {
    return this.http.post(`${this.baseUrl}/set-status`, data);
  }
}
