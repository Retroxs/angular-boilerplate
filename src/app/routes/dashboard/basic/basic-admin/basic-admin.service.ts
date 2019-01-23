import { Injectable } from '@angular/core';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';
import { Observable } from 'rxjs';
import { TableResponse } from '@zsx/core/net/response.interface';
import { HttpClient } from '@angular/common/http';

export interface Admin {
  admin_id: string;
  user_name: string;
  nick_name: string;
  create_time: string;
  last_login_ip: string;
  last_login_time: string;
  update_time: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class BasicAdminService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'admin';

  @QuerySearch()
  fetch(params): Observable<TableResponse<Admin[]>> {
    return this.http.get<TableResponse<Admin[]>>(`${this.baseUrl}/index`, {params});
  }

  @FormEncode()
  create(data) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  @FormEncode()
  update(data) {
    return this.http.post(`${this.baseUrl}/update`, data);
  }

  @FormEncode()
  delete(data) {
    return this.http.post(`${this.baseUrl}/delete`, data);
  }
}
