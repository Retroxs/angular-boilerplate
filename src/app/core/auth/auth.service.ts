import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig } from './auth.config';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private authConfig: AuthConfig, private tokenService: TokenService, private http: HttpClient) {}


  Authorize(token, redirectTo) {
    this.tokenService.set(token);
    this.router.navigateByUrl(redirectTo);
  }

  deAuthorize() {
    this.tokenService.remove();
    this.router.navigate([this.authConfig.login_path]);
  }

  checkAuthorization(path: string): boolean {

    // 如果path在路由守卫数组中，并且没有授权，跳转登陆页
    if (this.authConfig.next_routes.indexOf(path) >= 0) {
      if (!this.tokenService.get()) {
        this.router.navigate([this.authConfig.login_path]);
        return false;
      } else {
        return true;
      }
    }

    if (path === this.authConfig.login_path) {
      if (this.tokenService.get()) {
        this.router.navigate([this.authConfig.home_path]);
        return false;
      } else {
        return true;
      }
    }
  }
}
