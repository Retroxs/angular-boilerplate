import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@zsx/core/base.component';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from './app-config.service';
import { AppConfigModalComponent } from './modal/app-config-modal/app-config-modal.component';
import { Select, SelectService } from '../../select.service';

interface ConfigTemplate {
  name: string;
  title: string;
  type: string;
  option: any;
}

@Component({
  templateUrl: './app-config.component.html'
})
export class AppConfigComponent extends BaseTableComponent implements OnInit {

  queryForm = this.fb.group({
    name: [this.route.snapshot.paramMap.get('name')],
    value: [''],
    is_default: [],
    app_id: [],
    version_code: [''],
    channel_code: [''],
  });

  configTemplate: ConfigTemplate;
  app_list: Select[];

  constructor(
    protected injector: Injector,
    protected service: AppConfigService,
    private selectService: SelectService,
    private route: ActivatedRoute
  ) {
    super(injector);
    this.fetchSelects();
  }


  fetchSelects() {
    this.selectService.fetch({'flag[]': ['app_list']}).subscribe(res => this.app_list = res.data['app_list']);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.queryParams.subscribe((query: ConfigTemplate) => {
      this.configTemplate = {...query, option: JSON.parse(query.option)};
    });
  }


  showModal() {
    this.openModal({
      nzTitle: '添加配置',
      nzContent: AppConfigModalComponent,
      nzComponentParams: {
        template_origin: this.configTemplate
      },
      source$: (componentInstance: AppConfigModalComponent) =>
        this.service.create(componentInstance.appConfigForm.value)
    });
  }

  showEditModal(data) {
    this.openModal({
      nzTitle: '更新配置',
      nzContent: AppConfigModalComponent,
      nzComponentParams: {
        config: data,
        template_origin: this.configTemplate
      },
      source$: (componentInstance: AppConfigModalComponent) => this.service.update({
        value: componentInstance.config_value,
        id: data.id
      })
    })
    ;
  }

  destroy(id) {
    this.service.destroy({id}).pipe(this.doneAndReload).subscribe();
  }
}
