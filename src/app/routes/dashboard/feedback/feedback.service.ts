import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuerySearch } from '@zsx/core/net/rest.decorators';
import { Observable } from 'rxjs';
import { TableResponse } from '@zsx/core/net/response.interface';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) {
  }

  @QuerySearch()
  fetchUser(params): Observable<TableResponse<any>> {
    return this.http.get<TableResponse<any>>(`feedback/index`, {params});
  }

  @QuerySearch()
  fetchData(params): Observable<TableResponse<any>> {
    return this.http.get<TableResponse<any>>(`function-apply/index`, {params});
  }

  fetchHash(): Observable<TableResponse<any>> {
    return this.http.get<TableResponse<any>>(`function-apply/get-select`);
  }
}
