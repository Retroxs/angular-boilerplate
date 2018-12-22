import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@zsx/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit(): void {
    const user = this.loginForm.value;
    if (user.username === 'admin' && user.password === '111') {
      this.authService.Authorize('token', '/');
    } else {
      console.log('password is incorrect');
    }
  }

}
