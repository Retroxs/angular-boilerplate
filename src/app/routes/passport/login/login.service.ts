import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '@zsx/core/net/response.interface';
import { FormEncode } from '@zsx/core/net/rest.decorators';

interface Token {
  token: string;
  expire: number;
  rule_list: string[];
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) {
  }


  @FormEncode()
  login(user): Observable<Response<Token>> {
    return this.http.post<Response<Token>>('login/account', user);
  }
}
