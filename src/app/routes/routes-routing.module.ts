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
import { BasicAdminComponent } from './dashboard/basic/basic-admin/basic-admin.component';
import { BasicRoleComponent } from './dashboard/basic/basic-role/basic-role.component';
import { BasicRuleComponent } from './dashboard/basic/basic-rule/basic-rule.component';
import { BasicRuleGroupComponent } from './dashboard/basic/basic-rule-group/basic-rule-group.component';

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
            path: 'admin', component: BasicAdminComponent,
            data: {
              title: '管理员',
              permission: [
                '/v1/admin/index',
              ]
            }
          },
          {
            path: 'role', component: BasicRoleComponent,
            data: {
              title: '角色',
              permission: [
                '/v1/role/index',
              ],
            }
          },
          {
            path: 'rule_group', component: BasicRuleGroupComponent,
            data: {
              title: '权限组',
              permission: [
                '/v1/admin-rule-group/index'
              ],
            }
          },
          {
            path: 'rule', component: BasicRuleComponent,
            data: {
              title: '权限',
              permission: [
                '/v1/admin-rule/index',
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
            '/v1/function/index'
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
          ],
        }
      },
      {
        path: 'member', component: MemberComponent,
        data: {
          title: '会员',
          icon: 'home',
          permission: [
            '/v1/member/index'
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
          ],
        }
      },
      {
        path: 'app_config/:name', component: AppConfigComponent,
        data: {
          title: 'app配置',
          permission: [
            '/v1/app-config-origin/index',
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
