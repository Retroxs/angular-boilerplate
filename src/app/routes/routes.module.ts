import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { LoginComponent } from './passport/login/login.component';
import { EnvComponent } from './dashboard/env/env.component';
import { ConfigComponent } from './dashboard/config/config.component';
import { MemberComponent } from './dashboard/member/member.component';
import { PackComponent } from './dashboard/pack/pack.component';
import { EnvFormComponent } from './dashboard/env/components/form/form.component';
import { DangerDirective } from './danger.directive';
import { ConfigFormComponent } from './dashboard/config/components/form/form.component';
import { MemberFormComponent } from './dashboard/member/components/form/form.component';
import { PackFormComponent } from './dashboard/pack/components/form/form.component';
import { PriceModalComponent } from './dashboard/pack/components/modal/price.modal';
import { BindModalComponent } from './dashboard/pack/components/modal/bind.modal';

@NgModule({
  declarations: [LoginComponent, WelcomeComponent, EnvComponent, ConfigComponent, MemberComponent, PackComponent, EnvFormComponent, DangerDirective, ConfigFormComponent, MemberFormComponent, PackFormComponent, PriceModalComponent, BindModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
    LayoutModule
  ],
  entryComponents: [EnvFormComponent, ConfigFormComponent, MemberFormComponent, PackFormComponent, PriceModalComponent, BindModalComponent],
  exports: [RoutesRoutingModule]
})
export class RoutesModule {
}
