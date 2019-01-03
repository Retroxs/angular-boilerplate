import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@zsx/core/auth/auth.service';
import { LoginService } from './login.service';
import qs from 'qs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  loginForm = this.fb.group({
    user_name: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) {
  }

  onSubmit(): void {
    const user = this.loginForm.value;
    this.loginService.login(user).subscribe();
  }

}
