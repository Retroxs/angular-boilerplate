import { Component, Injector, OnInit } from '@angular/core';
import { AppFunctionModalComponent } from './modal/app-function-modal.component';
import { AppFunctionService, Pid } from './app-function.service';
import { BaseTableComponent } from '@zsx/core/base.component';

@Component({
  templateUrl: './app-function.component.html'
})
export class AppFunctionComponent extends BaseTableComponent implements OnInit {

  queryForm = this.fb.group({
    name: ['']
  });

  constructor(
    protected injector: Injector,
    protected service: AppFunctionService
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  showModal() {
    this.openModal({
      nzTitle: '添加配置',
      nzContent: AppFunctionModalComponent,
      source$: (componentInstance: AppFunctionModalComponent) => this.service.create(componentInstance.appFunctionForm.value)
    });

  }

  showEditModal(data) {
    this.openModal({
      nzTitle: '更新配置',
      nzContent: AppFunctionModalComponent,
      nzComponentParams: {
        config: data,
      },
      source$: (componentInstance: AppFunctionModalComponent) => this.service.update({
        ...componentInstance.appFunctionForm.value,
        id: data.id
      })
    });
  }

  setStatus({id, status}) {
    this.service.setStatus({id, status: +!status}).pipe(this.doneAndReload).subscribe();
  }

}
