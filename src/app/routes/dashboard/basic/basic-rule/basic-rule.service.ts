import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';
import { Observable } from 'rxjs';
import { Response, TableResponse } from '@zsx/core/net/response.interface';

export interface Rule {
  rule_id: string;
  title: string;
  name: string;
  create_time: string;
  status: string;
  group_id?: string;
  is_checked?: number;
  key?: string;
  isLeaf?: boolean;
  isChecked?: boolean;
  checked?: boolean;
}

export interface RuleTree {
  group_id: string;
  name: string;
  rule_list: Rule[];
  title: string;
  key?: string;
  children?: Rule[];
}

@Injectable({
  providedIn: 'root'
})
export class BasicRuleService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'admin-rule';

  @QuerySearch()
  fetch(params): Observable<TableResponse<Rule[]>> {
    return this.http.get<TableResponse<Rule[]>>(`${this.baseUrl}/index`, {params});
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
  fetchRuleTree(params): Observable<Response<RuleTree[]>> {
    return this.http.get<Response<RuleTree[]>>(`${this.baseUrl}/list-with-group`, {params});
  }

  @FormEncode()
  assign(data) {
    return this.http.post(`${this.baseUrl}/assign`, data);
  }
}
