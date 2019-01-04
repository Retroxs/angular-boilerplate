import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class PackFormComponent implements OnInit {

  @Input() pack: any;
  @Input() select: any;
  packForm = this.fb.group({

    suit_name: [''],
    product_id: [''],
    origin_price: [''],
    price: [''],
    per_purchase_limit: [''],
    tag_name: [''], //
    recommend: ['0'],
    scen_type: ['0'],
    image_url: [''],
    status: ['0'],

    apps: [''],

    computer_count: [''],
    device_count: [''],
    expire_in: [''],

    fun_value: ['']
  });

  apps = [{app_id: '', scen_code: ''}];
  func_list = [{function_code: '', fixid_count: '', expire_in: '', status: '1'}];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.pack) {
      const {
        create_time,
        currency,
        has_app,
        icon,
        origin,
        product,
        subtitle,
        suit_id,
        suit_info,
        suit_tags,
        suit_type,
        version_id,
        apps,
        fun_value,
        ...rest
      } = this.pack;

      this.packForm.setValue({...rest, apps, fun_value});
      this.apps = apps;
      this.func_list = fun_value;
    }
  }

  addApp() {
    this.apps.push({app_id: '', scen_code: ''});
  }

  deleteApp(index) {
    this.apps.splice(index, 1);
  }

  deleteFunc(index) {
    this.func_list.splice(index, 1);
  }

  handleChange($event: UploadChangeParam) {
    const res = $event.file.response;
    if (res) {
      this.packForm.patchValue({image_url: res.data.url});
    }
  }

  addFunc() {
    this.func_list.push({function_code: '', fixid_count: '', expire_in: '', status: '1'});
  }

  allFormValue() {
    this.packForm.patchValue({apps: this.apps, fun_value: this.func_list});
    return this.packForm.value;
  }

  compareFn(o1, o2) {
    return o1 == o2;
  }
}
