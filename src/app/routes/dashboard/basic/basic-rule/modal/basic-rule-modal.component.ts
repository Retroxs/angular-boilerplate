import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Rule } from '../basic-rule.service';
import { BaseSelect } from '@zsx/core/base.component';
import { Select, SelectService } from '../../../../select.service';

@Component({
  templateUrl: './basic-rule-modal.component.html'
})
export class BasicRuleModalComponent extends BaseSelect implements OnInit {
  @Input() rule: Rule;

  basicRuleForm = this.fb.group({
    title: [''],
    name: [''],
    group_id: [],
    status: [1],
  });

  ruleGroupList: Select[];

  constructor(private fb: FormBuilder, private selectService: SelectService) {
    super();
  }

  ngOnInit() {
    this.fetchRuleGroup().subscribe(res => this.ruleGroupList = res.data['rule_group']);
    if (this.rule) {
      this.basicRuleForm.patchValue({...this.rule});
    }
  }

  fetchRuleGroup() {
    return this.selectService.fetch({'flag[]': ['rule_group']});
  }
}
