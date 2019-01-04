import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: `<nz-checkbox-group [(ngModel)]="memberList"></nz-checkbox-group>`,
})
export class BindModalComponent implements OnInit {

  @Input() memberList;
  @Input() suit_id;

  ngOnInit(): void {
    this.memberList.forEach(m => {
      m.label = m.name;
      m.value = m.member_id;
      if (m.suit_id.indexOf(this.suit_id) > -1) {
        m.checked = true;
      }
    });
    console.log(this.memberList);
  }

}
