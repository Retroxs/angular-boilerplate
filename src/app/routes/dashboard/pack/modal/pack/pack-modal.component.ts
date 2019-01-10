import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd';
import { BaseSelect } from '@zsx/core/base.component';

@Component({
  selector: 'app-form',
  templateUrl: './pack-modal.component.html'
})
export class PackModalComponent extends BaseSelect implements OnInit {

  @Input() pack: any;
  @Input() select: any;
  packForm = this.fb.group({

    suit_name: [''],
    product_id: [''],
    origin_price: [''],
    price: [''],
    per_purchase_limit: [''],
    tag_name: [''],
    recommend: [1],
    scen_type: [0],
    image_url: [''],
    status: [1],

    apps: [''],

    computer_count: [''],
    device_count: [''],
    expire_in: [],

    fun_value: ['']
  });

  apps = [{app_id: '', scen_code: ''}];
  func_list = [{function_code: '', fixid_count: '', expire_in: '', status: 1}];

  _apps = {app_id: '', scen_code: ''};
  _func_list = {function_code: '', fixid_count: '', expire_in: '', status: 1};


  get imageUrl() {
    return this.packForm.value.image_url;
  }
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.packForm.patchValue({});
    if (this.pack) {
      const {apps, fun_value} = this.pack;
      this.packForm.patchValue({...this.pack});
      this.apps = apps;
      this.func_list = fun_value;
    }
  }

  addApp() {
    this.apps.push(this._apps);
  }

  deleteApp(index) {
    this.apps.splice(index, 1);
  }

  addFunc() {
    this.func_list.push(this._func_list);
  }

  deleteFunc(index) {
    this.func_list.splice(index, 1);
  }

  handleUploadChange($event: UploadChangeParam) {
    const res = $event.file.response;
    if (res) {
      this.packForm.patchValue({image_url: res.data.url});
    }
  }

  get allFormValue() {
    this.packForm.patchValue({apps: this.apps, fun_value: this.func_list});
    return this.packForm.value;
  }
}
