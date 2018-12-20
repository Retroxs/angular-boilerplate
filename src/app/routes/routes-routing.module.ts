import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './passport/login/login.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { EnvComponent } from './dashboard/env/env.component';
import { ConfigComponent } from './dashboard/config/config.component';
import { PackComponent } from './dashboard/pack/pack.component';
import { MemberComponent } from './dashboard/member/member.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'dashboard/welcome', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'dashboard/welcome', pathMatch: 'full' },
      { path: 'dashboard/welcome', component: WelcomeComponent },
      { path: 'dashboard/env', component: EnvComponent },
      { path: 'dashboard/config', component: ConfigComponent },
      { path: 'dashboard/pack', component: PackComponent },
      { path: 'dashboard/member', component: MemberComponent }
    ],
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
