import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Admin } from '../basic-admin.service';
import { BaseSelect } from '@zsx/core/base.component';

@Component({
  templateUrl: './basic-admin-modal.component.html'
})
export class BasicAdminModalComponent extends BaseSelect implements OnInit {

  @Input() admin: Admin;

  basicAdminForm = this.fb.group({
    user_name: [''],
    nick_name: [''],
    password: [''],
    repassword: [''],
    status: [1],
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    if (this.admin) {
      this.basicAdminForm.patchValue({...this.admin});
    }
  }

}
