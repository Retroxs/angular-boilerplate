import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '@zsx/core/net/response.interface';

export interface Select {
  label: string;
  value: string;
}

export interface SelectList {
  [key: string]: Select[];
}

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'select';

  fetch(params: { 'flag[]': string[] }): Observable<Response<SelectList>> {
    return this.http.get<Response<SelectList>>(`${this.baseUrl}/index`, {params});
  }
}
