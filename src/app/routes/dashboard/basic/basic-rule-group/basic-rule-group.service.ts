import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormEncode, QuerySearch } from '@zsx/core/net/rest.decorators';
import { Observable } from 'rxjs';
import { TableResponse } from '@zsx/core/net/response.interface';

export interface RuleGroup {
  group_id: string;
  name: string;
  create_time: string;
  update_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class BasicRuleGroupService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'admin-rule-group';

  @QuerySearch()
  fetch(params): Observable<TableResponse<RuleGroup[]>> {
    return this.http.get<TableResponse<RuleGroup[]>>(`${this.baseUrl}/index`, {params});
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
}
