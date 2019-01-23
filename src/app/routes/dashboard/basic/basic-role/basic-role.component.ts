import { Component, Injector, OnInit } from '@angular/core';
import { BasicRoleService, Role } from './basic-role.service';
import { BaseTableComponent } from '@zsx/core/base.component';
import { BasicRoleModalComponent } from './modal/basic-role-modal.component';
import { BasicRoleAssignRuleModalComponent } from './modal/basic-role-assign-rule-modal/basic-role-assign-rule-modal.component';
import { BasicRuleService } from '../basic-rule/basic-rule.service';
import { ACL, AclService } from '@zsx/core/acl.service';

@Component({
  templateUrl: './basic-role.component.html'
})
export class BasicRoleComponent extends BaseTableComponent implements OnInit {

  dataSet: Role[];
  queryForm = this.fb.group({
    name: [''],
  });

  constructor(
    protected injector: Injector,
    protected service: BasicRoleService,
    private basicRuleService: BasicRuleService,
    private aclService: AclService
  ) {
    super(injector);
    this.acl = this.aclService.global_acl['ROLE_ACL'];
  }


  showModal() {
    this.openModal({
      nzTitle: '新增角色',
      nzContent: BasicRoleModalComponent,
      source$: (componentInstance: BasicRoleModalComponent) => this.service.create(componentInstance.basicRoleForm.value)
    });
  }

  showEditModal(role) {
    this.openModal({
      nzTitle: '更新角色',
      nzContent: BasicRoleModalComponent,
      nzComponentParams: {
        role,
      },
      source$: (componentInstance: BasicRoleModalComponent) => this.service.update({
        ...componentInstance.basicRoleForm.value,
        role_id: role.role_id
      })
    });
  }

  showRuleAssignModel(role_id) {
    this.openModal({
      nzTitle: '分配权限',
      nzContent: BasicRoleAssignRuleModalComponent,
      nzComponentParams: {
        id: role_id
      },
      source$: (componentInstance: BasicRoleAssignRuleModalComponent) => this.basicRuleService.assign({
        rule_id: componentInstance.checkedRule,
        role_id
      })
    });
  }

  delete(role_id) {
    this.service.delete({role_id}).pipe(this.doneAndReload).subscribe();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
