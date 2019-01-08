import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd';
import { Member } from '../member.service';

@Component({
  templateUrl: './member-modal.component.html',
})
export class MemberModalComponent implements OnInit {

  @Input() member: Member;

  memberForm = this.fb.group({
    name: [''],
    logo: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.member) {
      this.memberForm.patchValue({...this.member});
    }
  }

  get logoUrl() {
    return this.memberForm.value.logo;
  }

  handleUploadChange($event: UploadChangeParam) {
    const res = $event.file.response;
    if (res) {
      const logo = res.data.url;
      this.memberForm.patchValue({logo});
    }
  }
}
