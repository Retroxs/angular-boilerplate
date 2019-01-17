import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormEncode, QuerySearch } from '../../../../core/net/rest.decorators';
import { TableResponse } from '@zsx/core/net/response.interface';

interface AppConfigTemplate {
  id: string;
  title: string;
  name: string;
  option: string;
  type: string;
  created_time: string;
  status: string;
}

interface Option {
  value: string;
  label: string;
}

interface AppConfige {
  id: string;
  title: string;
  name: string;
  type: string;
  created_time: string;
  status: string;
  value: string;
  app_id: string;
  version_code: string;
  channel_code: string;
  update_time: string;
  option: Option[];
  app_name: string;
  is_default: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppConfigTemplateService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'app-config';

  @QuerySearch()
  fetch(params) {
    return this.http.get<TableResponse<AppConfigTemplate[]>>(`${this.baseUrl}/index`, {params});
  }

  @FormEncode()
  create(data) {
    return this.http.post(`${this.baseUrl}/add`, data);
  }


  @FormEncode()
  destroy(data) {
    return this.http.post(`${this.baseUrl}/delete`, data);
  }

}
