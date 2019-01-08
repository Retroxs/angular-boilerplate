import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: `<nz-checkbox-group [(ngModel)]="memberList"></nz-checkbox-group>`,
})
export class BindModalComponent implements OnInit {

  @Input() memberList;
  @Input() suit_id;

  ngOnInit() {
    this.memberList.forEach(m => {
      m.label = m.name;
      m.value = m.member_id;
      if (m.suit_id.indexOf(this.suit_id) > -1) {
        m.checked = true;
      }
    });
  }

  get checkedList() {
    return this.memberList.filter(m => m.checked).map(m => m.member_id);
  }
}
