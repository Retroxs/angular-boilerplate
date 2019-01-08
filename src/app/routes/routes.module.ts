import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { LoginComponent } from './passport/login/login.component';
import { EnvComponent } from './dashboard/env/env.component';
import { AppFunctionComponent } from './dashboard/app-function/app-function.component';
import { MemberComponent } from './dashboard/member/member.component';
import { PackComponent } from './dashboard/pack/pack.component';
import { EnvFormComponent } from './dashboard/env/components/form/form.component';
import { DangerDirective } from './danger.directive';
import { AppFunctionModalComponent } from './dashboard/app-function/modal/app-function-modal.component';
import { MemberFormComponent } from './dashboard/member/components/form/form.component';
import { PackFormComponent } from './dashboard/pack/components/form/form.component';
import { PriceModalComponent } from './dashboard/pack/components/modal/price.modal';
import { BindModalComponent } from './dashboard/pack/components/modal/bind.modal';
import { CustomerFeedbackComponent } from './dashboard/feedback/customer/customer.component';
import { DataFeedbackComponent } from './dashboard/feedback/data/data.component';
import { StatusPipe } from '@zsx/core/pipe/status.pipe';

@NgModule({
  declarations: [
    // component
    LoginComponent,
    WelcomeComponent,
    EnvComponent,
    AppFunctionComponent,
    MemberComponent,
    PackComponent,
    DangerDirective,
    BindModalComponent,
    CustomerFeedbackComponent,
    DataFeedbackComponent,

    // modal
    EnvFormComponent,
    MemberFormComponent,
    PackFormComponent,
    PriceModalComponent,
    AppFunctionModalComponent,

    // pipe
    StatusPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
    LayoutModule,
  ],
  entryComponents: [
    EnvFormComponent,
    AppFunctionModalComponent,
    MemberFormComponent,
    PackFormComponent,
    PriceModalComponent,
    BindModalComponent
  ],
  exports: [RoutesRoutingModule]
})
export class RoutesModule {
}
