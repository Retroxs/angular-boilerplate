import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class ConfigFormComponent implements OnInit {

  @Input() id: object;
  envForm = this.fb.group({
    a: [''],
    b: [''],
    c: [''],
    d: [''],
  });

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

}
