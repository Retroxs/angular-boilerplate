import { Injectable } from '@angular/core';
import { TokenService } from '@zsx/core/auth/token.service';

export interface ACL {
  show: string | boolean;
  create: string | boolean;
  update: string | boolean;
  destroy: string | boolean;

  [key: string]: string | boolean;
}


export interface ACLSET {
  [key: string]: ACL;
}

export const ADMIN_ACL: ACL = {
  show: '/v1/admin/info',
  create: '/v1/admin/register',
  update: '/v1/admin/update',
  destroy: '/v1/admin/delete',
  role_list: '/v1/role/all-list',
  assign_role: '/v1/role/assign',
};

export const ROLE_ACL: ACL = {
  show: '',
  create: '/v1/role/add',
  update: '/v1/role/edit',
  destroy: '/v1/role/delete',
  rule_list: '/v1/admin-rule/list-with-group',
  assign_rule: '/v1/admin-rule/assign'
};

export const RULE_ACL: ACL = {
  show: '/v1/admin-rule/info',
  create: '/v1/admin-rule/add',
  update: '/v1/admin-rule/edit',
  destroy: '/v1/admin-rule/delete',
};

export const RULE_GROUP_ACL: ACL = {
  show: '/v1/admin-rule-group/info',
  create: '/v1/admin-rule-group/add',
  update: '/v1/admin-rule-group/edit',
  destroy: '/v1/admin-rule-group/delete',
  all_list: '/v1/admin-rule-group/all-list'
};

export const ENV_ACL: ACL = {
  show: '/v1/function/info',
  create: '/v1/function/add',
  update: '/v1/function/edit',
  destroy: '/v1/function/delete',
  set_status: '/v1/function/set-status'
};

export const CONFIG_ACL: ACL = {
  show: '/v1/app-func/info',
  create: '/v1/app-func/add',
  update: '/v1/app-func/edit',
  destroy: '/v1/app-func/delete',
  set_status: '/v1/app-func/set-status'
};

export const PACK_ACL: ACL = {
  show: '/v1/suit/info',
  create: '/v1/suit/add',
  update: '/v1/suit/edit',
  destroy: '/v1/suit/delete',
  set_status: '/v1/suit/set-status',
  selected: '/v1/suit/selected',
  edit_price: '/v1/suit/edit-price',
  check_suit_by_name: '/v1/suit/check-suit-by-name',
  bind_member: '/v1/suit/bind-member',
};

export const MEMBER_ACL: ACL = {
  show: '/v1/member/info',
  create: '/v1/member/add',
  update: '/v1/member/edit',
  destroy: '/v1/member/delete',
};

export const USER_FEEDBACK_ACL: ACL = {
  show: '',
  create: '',
  update: '',
  destroy: '',
};

export const ENV_FEEDBACK_ACL: ACL = {
  show: '',
  create: '',
  update: '',
  destroy: '',
};

export const APP_CONFIG_TEMPLATE_ACL: ACL = {
  show: '',
  create: '/v1/app-config/add',
  update: '',
  destroy: '/v1/app-config/delete',
};

export const APP_CONFIG_ACL: ACL = {
  show: '',
  create: '/v1/app-config-origin/add',
  update: '/v1/app-config-origin/edit',
  destroy: '/v1/app-config-origin/delete',
};


export const Global_ACL: ACLSET = {
  ADMIN_ACL,
  ROLE_ACL,
  RULE_ACL,
  RULE_GROUP_ACL,
  ENV_ACL,
  CONFIG_ACL,
  PACK_ACL,
  MEMBER_ACL,
  USER_FEEDBACK_ACL,
  ENV_FEEDBACK_ACL,
  APP_CONFIG_TEMPLATE_ACL,
  APP_CONFIG_ACL,
};

@Injectable({
  providedIn: 'root'
})
export class AclService {
  global_acl: ACLSET = {};

  constructor(private tokenService: TokenService) {
    const _global_acl = JSON.parse(JSON.stringify(Global_ACL));
    for (const key in Global_ACL) {
      for (const acl_key in Global_ACL[key]) {
        // @ts-ignore
        _global_acl[key][acl_key] = this.tokenService.permission.includes(Global_ACL[key][acl_key]);
      }
    }
    this.global_acl = _global_acl;
  }
}
