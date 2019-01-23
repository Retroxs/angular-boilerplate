import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select, SelectService } from '../../../../select.service';

@Component({
  templateUrl: './app-config-modal.component.html'
})
export class AppConfigModalComponent implements OnInit {

  @Input() config: any;
  @Input() template_origin: any;
  appConfigForm = this.fb.group({
    name: [''],
    app_id: [],
    value: [],
    version_code: [],
    channel_code: [''],
  });

  app_list: Select[];

  template: any;

  constructor(private fb: FormBuilder, private selectService: SelectService) {
    this.fetchSelects();
  }

  get config_value() {
    return this.appConfigForm.value.value;
  }

  fetchSelects() {
    this.selectService.fetch({'flag[]': ['app_list']}).subscribe(res => this.app_list = res.data['app_list']);
  }

  ngOnInit() {

    this.template = JSON.parse(JSON.stringify(this.template_origin));

    /**
     * 编辑的时候把表单重置
     */
    if (this.config) {

      const {name, app_id, value, version_code, channel_code} = this.config;
      this.appConfigForm.reset({
        name,
        value,
        app_id: {value: app_id, disabled: true},
        version_code: {value: version_code, disabled: true},
        channel_code: {value: channel_code, disabled: true}
      });

      if (this.template.type === 'checkbox') {
        this.template.option.forEach(option => {
          if (this.config.value.indexOf(String(option.value)) > -1) {
            option.checked = true;
          }
        });
      }

    } else {
      this.appConfigForm.patchValue({name: this.template.name});
    }
  }

  disposeCheckbox() {
    const value = this.template.option.filter(option => option.checked).map(option => option.value);
    this.appConfigForm.patchValue({value});
  }

}
