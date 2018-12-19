import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PassportComponent } from './passport/passport.component';
import { DefaultComponent } from './default/default.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [PassportComponent, DefaultComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ]
})
export class LayoutModule { }
