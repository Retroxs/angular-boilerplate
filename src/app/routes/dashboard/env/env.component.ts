import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { EnvFormComponent } from './components/form/form.component';

@Component({
  selector: 'console-env',
  templateUrl: './env.component.html',
  styleUrls: ['./env.component.less']
})
export class EnvComponent implements OnInit {

  dataSet = [
    {
      a: '1',
      b: 'John Brown',
      c: 32,
      d: '1'
      // e: 'New York No. 1 Lake Park'
    },
  ];
  validateForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['']
  });

  constructor(private fb: FormBuilder, private modalService: NzModalService) {
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    console.warn(this.validateForm.value);
  }

  showModal(): void {
    this.modalService.create({
      nzTitle: '添加数据项',
      nzContent: EnvFormComponent,
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => {
          componentInstance.onSubmit();
        }
      }]
    });

  }

  showEditModal(id) {
    this.modalService.create({
      nzTitle: '更新数据项',
      nzContent: EnvFormComponent,
      nzComponentParams: {
        id
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => {
          componentInstance.onSubmit();
        }
      }]
    });
  }

  showDeleteConfirm() {
    this.modalService.confirm({
      nzTitle: '确认删除此项?',
      nzOnOk: () => this.deleteItem()
    });
  }

  private deleteItem() {
    return undefined;
  }
}
