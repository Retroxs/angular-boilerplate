import { Component, Injector, OnInit } from '@angular/core';
import { PackModalComponent } from './modal/pack/pack-modal.component';
import { PackService } from './pack.service';
import { map } from 'rxjs/operators';
import { BaseTableComponent } from '@zsx/core/base.component';
import { PriceModalComponent } from './modal/price-modal.component';
import { BindModalComponent } from './modal/bind-modal.component';

@Component({
  templateUrl: './pack.component.html'
})
export class PackComponent extends BaseTableComponent implements OnInit {

  queryForm = this.fb.group({
    suit_name: [''],
    app_id: ['']
  });

  selects: any;

  constructor(protected injector: Injector,
              protected service: PackService) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fetchAppList();
  }

  fetchAppList() {
    this.service.fetchSelect().subscribe(res => this.selects = res.data);
  }

  delete({suit_id}) {
    this.service.delete({suit_id}).pipe(this.doneAndReload).subscribe();
  }

  showModal() {
    this.openModal({
      nzTitle: '添加套餐',
      nzContent: PackModalComponent,
      nzComponentParams: {
        select: this.selects
      },
      source$: (componentInstance: PackModalComponent) => this.service.create(componentInstance.allFormValue)
    });
  }


  findPackAndOpenModal({suit_id}) {
    this.service.findById({suit_id}).subscribe(
      res => this.showEditModal(res.data.suit_info)
    );
  }

  showEditModal(pack) {
    this.openModal({
      nzTitle: '更新套餐',
      nzContent: PackModalComponent,
      nzComponentParams: {
        select: this.selects,
        pack
      },
      source$: (componentInstance: PackModalComponent) => this.service.update({...componentInstance.packForm.value, suit_id: pack.suit_id})
    });
  }


  changePrice({suit_id, price, origin_price}) {
    this.openModal({
      nzTitle: '更改套餐价格',
      nzContent: PriceModalComponent,
      nzComponentParams: {
        price: {price, origin_price}
      },
      source$: (componentInstance: PriceModalComponent) => this.service.updatePrice({
        ...componentInstance.priceForm.value,
        suit_id
      })
    });
  }


  showBindMemberModal({memberList, suit_id}) {
    this.openModal({
      nzTitle: '绑定会员',
      nzContent: BindModalComponent,
      nzComponentParams: {
        memberList,
        suit_id
      },
      source$: (componentInstance: BindModalComponent) => this.service.bindMember({member_id: componentInstance.checkedList, suit_id})
    });
  }

  bindMember({suit_id}) {
    this.service.fetchMembers({suit_id}).pipe(
      map(res => res.data.member_list),
    ).subscribe(
      memberList => this.showBindMemberModal({memberList, suit_id})
    );
  }
}
