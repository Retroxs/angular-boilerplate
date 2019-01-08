import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableResponse } from '@zsx/core/net/response.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseService1 {

  fetch(parmas) {
    let res: Observable<TableResponse<any>>;
    return res;
  }
}
