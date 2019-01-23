import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@zsx/core/base.component';
import { FeedbackService } from '../feedback.service';
import { map, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '@zsx/utils';
import { PackService } from '../../pack/pack.service';
import { Select, SelectService } from '../../../select.service';


@Component({
  templateUrl: './customer.component.html',
})
export class CustomerFeedbackComponent extends BaseComponent implements OnInit {


  dataSet = [];
  startValue: Date = null;
  endValue: Date = null;
  app_list: Select[];

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private selectService: SelectService) {
    super();
  }

  queryForm = this.fb.group({
    app_id: [''],
    app_version: [''],
    start_time: [''],
    end_time: [''],
  });

  ngOnInit() {
    this.search();
    this.selectService.fetch({'flag[]': ['app_list']}).subscribe(v => this.app_list = v.data['app_list']);
  }

  search(page = 1, query = this.queryForm.value, page_size = this.pageSize) {
    query.start_time = formatDate(query.start_time);
    query.end_time = formatDate(query.end_time);
    this.feedbackService.fetchUser({...query, page_size, page})
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


  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }
}
