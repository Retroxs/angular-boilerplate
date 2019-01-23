import { Component, Injector, OnInit } from '@angular/core';
import { BasicRuleGroupService, RuleGroup } from './basic-rule-group.service';
import { BaseTableComponent } from '@zsx/core/base.component';
import { BasicRuleGroupModalComponent } from './modal/basic-rule-group-modal.component';

@Component({
  templateUrl: './basic-rule-group.component.html'
})
export class BasicRuleGroupComponent extends BaseTableComponent implements OnInit {

  dataSet: RuleGroup[];
  queryForm = this.fb.group({
    name: [''],
  });

  constructor(
    protected injector: Injector,
    protected service: BasicRuleGroupService
  ) {
    super(injector);
  }


  showModal() {
    this.openModal({
      nzTitle: '新增权限组',
      nzContent: BasicRuleGroupModalComponent,
      source$: (componentInstance: BasicRuleGroupModalComponent) => this.service.create(componentInstance.basicRuleGroupForm.value)
    });
  }

  showEditModal(ruleGroup) {
    this.openModal({
      nzTitle: '更新权限组',
      nzContent: BasicRuleGroupModalComponent,
      nzComponentParams: {
        ruleGroup,
      },
      source$: (componentInstance: BasicRuleGroupModalComponent) => this.service.update({
        ...componentInstance.basicRuleGroupForm.value,
        group_id: ruleGroup.group_id
      })
    });
  }

  delete(group_id) {
    this.service.delete({ group_id }).pipe(this.doneAndReload).subscribe();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
