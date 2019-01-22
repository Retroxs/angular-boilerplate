import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './passport/login/login.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { AppFunctionComponent } from './dashboard/app-function/app-function.component';
import { PackComponent } from './dashboard/pack/pack.component';
import { MemberComponent } from './dashboard/member/member.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { CustomerFeedbackComponent } from './dashboard/feedback/customer/customer.component';
import { DataFeedbackComponent } from './dashboard/feedback/data/data.component';
import { AppEnvComponent } from './dashboard/app-env/app-env.component';
import { AppConfigTemplateComponent } from './dashboard/app-config/template/app-config-template.component';
import { AppConfigComponent } from './dashboard/app-config/app-config.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard/welcome', pathMatch: 'full'},
  {
    path: 'dashboard',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent,
        data: {
          excluded: true
        }
      },
      {
        path: 'basic',
        data: {
          title: '基础配置',
          icon: 'home'
        },
        children: [
          {
            path: 'admin', component: AppEnvComponent,
            data: {
              title: '管理员',
              permission: [
                '/v1/admin/register',
                '/v1/admin/update',
                '/v1/admin/set-password',
                '/v1/admin/delete',
                '/v1/admin/index',
                '/v1/admin/info'
              ],
            }
          },
          {
            path: 'role', component: AppEnvComponent,
            data: {
              title: '角色',
              permission: [
                '/v1/role/index',
                '/v1/role/add',
                '/v1/role/edit',
                '/v1/role/delete',
                '/v1/role/all-list',
                '/v1/role/assign',
              ],
            }
          },
          {
            path: 'rule', component: AppEnvComponent,
            data: {
              title: '权限',
              permission: [
                '/v1/admin-rule-group/index',
                '/v1/admin-rule-group/add',
                '/v1/admin-rule-group/edit',
                '/v1/admin-rule-group/delete',
                '/v1/admin-rule-group/all-list',
                '/v1/admin-rule/index',
                '/v1/admin-rule/add',
                '/v1/admin-rule/edit',
                '/v1/admin-rule/delete',
                '/v1/admin-rule/list-with-group',
                '/v1/admin-rule/assign'
              ],
            }
          }
        ]
      },

      {
        path: 'env', component: AppEnvComponent,
        data: {
          title: '数据项',
          icon: 'home',
          permission: [
            '/v1/function/index',
            '/v1/function/add',
            '/v1/function/edit',
            '/v1/function/set-status',
            '/v1/function/delete',
            '/v1/function/info'
          ],
        }
      },
      {
        path: 'config', component: AppFunctionComponent,
        data: {
          title: '首页功能配置',
          icon: 'home',
          permission: [
            '/v1/app-func/index',
            '/v1/app-func/add',
            '/v1/app-func/edit',
            '/v1/app-func/set-status',
            '/v1/app-func/delete',
            '/v1/app-func/info',
          ],
        }
      },
      {
        path: 'pack', component: PackComponent,
        data: {
          title: '商品参数',
          icon: 'home',
          permission: [
            '/v1/suit/index',
            '/v1/suit/add',
            '/v1/suit/edit',
            '/v1/suit/info',
            '/v1/suit/selected',
            '/v1/suit/edit-price',
            '/v1/suit/check-suit-by-name',
            '/v1/suit/set-status',
            '/v1/suit/delete',
            '/v1/suit/bind-member'
          ],
        }
      },
      {
        path: 'member', component: MemberComponent,
        data: {
          title: '会员',
          icon: 'home',
          permission: [
            '/v1/member/index',
            '/v1/member/add',
            '/v1/member/edit',
            '/v1/member/delete',
            '/v1/member/info'
          ],
        }
      },

      {
        path: 'feedback',
        data: {
          title: '反馈管理',
          icon: 'home'
        },
        children: [
          {
            path: 'feedback_user', component: CustomerFeedbackComponent,
            data: {
              title: '用户反馈',
              permission: [
                '/v1/feedback/index'
              ],
            }
          },
          {
            path: 'feedback_data', component: DataFeedbackComponent,
            data: {
              title: '数据项反馈',
              permission: [
                '/v1/function-apply/index'
              ],
            }
          },
        ]
      },


      {
        path: 'app_config_template', component: AppConfigTemplateComponent,
        data: {
          title: 'app配置模版',
          icon: 'home',
          permission: [
            '/v1/app-config/index',
            '/v1/app-config/add',
            '/v1/app-config/delete'
          ],
        }
      },
      {
        path: 'app_config/:name', component: AppConfigComponent,
        data: {
          title: 'app配置',
          permission: [
            '/v1/app-config-origin/index',
            '/v1/app-config-origin/add',
            '/v1/app-config-origin/edit',
            '/v1/app-config-origin/delete'
          ],
          excluded: true
        }
      },
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
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
