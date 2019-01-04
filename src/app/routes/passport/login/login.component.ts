import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styles: [':host { display: block;width: 368px;margin: 0 auto;}']
})
export class LoginComponent {

  loginForm = this.fb.group({
    user_name: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  onLogin(): void {
    const user = this.loginForm.value;
    this.loginService.login(user).subscribe();
  }
}
