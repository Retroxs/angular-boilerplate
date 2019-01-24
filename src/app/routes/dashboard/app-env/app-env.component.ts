import { Component, Injector, OnInit } from '@angular/core';
import { AppEnvModalComponent } from './modal/app-env-modal.component';
import { AppEnvService } from './app-env.service';
import { BaseTableComponent } from '@zsx/core/base.component';
import { AclService } from '@zsx/core/acl.service';

@Component({
  templateUrl: './app-env.component.html',
})
export class AppEnvComponent extends BaseTableComponent implements OnInit {

  queryForm = this.fb.group({
    remark: [''],
    fn_code: [''],
    define: [''],
    status: ['']
  });

  constructor(protected injector: Injector,
              protected service: AppEnvService,
              private aclService: AclService
  ) {
    super(injector);
    this.acl = this.aclService.global_acl['ENV_ACL'];
  }

  ngOnInit() {
    super.ngOnInit();
  }


  showModal() {
    this.openModal({
      nzTitle: '添加数据项',
      nzContent: AppEnvModalComponent,
      source$: (componentInstance: AppEnvModalComponent) => this.service.create(componentInstance.appEnvForm.value)
    });

  }

  showEditModal(env) {
    this.openModal({
      nzTitle: '更新数据项',
      nzContent: AppEnvModalComponent,
      nzComponentParams: {
        env,
      },
      source$: (componentInstance: AppEnvModalComponent) => this.service.update({
        ...componentInstance.appEnvForm.value,
        fn_id: env.fn_id
      })
    });
  }

  setStatus({fn_id, status}) {
    this.service.active({fn_id, status: (+status ? 0 : 1)}).pipe(this.doneAndReload).subscribe();
  }

  delete(fn_id) {
    this.service.delete({fn_id}).pipe(this.doneAndReload).subscribe();
  }
}
