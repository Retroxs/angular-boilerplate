import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';
import { Observable } from 'rxjs';
import { TableResponse, Response } from '@zsx/core/net/response.interface';

export interface Role {
  role_id: string;
  name: string;
  create_time: string;
  update_time: string;
  status: string;
}

export interface RoleCheckbox {
  role_id: string;
  name: string;
  is_checked: string;
  label?: string;
  value?: string;
  checked?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BasicRoleService {


  constructor(private http: HttpClient) {
  }

  baseUrl = 'role';

  @QuerySearch()
  fetch(params): Observable<TableResponse<Role[]>> {
    return this.http.get<TableResponse<Role[]>>(`${this.baseUrl}/index`, {params});
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

  @QuerySearch()
  fetchCheckbox(params): Observable<Response<RoleCheckbox[]>> {
    return this.http.get<Response<RoleCheckbox[]>>(`${this.baseUrl}/all-list`, {params});
  }

  @FormEncode()
  assign(data) {
    return this.http.post(`${this.baseUrl}/assign`, data);
  }
}
