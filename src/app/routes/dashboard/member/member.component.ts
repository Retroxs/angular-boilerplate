import { Component, Injector, OnInit } from '@angular/core';
import { MemberModalComponent } from './modal/member-modal.component';
import { MemberService } from './member.service';
import { BaseTableComponent } from '@zsx/core/base.component';
import { AclService } from '@zsx/core/acl.service';

@Component({
  templateUrl: './member.component.html',
})
export class MemberComponent extends BaseTableComponent implements OnInit {

  queryForm = this.fb.group({
    name: [''],
  });

  constructor(protected injector: Injector,
              protected service: MemberService,
              private aclService: AclService
  ) {
    super(injector);
    this.acl = this.aclService.global_acl['MEMBER_ACL'];
  }

  ngOnInit() {
    super.ngOnInit();
  }

  showModal() {
    this.openModal({
      nzTitle: '添加会员配置',
      nzContent: MemberModalComponent,
      source$: (componentInstance: MemberModalComponent) => this.service.create(componentInstance.memberForm.value)
    });

  }

  showEditModal(member) {
    this.openModal({
      nzTitle: '更新会员配置',
      nzContent: MemberModalComponent,
      nzComponentParams: {
        member,
      },
      source$: (componentInstance: MemberModalComponent) => this.service.update({
        ...componentInstance.memberForm.value,
        member_id: member.member_id
      })
    });
  }

  delete({member_id}) {
    this.service.delete({member_id}).pipe(this.doneAndReload).subscribe();
  }
}
