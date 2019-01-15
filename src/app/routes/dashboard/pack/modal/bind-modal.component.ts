import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: `
    <nz-table [nzData]="memberList" nzSize="small" [nzShowPagination]="false">
      <thead>
      <tr>
        <th nzShowCheckbox></th>
        <th>会员logo</th>
        <th>会员名称</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let data of memberList">
        <td nzShowCheckbox [(nzChecked)]="data.checked"></td>
        <td><img [src]="data.logo" alt=""></td>
        <td>{{data.name}}</td>
      </tr>
      </tbody>
    </nz-table>
  `,
})
export class BindModalComponent implements OnInit {

  @Input() memberList;
  @Input() suit_id;

  ngOnInit() {
    this.memberList.forEach(m => {
      if (m.suit_id.indexOf(Number(this.suit_id)) > -1) {
        m.checked = true;
      }
    });
  }

  get checkedList() {
    return this.memberList.filter(m => m.checked).map(m => m.member_id);
  }
}
