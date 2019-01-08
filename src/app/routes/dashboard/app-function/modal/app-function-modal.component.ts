import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd';
import { Config, AppFunctionService, Pid } from '../app-function.service';

@Component({
  templateUrl: './app-function-modal.component.html'
})
export class AppFunctionModalComponent implements OnInit {

  @Input() config: Config;
  appFunctionForm = this.fb.group({
    name: [''],
    scene_code: [''],
    sort: [''],
    status: [1],
    icon: [''],
    route: [''],
    place_holder: [''],
    pid: [0],
    tags: [''],
  });

  parentPid: Pid[];

  constructor(private fb: FormBuilder, private appFunctionService: AppFunctionService) {}

  get iconUrl() {
    return this.appFunctionForm.value.icon;
  }

  ngOnInit() {
    this.getParentPidList();
    if (this.config) {
      this.appFunctionForm.patchValue({...this.config});
    }
  }

  getParentPidList() {
    this.appFunctionService.fetchSelect().subscribe(res => this.parentPid = res.data);
  }

  handleUploadChange($event: UploadChangeParam) {
    const res = $event.file.response;
    if (res) {
      const icon = res.data.url;
      this.appFunctionForm.patchValue({icon});
    }
  }
}
