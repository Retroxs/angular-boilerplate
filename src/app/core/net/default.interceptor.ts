import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { TokenService } from '@zsx/core/auth/token.service';


@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private nzMessageService: NzMessageService, private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      url: `/api/v1/${req.url}`,
      headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.tokenService.get())
    });
    return next.handle(authReq).pipe(
      timeout(3000),
      tap(event => {
          if (event instanceof HttpResponse) {
            // console.info('');
          }
        }, e => {
          this.nzMessageService.error(e.error.msg);
        }
      ),
    );
  }
}
