import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@zsx/core/base.component';
import { BasicRuleService, Rule } from './basic-rule.service';
import { BasicRuleModalComponent } from './modal/basic-rule-modal.component';
import { AclService } from '@zsx/core/acl.service';

@Component({
  templateUrl: './basic-rule.component.html'
})
export class BasicRuleComponent extends BaseTableComponent implements OnInit {

  dataSet: Rule[];
  queryForm = this.fb.group({
    title: [''],
    name: ['']
  });

  constructor(
    protected injector: Injector,
    protected service: BasicRuleService,
    private aclService: AclService
  ) {
    super(injector);
    this.acl = this.aclService.global_acl['RULE_ACL'];
  }


  showModal() {
    this.openModal({
      nzTitle: '新增权限',
      nzContent: BasicRuleModalComponent,
      source$: (componentInstance: BasicRuleModalComponent) => this.service.create(componentInstance.basicRuleForm.value)
    });
  }

  showEditModal(rule) {
    this.openModal({
      nzTitle: '更新权限',
      nzContent: BasicRuleModalComponent,
      nzComponentParams: {
        rule,
      },
      source$: (componentInstance: BasicRuleModalComponent) => this.service.update({
        ...componentInstance.basicRuleForm.value,
        rule_id: rule.rule_id
      })
    });
  }

  delete(rule_id) {
    this.service.delete({rule_id}).pipe(this.doneAndReload).subscribe();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
