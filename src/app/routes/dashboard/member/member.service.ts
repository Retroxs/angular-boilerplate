import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableResponse } from '@zsx/core/net/response.interface';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';

export interface Member {
  member_id: string;
  name: string;
  logo: string;
  suit_id: string;
  suit_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) {
  }

  prefix = 'member';

  @QuerySearch()
  fetch(params): Observable<TableResponse<Member[]>> {
    return this.http.get<TableResponse<Member[]>>(`${this.prefix}/index`, {params});
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
}
