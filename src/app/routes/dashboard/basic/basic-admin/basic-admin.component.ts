import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@zsx/core/base.component';
import { Admin, BasicAdminService } from './basic-admin.service';
import { BasicAdminModalComponent } from './modal/basic-admin-modal.component';
import { BasicAdminAssignRoleModalComponent } from './modal/basic-admin-assign-role-modal/basic-admin-assign-role-modal.component';
import { BasicRoleService } from '../basic-role/basic-role.service';

@Component({
  templateUrl: './basic-admin.component.html'
})
export class BasicAdminComponent extends BaseTableComponent implements OnInit {

  dataSet: Admin[];
  queryForm = this.fb.group({
    user_name: [''],
    nick_name: ['']
  });

  constructor(
    protected injector: Injector,
    protected service: BasicAdminService,
    private  basicRoleService: BasicRoleService
  ) {
    super(injector);
  }


  showModal() {
    this.openModal({
      nzTitle: '注册管理员',
      nzContent: BasicAdminModalComponent,
      source$: (componentInstance: BasicAdminModalComponent) => this.service.create(componentInstance.basicAdminForm.value)
    });
  }

  showEditModal(admin) {
    this.openModal({
      nzTitle: '更新管理员',
      nzContent: BasicAdminModalComponent,
      nzComponentParams: {
        admin,
      },
      source$: (componentInstance: BasicAdminModalComponent) => this.service.update({
        ...componentInstance.basicAdminForm.value,
        admin_id: admin.admin_id
      })
    });
  }

  showRoleAssignModel(admin_id) {
    this.openModal({
      nzTitle: '分配角色',
      nzContent: BasicAdminAssignRoleModalComponent,
      nzComponentParams: {
        id: admin_id
      },
      source$: (componentInstance: BasicAdminAssignRoleModalComponent) => this.basicRoleService.assign({
        role_id: componentInstance.checkedRole,
        admin_id
      })
    });
  }

  delete(admin_id) {
    this.service.delete({admin_id}).pipe(this.doneAndReload).subscribe();
  }

  ngOnInit() {
    super.ngOnInit();
  }


}
