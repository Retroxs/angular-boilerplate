import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigFormComponent } from './components/form/form.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.less'],
})
export class ConfigComponent implements OnInit {
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
      nzContent: ConfigFormComponent,
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
      nzContent: ConfigFormComponent,
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
