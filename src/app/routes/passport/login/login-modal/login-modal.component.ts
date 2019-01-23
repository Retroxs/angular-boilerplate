import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { TokenService } from '@zsx/core/auth/token.service';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '@zsx/core/auth/auth.service';

@Component({
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
  loginForm = this.fb.group({
    user_name: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private tokenService: TokenService,
              private authService: AuthService
  ) {
  }


  onLogin() {
    const user = this.loginForm.value;

    return this.loginService.login(user).pipe(
      tap(res => this.authService.Authorize({username: user.user_name, token: res.data.token, permission: res.data.rule_list}))
    );
  }

  ngOnInit(): void {
    this.loginForm.patchValue({user_name: this.tokenService.username});
  }

}
