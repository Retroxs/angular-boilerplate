import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';
import { TableResponse, Response } from '@zsx/core/net/response.interface';

export interface Pack {
  suit_id: string;
  suit_name: string;
  origin_price: string;
  price: string;
  create_time: string;
  has_app: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackService {

  constructor(private http: HttpClient) {}

  baseUrl = 'suit';

  @QuerySearch()
  fetch(params) {
    return this.http.get<TableResponse<Pack[]>>(`${this.baseUrl}/index`, {params});
  }

  fetchMembers(params) {
    return this.http.get<Response>(`${this.baseUrl}/bind-member`, {params});
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
  updatePrice(data) {
    return this.http.post(`${this.baseUrl}/edit-price`, data);
  }

  @FormEncode()
  bindMember(data) {
    return this.http.post(`${this.baseUrl}/bind-member`, data);
  }

  @FormEncode()
  delete(data) {
    return this.http.post(`${this.baseUrl}/delete`, data);
  }

  findById(params) {
    return this.http.get<Response<any>>(`${this.baseUrl}/info`, {params});
  }
}
