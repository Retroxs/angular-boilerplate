import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseSelect } from '@zsx/core/base.component';
import { Role } from '../basic-role.service';

@Component({
  templateUrl: './basic-role-modal.component.html'
})
export class BasicRoleModalComponent extends BaseSelect implements OnInit {

  @Input() role: Role;

  basicRoleForm = this.fb.group({
    name: [''],
    status: [1],
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    if (this.role) {
      this.basicRoleForm.patchValue({...this.role});
    }
  }

}
