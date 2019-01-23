import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { TokenService } from '@zsx/core/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  get tokenPermission() {
    return this.tokenService.permission;
  }

  hasPermission = route => route.data.permission.some(p => this.tokenPermission.includes(p));

  // 根据权限列表计算出菜单
  get menuList(): Routes {
    const routes = this.router.config[1].children;
    const permissionRoutes = routes
      .filter(route => !route.data.excluded)
      .filter(route => !route.children ? this.hasPermission(route) : true)
      .map(parentRoute => {
        if (parentRoute.children) {
          parentRoute.children = parentRoute.children.filter(this.hasPermission);
        }
        return parentRoute;
      });
    return permissionRoutes;
  }


}
