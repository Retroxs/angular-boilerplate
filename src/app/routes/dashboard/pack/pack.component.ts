import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { PackFormComponent } from './components/form/form.component';
import { Pack, PackService } from './pack.service';
import { map, tap } from 'rxjs/operators';
import { BaseComponent } from '@zsx/core/base.component';
import { PriceModalComponent } from './components/modal/price.modal';
import { BindModalComponent } from './components/modal/bind.modal';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.less']
})
export class PackComponent extends BaseComponent implements OnInit {

  dataSet: Pack[];
  queryForm = this.fb.group({
    suit_name: [''],
    app_id: ['']
  });

  select =  {};

  constructor(private fb: FormBuilder, private modalService: NzModalService, private packService: PackService) {
    super();
  }

  ngOnInit(): void {
    this.search();
    this.packService.fetchSelect().subscribe(v => this.select = v.data);
  }

  showModal() {
    const modal = this.modalService.create({
      nzTitle: '添加套餐',
      nzWidth: 700,
      nzContent: PackFormComponent,
      nzComponentParams: {
        select: this.select
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => {
          console.log(componentInstance.allFormValue());
          this.packService.create(componentInstance.allFormValue())
            .pipe(
              tap(() => modal.destroy()),
              tap(() => this.search())
            ).subscribe();
        }
      }]
    });

  }


  findPack(data) {
    this.packService.findById({suit_id: data.suit_id}).subscribe(
      res => this.showEditModal(res.data.suit_info)
    );
  }

  showEditModal(data) {
    const modal = this.modalService.create({
        nzTitle: '更新套餐',
        nzWidth: 700,
        nzContent: PackFormComponent,
        nzComponentParams: {
          select: this.select,
          pack: data
        },
        nzFooter: [{
          label: '更新',
          onClick: (componentInstance) => {
            this.packService.update({...componentInstance.packForm.value, suit_id: data.suit_id})
              .pipe(
                tap(() => modal.destroy()),
                tap(() => this.search())
              ).subscribe();
          }
        }]
      })
    ;
  }

  showDeleteConfirm({suit_id}) {
    const modal = this.modalService.confirm({
      nzTitle: '确认删除此项?',
      nzOnOk: () => this.packService.delete({suit_id})
        .pipe(
          tap(() => modal.destroy()),
          tap(() => this.search())
        ).subscribe()
    });
  }

  search(query = this.queryForm.value, page_size = this.pageSize, page = this.pageIndex) {
    this.packService.fetch({...query, page_size, page})
      .pipe(
        map(res => res.data),
        tap(() => this.loading = false)
      )
      .subscribe(data => {
        this.dataSet = data.list;
        this.total = data.count;
      });
  }

  changePrice(data: Pack) {
    this.packService.findById({suit_id: data.suit_id}).subscribe(
      res => {
        const suit_info = res.data.suit_info;
        const {price, origin_price} = suit_info;
        const modal = this.modalService.create({
          nzTitle: '更改套餐价格',
          nzWidth: 700,
          nzContent: PriceModalComponent,
          nzComponentParams: {
            price: {price, origin_price}
          },
          nzFooter: [{
            label: '更新',
            onClick: (componentInstance) => {
              this.packService.updatePrice({...componentInstance.priceForm.value, suit_id: data.suit_id})
                .pipe(
                  tap(() => modal.destroy()),
                  tap(() => this.search())
                ).subscribe();
            }
          }]
        });
      }
    );
  }

  bindMember(data: Pack) {
    this.packService.fetchMembers({suit_id: data.suit_id}).pipe(
      map(res => res.data.member_list),
    ).subscribe(
      memberList => {
        const modal = this.modalService.create({
          nzTitle: '绑定会员',
          nzWidth: 700,
          nzContent: BindModalComponent,
          nzComponentParams: {
            memberList,
            suit_id: data.suit_id
          },
          nzFooter: [{
            label: '提交',
            onClick: (componentInstance) => {
              const checkedList = componentInstance.memberList.filter(m => m.checked).map(m => m.member_id);
              this.packService.bindMember({member_id: checkedList, suit_id: data.suit_id})
                .pipe(
                  tap(() => modal.destroy()),
                  tap(() => this.search())
                ).subscribe();
            }
          }]
        });
      }
    );
  }
}
