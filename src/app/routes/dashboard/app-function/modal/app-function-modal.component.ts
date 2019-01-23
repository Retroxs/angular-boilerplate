import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd';
import { Config, AppFunctionService, Pid } from '../app-function.service';
import { BaseSelect } from '@zsx/core/base.component';
import { Select, SelectService } from '../../../select.service';

@Component({
  templateUrl: './app-function-modal.component.html'
})
export class AppFunctionModalComponent extends BaseSelect implements OnInit {

  @Input() config: Config;
  @Input() appList: Select[];
  appFunctionForm = this.fb.group({
    name: [''],
    app_id: [],
    scene_code: [''],
    sort: [''],
    status: [1],
    icon: [''],
    route: [''],
    place_holder: [''],
    pid: [0],
    tags: [''],
  });

  parentPid: Select[];

  constructor(private fb: FormBuilder, private selectService: SelectService) {
    super();
  }

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
    this.selectService.fetch({'flag[]':['app_func']}).subscribe(res => this.parentPid = res.data['app_func']);
  }

  handleUploadChange($event: UploadChangeParam) {
    const res = $event.file.response;
    if (res) {
      const icon = res.data.url;
      this.appFunctionForm.patchValue({icon});
    }
  }
}
