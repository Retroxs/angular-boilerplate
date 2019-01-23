import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RuleGroup } from '../basic-rule-group.service';

@Component({
  templateUrl: './basic-rule-group-modal.component.html'
})
export class BasicRuleGroupModalComponent implements OnInit {

  @Input() ruleGroup: RuleGroup;

  basicRuleGroupForm = this.fb.group({
    name: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.ruleGroup) {
      this.basicRuleGroupForm.patchValue({...this.ruleGroup});
    }
  }
}
