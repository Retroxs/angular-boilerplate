import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';
import { Observable } from 'rxjs';
import { TableResponse, Response } from '@zsx/core/net/response.interface';
import { prefillHostVars } from '@angular/core/src/render3/instructions';

export interface Pack {
  suit_id: string;
  suit_name: string;
  origin_price: string;
  price: string;
  create_time: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackService {

  constructor(private http: HttpClient) {
  }

  prefix = 'suit';

  @QuerySearch()
  fetch(params): Observable<TableResponse<Pack[]>> {
    return this.http.get<TableResponse<Pack[]>>(`${this.prefix}/index`, {params});
  }

  fetchSelect() {
    return this.http.get<Response<any>>(`${this.prefix}/selected`);
  }

  fetchMembers(params) {
    return this.http.get<Response<any>>(`${this.prefix}/bind-member`, {params});
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
  updatePrice(data) {
    return this.http.post(`${this.prefix}/edit-price`, data);
  }

  @FormEncode()
  bindMember(data) {
    return this.http.post(`${this.prefix}/bind-member`, data);
  }

  @FormEncode()
  delete(data) {
    return this.http.post(`${this.prefix}/delete`, data);
  }

  findById(params) {
    return this.http.get<Response<any>>(`${this.prefix}/info`, {params});
  }
}
