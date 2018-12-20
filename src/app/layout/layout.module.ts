import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutPassportComponent } from './passport/passport.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutDefaultComponent } from './default/default.component';
import { PageHeaderComponent } from './default/page/header/header.component';

@NgModule({
  declarations: [LayoutPassportComponent, LayoutDefaultComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [
    NgZorroAntdModule,
    PageHeaderComponent
  ]
})
export class LayoutModule {
}
