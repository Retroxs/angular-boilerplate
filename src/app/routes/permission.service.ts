import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { TokenService } from '@zsx/core/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  menuList: Routes;

  constructor(private tokenService: TokenService,
              private router: Router) {

    const routes = this.router.config[1].children;
    const tokenPermission = this.tokenService.permission;
    const hasPermission = route => route.data.permission.some(p => tokenPermission.includes(p));
    const permissionRoutes = routes
      .filter(route => !route.data.excluded)
      .filter(route => !route.children ? hasPermission(route) : true)
      .map(parentRoute => {
        if (parentRoute.children) {
          parentRoute.children = parentRoute.children.filter(hasPermission);
        }
        return parentRoute;
      });

    this.menuList = permissionRoutes;
  }
}
