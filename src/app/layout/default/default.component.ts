import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '@zsx/core/auth/auth.service';
import { Route, Router, Routes } from '@angular/router';
import { PermissionService } from '../../routes/permission.service';

@Component({
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class LayoutDefaultComponent implements OnInit {

  isCollapsed = false;
  triggerTemplate = null;
  initSelected: string;
  menuList: Routes;

  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  constructor(private authService: AuthService, private router: Router, private permissionService: PermissionService) {
    this.menuList = this.permissionService.menuList;
  }

  ngOnInit() {
    this.initSelected = this.router.url;
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout() {
    this.authService.deAuthorize();
  }
}
