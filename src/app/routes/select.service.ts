import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuerySearch } from '@zsx/core/net/rest.decorators';
import { Observable } from 'rxjs';
import { Response } from '@zsx/core/net/response.interface';

export interface Select {
  label: string;
  value: string;
}

interface SelectList {
  [key: string]: Select[];
}

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'select';

  @QuerySearch()
  fetch(params): Observable<Response<SelectList>> {
    return this.http.get<Response<SelectList>>(`${this.baseUrl}/index`, {params});
  }
}
