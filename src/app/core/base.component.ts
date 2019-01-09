import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { BaseService1 } from '@zsx/core/base.service';
import { map, tap } from 'rxjs/operators';
import { Injectable, Injector, OnInit } from '@angular/core';
import { pipe } from 'rxjs';

export abstract class BaseComponent {
  pageIndex = 1;
  pageSize = 10;
  loading = true;
  total: number;
}

@Injectable()
export class BaseTableComponent extends BaseComponent implements OnInit {

  dataSet: any[];
  queryForm: FormGroup;

  // injector
  protected modalService: NzModalService;
  protected messageService: NzMessageService;
  protected fb: FormBuilder;
  protected service: BaseService1;

  doneAndReload = pipe(
    tap(() => this.messageService.create('success', '操作成功')),
    tap(() => this.search(this.pageIndex))
  );

  constructor(protected injector: Injector) {
    super();
    this.fb = this.injector.get(FormBuilder);
    this.modalService = this.injector.get(NzModalService);
    this.messageService = this.injector.get(NzMessageService);
  }

  search(page = 1, query = this.queryForm.value, page_size = this.pageSize): void {
    this.service.fetch({...query, page_size, page})
      .pipe(
        map(res => res.data),
        tap(() => this.loading = false)
      )
      .subscribe(data => {
        this.dataSet = data.list;
        this.total = data.count;
        this.pageIndex = page;
      });
  }

  closeModalAndReload(modal: NzModalRef) {
    return pipe(
      this.doneAndReload,
      tap(() => modal.destroy())
    );
  }

  openModal({nzTitle, nzContent, nzComponentParams = {}, source$}) {
    const modal = this.modalService.create({
      nzTitle,
      nzContent,
      nzComponentParams,
      nzKeyboard: false,
      nzMaskClosable: false,
      nzWidth: 700,
      nzFooter: [{
        label: '提交',
        type: 'primary',
        onClick: (componentInstance) => {
          source$(componentInstance)
            .pipe(
              this.closeModalAndReload(modal)
            ).subscribe();
        }
      }]
    });
  }

  ngOnInit(): void {
    this.search();
  }
}

