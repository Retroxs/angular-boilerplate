import { Component, Input, OnInit } from '@angular/core';
import { BasicRoleService, RoleCheckbox } from '../../../basic-role/basic-role.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './basic-admin-assign-role-modal.component.html'
})
export class BasicAdminAssignRoleModalComponent implements OnInit {

  @Input() id: string;
  roleList: RoleCheckbox[];

  constructor(private basicRoleService: BasicRoleService) {
  }

  ngOnInit() {
    this.fetchRoleCheckbox().subscribe(roles => this.roleList = roles);
  }


  fetchRoleCheckbox() {
    return this.basicRoleService.fetchCheckbox({admin_id: this.id}).pipe(
      map(res => res.data),
      map(roles => roles.map(role => {
        role.label = role.name;
        role.value = role.role_id;
        role.checked = !!role.is_checked;
        return role;
      }))
    );
  }

  get checkedRole() {
    return this.roleList.filter(role => role.checked).map(role => role.value);
  }

}
