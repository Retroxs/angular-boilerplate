import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { MemberFormComponent } from './components/form/form.component';
import { Member, MemberService } from './member.service';
import { BaseComponent } from '@zsx/core/base.component';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.less']
})
export class MemberComponent extends BaseComponent implements OnInit {

  dataSet: Member[];
  queryForm = this.fb.group({
    name: [''],
  });

  constructor(private fb: FormBuilder,
              private message: NzMessageService,
              private modalService: NzModalService,
              private memberService: MemberService) {
    super();
  }

  ngOnInit() {
    this.search();
  }

  showModal() {
    const modal = this.modalService.create({
      nzTitle: '添加会员',
      nzContent: MemberFormComponent,
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => {
          this.memberService.create(componentInstance.appEnvForm.value)
            .pipe(
              tap(() => this.message.create('success', '操作成功')),
              tap(() => modal.destroy()),
              tap(() => this.search())
            ).subscribe();
        }
      }]
    });

  }

  showEditModal(data) {
    const modal = this.modalService.create({
      nzTitle: '更新会员',
      nzContent: MemberFormComponent,
      nzComponentParams: {
        member: data,
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => {
          this.memberService.update({...componentInstance.appEnvForm.value, member_id: data.member_id})
            .pipe(
              tap(() => this.message.create('success', '操作成功')),
              tap(() => modal.destroy()),
              tap(() => this.search())
            ).subscribe();
        }
      }]
    });
  }

  showDeleteConfirm({member_id}) {
    const modal = this.modalService.confirm({
      nzTitle: '确认删除此项?',
      nzOnOk: () => this.memberService.delete({member_id})
        .pipe(
          tap(() => this.message.create('success', '操作成功')),
          tap(() => modal.destroy()),
          tap(() => this.search())
        ).subscribe()
    });
  }

  search(query = this.queryForm.value, page_size = this.pageSize, page = this.pageIndex) {
    this.memberService.fetch({...query, page_size, page})
      .pipe(
        map(res => res.data),
        tap(() => this.loading = false)
      )
      .subscribe(data => {
        this.dataSet = data.list;
        this.total = data.count;
      });
  }
}
