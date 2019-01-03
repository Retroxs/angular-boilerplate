import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Env, EnvService } from '../../env.service';

@Component({
  selector: 'env-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class EnvFormComponent implements OnInit {

  @Input() env: Env;
  @Input() id: string;
  envForm = this.fb.group({
    fn_code: [''],
    define: [''],
    remark: [''],
    status: ['1'],
  });

  constructor(private fb: FormBuilder, private envService: EnvService) {
  }

  ngOnInit() {
    if (this.id) {
      const {fn_code, define, remark, status} = this.env;
      this.envForm.setValue({fn_code, define, remark, status: String(status)});
    }
  }


}
