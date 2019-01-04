import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  create_time: number;
  update_time: number;
  scene_code: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {
  }

  prefix = 'app-func';

  @QuerySearch()
  fetch(params): Observable<TableResponse<Config[]>> {
    return this.http.get<TableResponse<Config[]>>(`${this.prefix}/index`, {params});
  }

  fetchSelect() {
    return this.http.get<Response<any>>(`${this.prefix}/get-select`);
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
