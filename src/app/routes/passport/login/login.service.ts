import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Response } from '@zsx/core/net/response.interface';
import { AuthService } from '@zsx/core/auth/auth.service';
import { FormEncode } from '@zsx/core/net/rest.decorators';
import qs from 'qs';

interface Token {
  token: string;
  expire: number;
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
