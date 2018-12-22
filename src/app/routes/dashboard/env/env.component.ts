import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigComponent } from '../config/config.component';

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
      d: 'New York No. 1 Lake Park',
      e: 'New York No. 1 Lake Park'
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
    const modal = this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: ConfigComponent,
      nzComponentParams: {
        title: 'title in component',
      },
      nzFooter: [{
        label: 'change component tilte from outside',
        onClick: (componentInstance) => {
          componentInstance.title = 'title in inner component is changed';
        }
      }]
    });

  }
}
