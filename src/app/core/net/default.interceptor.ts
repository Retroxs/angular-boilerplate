import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private nzMessageService: NzMessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'auth-xxx-auth';
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    return next.handle(authReq).pipe(
      tap(event => {
          if (event instanceof HttpResponse) {
            // console.info('');
          }
        }, error => {
          this.nzMessageService.error(error.status);
        }
      )
    );
  }
}
