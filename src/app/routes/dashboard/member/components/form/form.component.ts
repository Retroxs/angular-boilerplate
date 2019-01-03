import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class MemberFormComponent implements OnInit {

  @Input() member: any;
  envForm = this.fb.group({
    name: [''],
    logo: [''],
  });
  avatarUrl: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.member) {
      const {name, logo} = this.member;
      this.envForm.setValue({name, logo});
      this.avatarUrl = logo;
    }
  }

  handleChange($event: UploadChangeParam) {
    const res = $event.file.response;
    if (res) {
      this.avatarUrl = res.data.url;
      this.envForm.patchValue({logo: this.avatarUrl});
    }
  }
}
