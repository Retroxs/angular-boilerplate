import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PassportComponent } from './passport/passport.component';
import { LayoutSidebarComponent } from './default/sidebar/sidebar.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutDefaultComponent } from './default/default.component';
import { LayoutHeaderComponent } from './default/header/header.component';

@NgModule({
  declarations: [PassportComponent, LayoutDefaultComponent, LayoutSidebarComponent, LayoutHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ]
})
export class LayoutModule { }
