import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './passport/login/login.component';
import { PassportComponent } from '../layout/passport/passport.component';

const routes: Routes = [
  {
    path: 'passport',
    component: PassportComponent,
    children: [
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
