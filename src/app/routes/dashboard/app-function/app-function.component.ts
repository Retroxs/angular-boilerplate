import { Component, Injector, OnInit } from '@angular/core';
import { AppFunctionModalComponent } from './modal/app-function-modal.component';
import { AppFunctionService, Pid } from './app-function.service';
import { BaseTableComponent } from '@zsx/core/base.component';
import { PackService } from '../pack/pack.service';
import { Select, SelectService } from '../../select.service';

@Component({
  templateUrl: './app-function.component.html'
})
export class AppFunctionComponent extends BaseTableComponent implements OnInit {

  queryForm = this.fb.group({
    name: [''],
    app_id: [undefined],
  });

  app_list: Select[];

  constructor(
    protected injector: Injector,
    protected service: AppFunctionService,
    private selectService: SelectService
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fetchSelects();
  }

  fetchSelects() {
    this.selectService.fetch({'flag[]': ['app_list']}).subscribe(res => this.app_list = res.data['app_list']);
  }

  showModal() {
    this.openModal({
      nzTitle: '添加配置',
      nzContent: AppFunctionModalComponent,
      nzComponentParams: {
        appList: this.app_list
      },
      source$: (componentInstance: AppFunctionModalComponent) => this.service.create(componentInstance.appFunctionForm.value)
    });

  }

  showEditModal(data) {
    this.openModal({
      nzTitle: '更新配置',
      nzContent: AppFunctionModalComponent,
      nzComponentParams: {
        config: data,
        appList: this.app_list
      },
      source$: (componentInstance: AppFunctionModalComponent) => this.service.update({
        ...componentInstance.appFunctionForm.value,
        id: data.id
      })
    });
  }

  setStatus({id, status}) {
    this.service.setStatus({id, status: (+status ? 0 : 1)}).pipe(this.doneAndReload).subscribe();
  }

}
