import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './passport/login/login.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { EnvComponent } from './dashboard/env/env.component';
import { AppFunctionComponent } from './dashboard/app-function/app-function.component';
import { PackComponent } from './dashboard/pack/pack.component';
import { MemberComponent } from './dashboard/member/member.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { CustomerFeedbackComponent } from './dashboard/feedback/customer/customer.component';
import { DataFeedbackComponent } from './dashboard/feedback/data/data.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'config', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'env', component: EnvComponent},
      {path: 'config', component: AppFunctionComponent},
      {path: 'pack', component: PackComponent},
      {path: 'member', component: MemberComponent},
      {path: 'feedback_user', component: CustomerFeedbackComponent},
      {path: 'feedback_data', component: DataFeedbackComponent}
    ],
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
