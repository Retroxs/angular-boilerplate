import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TokenService } from '@zsx/core/auth/token.service';
import { RecertificationService } from '../../routes/passport/login/login-modal/recertification.service';


@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(
    private nzMessageService: NzMessageService,
    private tokenService: TokenService,
    private nzModalService: NzModalService,
    private recertificationService: RecertificationService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `/api/v1/${req.url}`;

    const formReq = req.clone({
      url,
      headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.tokenService.get())
    });

    const commonReq = req.clone({
      url,
      headers: req.headers.set('Authorization', this.tokenService.get())
    });

    const request = url.match(/upload/) ? commonReq : formReq;

    return next.handle(request).pipe(
      timeout(3000),
      tap(event => {
          if (event instanceof HttpResponse) {
          }
        }, e => {
          const httpStatus = e.status;

          if (httpStatus === 401) {
            this.recertificationService.auth();
          } else {
            this.nzMessageService.error(e.error.msg);
          }
        }
      ),
    );
  }
}
