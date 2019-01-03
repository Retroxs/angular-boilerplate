import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class PackFormComponent implements OnInit {

  @Input() id: Object;
  envForm = this.fb.group({
    a: [''],
    b: [''],
    c: [''],
    d: [''],
  });
  tabs = [1, 2, 3];
  apps = [{name: '1', key: '1'}];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.id) {
      this.envForm.setValue({...this.id});
    }
  }

  onSubmit() {
    console.log(this.envForm.value);
  }

  addApp() {
    this.apps.push({name: '1', key: '2'});
  }

  deleteApp(index) {
    this.apps.splice(index, 1);
  }
}
