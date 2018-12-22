import { Injectable } from '@angular/core';



@Injectable({providedIn: 'root'})
export class AuthConfig {
  token_key ? = '_token';
  home_path ? = 'dashboard';
  login_path ? = 'passport';
  next_routes = ['dashboard'];
  allow_anonymous_key ? = '_allow_anonymous';
}
