import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { LoginComponent } from './passport/login/login.component';
import { AppFunctionComponent } from './dashboard/app-function/app-function.component';
import { MemberComponent } from './dashboard/member/member.component';
import { PackComponent } from './dashboard/pack/pack.component';
import { DangerDirective } from './danger.directive';
import { AppFunctionModalComponent } from './dashboard/app-function/modal/app-function-modal.component';
import { MemberModalComponent } from './dashboard/member/modal/member-modal.component';
import { PackModalComponent } from './dashboard/pack/modal/pack/pack-modal.component';
import { PriceModalComponent } from './dashboard/pack/modal/price-modal.component';
import { BindModalComponent } from './dashboard/pack/modal/bind-modal.component';
import { CustomerFeedbackComponent } from './dashboard/feedback/customer/customer.component';
import { DataFeedbackComponent } from './dashboard/feedback/data/data.component';
import { StatusPipe } from '@zsx/core/pipe/status.pipe';
import { AppEnvModalComponent } from './dashboard/app-env/modal/app-env-modal.component';
import { AppEnvComponent } from './dashboard/app-env/app-env.component';

@NgModule({
  declarations: [
    // component
    LoginComponent,
    WelcomeComponent,
    AppEnvComponent,
    AppFunctionComponent,
    MemberComponent,
    PackComponent,
    DangerDirective,
    BindModalComponent,
    CustomerFeedbackComponent,
    DataFeedbackComponent,

    // modal
    AppFunctionModalComponent,
    AppEnvModalComponent,
    MemberModalComponent,
    PackModalComponent,
    PriceModalComponent,

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
    AppEnvModalComponent,
    AppFunctionModalComponent,
    MemberModalComponent,
    PackModalComponent,
    PriceModalComponent,
    BindModalComponent
  ],
  exports: [RoutesRoutingModule]
})
export class RoutesModule {
}
