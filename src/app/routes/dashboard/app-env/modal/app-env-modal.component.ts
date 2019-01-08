import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Env } from '../app-env.service';

@Component({
  templateUrl: './app-env-modal.component.html',
})
export class AppEnvModalComponent implements OnInit {

  @Input() env: Env;

  appEnvForm = this.fb.group({
    fn_code: [''],
    define: [''],
    remark: [''],
    status: [1],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.env) {
      this.appEnvForm.patchValue({...this.env});
    }
  }
}
