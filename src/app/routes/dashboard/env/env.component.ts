import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { EnvFormComponent } from './components/form/form.component';
import { Env, EnvService } from './env.service';
import { BaseComponent } from '@zsx/core/base.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'console-env',
  templateUrl: './env.component.html',
  styleUrls: ['./env.component.less']
})
export class EnvComponent extends BaseComponent implements OnInit {

  dataSet: Env[];
  validateForm = this.fb.group({
    remark: [''],
    fn_code: [''],
    define: [''],
    status: ['']
  });

  constructor(private fb: FormBuilder, private modalService: NzModalService, private envService: EnvService) {
    super();
  }

  ngOnInit(): void {
    this.envService.fetch({page_size: this.pageSize, page: this.pageIndex}).subscribe(v => {
      this.dataSet = v.data.list;
      this.total = v.data.count;
      this.loading = false;
    });
  }

  submitForm(): void {
    this.envService.fetch({page_size: this.pageSize, page: 1, ...this.validateForm.value})
      .subscribe(v => {
        this.dataSet = v.data.list;
        this.total = v.data.count;
        this.pageIndex = 1;
      });
  }

  showModal(): void {
    const modal = this.modalService.create({
      nzTitle: '添加数据项',
      nzContent: EnvFormComponent,
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => {
          this.envService.create(componentInstance.envForm.value)
            .pipe(
              tap(() => modal.destroy()),
              tap(() => this.handleChange())
            ).subscribe();
        }
      }]
    });
  }

  showEditModal(env) {
    const modal = this.modalService.create({
      nzTitle: '更新数据项',
      nzContent: EnvFormComponent,
      nzComponentParams: {
        env,
        id: env.fn_id
      },
      nzFooter: [{
        label: '更新',
        onClick: (componentInstance) => {
          this.envService.update({...componentInstance.envForm.value, fn_id: env.fn_id})
            .pipe(
              tap(() => modal.destroy()),
              tap(() => this.handleChange())
            ).subscribe();
        }
      }]
    });
  }

  showDeleteConfirm(fn_id) {
    const modal = this.modalService.confirm({
      nzTitle: '确认删除此项?',
      nzOnOk: () => this.envService.delete({fn_id})
        .pipe(
          tap(() => modal.destroy()),
          tap(() => this.handleChange())
        ).subscribe()
    });
  }

  handleChange() {
    this.envService.fetch({page_size: this.pageSize, page: this.pageIndex})
      .subscribe(v => {
        this.dataSet = v.data.list;
        this.total = v.data.count;
      });
  }

  changeStatus({fn_id, status}) {
    const modal = this.modalService.confirm({
      nzTitle: '确认更新此项?',
      nzOnOk: () => this.envService.active({fn_id, status: +!status})
        .pipe(
          tap(() => modal.destroy()),
          tap(() => this.handleChange())
        ).subscribe()
    });
  }
}
