import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './app-config-template-modal.component.html'
})
export class AppConfigTemplateModalComponent {

  appConfigTemplateForm = this.fb.group({
    title: [''],
    name: [],
    type: ['text'],
    option: ['']
  });

  typeSelects = [
    {key: 'text', label: '文本框'},
    {key: 'checkbox', label: '复选框'},
    {key: 'select', label: '下拉框'},
    {key: 'radio', label: '单选框'},
    {key: 'textarea', label: '富文本框'},
  ];


  constructor(private fb: FormBuilder) {
  }

}
