import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigFormComponent } from './components/form/form.component';
import { ConfigService, Config } from './config.service';
import { map, tap } from 'rxjs/operators';
import { BaseComponent } from '@zsx/core/base.component';

@Component({
  templateUrl: './config.component.html'
})
export class ConfigComponent extends BaseComponent implements OnInit {
  dataSet: Config[];
  queryForm = this.fb.group({
    name: ['']
  });
  select = [];

  constructor(private fb: FormBuilder, private modalService: NzModalService, private configService: ConfigService) {
    super();
  }

  ngOnInit(): void {
    this.search();
    this.configService.fetchSelect().subscribe(v => this.select = v.data);
  }

  showModal(): void {
    const modal = this.modalService.create({
      nzTitle: '添加配置',
      nzContent: ConfigFormComponent,
      nzComponentParams: {
        select: this.select
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => {
          this.configService.create(componentInstance.envForm.value)
            .pipe(
              tap(() => modal.destroy()),
              tap(() => this.search())
            ).subscribe();
        }
      }]
    });

  }

  showEditModal(data) {
    const modal = this.modalService.create({
      nzTitle: '更新配置',
      nzContent: ConfigFormComponent,
      nzComponentParams: {
        config: data,
        select: this.select
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => {
          this.configService.update({...componentInstance.envForm.value, id: data.id})
            .pipe(
              tap(() => modal.destroy()),
              tap(() => this.search())
            ).subscribe();
        }
      }]
    });
  }

  changeStatus({id, status}) {
    const modal = this.modalService.confirm({
      nzTitle: `确认${status ? '隐藏' : '显示'}此项?`,
      nzOnOk: () => this.configService.active({id, status: +!status})
        .pipe(
          tap(() => modal.destroy()),
          tap(() => this.search())
        ).subscribe()
    });
  }

  search(query = this.queryForm.value, page_size = this.pageSize, page = this.pageIndex) {
    this.configService.fetch({...query, page_size, page})
      .pipe(
        map(res => res.data),
        tap(() => this.loading = false)
      )
      .subscribe(data => {
        this.dataSet = data.list;
        this.total = data.count;
      });
  }
}
