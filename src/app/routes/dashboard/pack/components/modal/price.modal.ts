import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  template: `
    <form nz-form [formGroup]="priceForm">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">套餐实际价格</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="origin_price">
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">套餐原价</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="price">
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
})
export class PriceModalComponent implements OnInit {

  @Input() price;

  constructor(private fb: FormBuilder) {
  }

  priceForm = this.fb.group({
    price: [''],
    origin_price: ['']
  });

  ngOnInit(): void {
    this.priceForm.setValue({...this.price});
  }

}
