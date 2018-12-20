import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { LoginComponent } from './passport/login/login.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';

@NgModule({
  declarations: [LoginComponent, WelcomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
