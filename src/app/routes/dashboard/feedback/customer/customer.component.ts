import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@zsx/core/base.component';
import { FeedbackService } from '../feedback.service';
import { map, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '@zsx/utils';
import { PackService } from '../../pack/pack.service';


@Component({
  templateUrl: './customer.component.html',
})
export class CustomerFeedbackComponent extends BaseComponent implements OnInit {


  dataSet = [];
  startValue: Date = null;
  endValue: Date = null;
  select = {};

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private packService: PackService) {
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
    this.packService.fetchSelect().subscribe(v => this.select = v.data);
  }

  search(query = this.queryForm.value, page_size = this.pageSize, page = this.pageIndex) {
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
      });
  }


  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }
}
