import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
