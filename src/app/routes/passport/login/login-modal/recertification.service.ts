import { Injectable } from '@angular/core';
import { LoginModalComponent } from './login-modal.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { AuthService } from '@zsx/core/auth/auth.service';

@Injectable(
  {providedIn: 'root'}
)
export class RecertificationService {
  hasReloginModal = false;

  constructor(private nzModalService: NzModalService, private authService: AuthService, private messageService: NzMessageService) {
  }

  auth() {
    if (!this.hasReloginModal) {
      this.hasReloginModal = true;
      const modal = this.nzModalService.create({
        nzTitle: '登陆过期，请重新登陆',
        nzContent: LoginModalComponent,
        nzKeyboard: false,
        nzClosable: false,
        nzMaskClosable: false,
        nzFooter: [{
          label: '退出',
          type: 'danger',
          onClick: () => {
            this.hasReloginModal = false;
            this.nzModalService.closeAll();
            this.authService.deAuthorize();
          }
        }, {
          label: '登陆',
          type: 'primary',
          onClick: (componentInstance) => {
            componentInstance.onLogin().pipe(
              tap(() => this.hasReloginModal = false),
              tap(() => modal.destroy()),
              tap(() => this.messageService.success('登陆成功，请继续操作'))
            ).subscribe();
          }
        }]
      });
    }
  }
}
