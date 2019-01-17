import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PackService } from '../../../pack/pack.service';

@Component({
  templateUrl: './app-config-modal.component.html'
})
export class AppConfigModalComponent implements OnInit {

  @Input() config: any;
  @Input() template: any;
  appConfigForm = this.fb.group({
    name: [''],
    app_id: [],
    value: [],
    version_code: [],
    channel_code: [''],
  });
  selects: any;

  constructor(private fb: FormBuilder, private packService: PackService) {
    this.fetchSelects();
  }

  get config_value() {
    return this.appConfigForm.value.value;
  }

  fetchSelects() {
    this.packService.fetchSelect().subscribe(res => this.selects = res.data);
  }

  ngOnInit() {
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
