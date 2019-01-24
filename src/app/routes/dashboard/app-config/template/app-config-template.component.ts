import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@zsx/core/base.component';
import { AppConfigTemplateService } from './app-config-template.service';
import { AppConfigTemplateModalComponent } from '../modal/app-config-template-modal.component';
import { Router } from '@angular/router';
import { AclService } from '@zsx/core/acl.service';

@Component({
  templateUrl: './app-config-template.component.html'
})
export class AppConfigTemplateComponent extends BaseTableComponent implements OnInit {

  queryForm = this.fb.group({
    title: [''],
    name: [''],
    option: [''],
    type: [],
  });

  typeSelects = [
    {key: 'text', label: '文本框'},
    {key: 'checkbox', label: '复选框'},
    {key: 'select', label: '下拉框'},
    {key: 'radio', label: '单选框'},
    {key: 'textarea', label: '富文本框'},
  ];

  constructor(
    protected injector: Injector,
    protected service: AppConfigTemplateService,
    private router: Router,
    private aclService: AclService
  ) {
    super(injector);
    this.acl = this.aclService.global_acl['APP_CONFIG_TEMPLATE_ACL'];
  }

  ngOnInit() {
    super.ngOnInit();
  }

  showModal() {
    this.openModal({
      nzTitle: '添加配置模板',
      nzContent: AppConfigTemplateModalComponent,
      source$: (componentInstance: AppConfigTemplateModalComponent) =>
        this.service.create(componentInstance.appConfigTemplateForm.value)
    });
  }

  destroy(id) {
    this.service.destroy({id}).pipe(this.doneAndReload).subscribe();
  }

  goto(data) {
    const {name, title, type, dispose_option} = data;

    this.router.navigate(['/dashboard/app_config/' + name], {
      queryParams: {
        name, title, type, option: JSON.stringify(dispose_option)
      }
    });
  }
}
