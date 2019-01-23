import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { BasicRuleService, Rule, RuleTree } from '../../../basic-rule/basic-rule.service';
import { NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
  templateUrl: './basic-role-assign-rule-modal.component.html'
})
export class BasicRoleAssignRuleModalComponent implements OnInit {

  @ViewChild('treeCom') treeCom;

  @Input() id: string;
  ruleList: RuleTree[];
  searchValue: string;

  constructor(private basicRuleService: BasicRuleService) {
  }

  ngOnInit() {
    this.fetchRoleCheckbox().subscribe(ruleList => this.ruleList = ruleList);
  }


  fetchRoleCheckbox() {
    return this.basicRuleService.fetchRuleTree({role_id: this.id}).pipe(
      map(res => res.data),
      map(ruleList => ruleList.map(ruleGroup => {
        ruleGroup.title = ruleGroup.name;
        ruleGroup.key = ruleGroup.group_id;
        ruleGroup.children = ruleGroup.rule_list.map(
          rule => {
            rule.key = rule.rule_id;
            rule.isLeaf = true;
            rule.checked = !!rule.is_checked;
            return rule;
          }
        );
        return ruleGroup;
      }))
    );
  }

  get checkedRule() {
    const checkedArr = this.ruleList.map(ruleGroup => ruleGroup.children.filter(rule => rule.checked)).filter(rule => rule.length > 0);
    return ([] as Rule[]).concat(...checkedArr).map(rule => rule.rule_id);
  }

  nzEvent($event: NzFormatEmitEvent) {
    console.log($event);
  }
}
