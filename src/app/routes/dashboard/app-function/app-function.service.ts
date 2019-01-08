import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableResponse, Response } from '@zsx/core/net/response.interface';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';

export interface Config {
  id: number;
  name: string;
  icon: string;
  sort: number;
  status: number;
  route: string;
  tags: string;
  pid: string;
  place_holder: string;
  parent_func_name: string;
  create_time: number;
  update_time: number;
  scene_code: string;
}

export interface Pid {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppFunctionService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'app-func';

  @QuerySearch()
  fetch(params) {
    return this.http.get<TableResponse<Config[]>>(`${this.baseUrl}/index`, {params});
  }

  fetchSelect() {
    return this.http.get<Response<Pid[]>>(`${this.baseUrl}/get-select`);
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
  setStatus(data) {
    return this.http.post(`${this.baseUrl}/set-status`, data);
  }
}
