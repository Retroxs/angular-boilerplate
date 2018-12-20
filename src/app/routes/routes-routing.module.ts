import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './passport/login/login.component';
import { PassportComponent } from '../layout/passport/passport.component';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'dashboard/welcome', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'dashboard/welcome', pathMatch: 'full' },
      { path: 'dashboard/welcome', component: WelcomeComponent },
    ],
  },
  {
    path: 'passport',
    component: PassportComponent,
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
