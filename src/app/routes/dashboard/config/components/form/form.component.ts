import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class ConfigFormComponent implements OnInit {

  @Input() config: any;
  @Input() select: any;
  envForm = this.fb.group({
    name: [''],
    scene_code: [''],
    sort: [''],
    status: ['1'],
    icon: [''],
    route: [''],
    pid: [''],
    tags: [''],
  });

  avatarUrl: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.config) {
      console.log(this.config);
      const {name, scene_code, sort, status, icon} = this.config;
      this.envForm.patchValue({name, scene_code, sort, status: String(status), icon});
      this.avatarUrl = icon;
    }
  }

  handleChange($event: UploadChangeParam) {
    const res = $event.file.response;
    if (res) {
      this.avatarUrl = res.data.url;
      this.envForm.patchValue({icon: this.avatarUrl});
    }
  }
}
