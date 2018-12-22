import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.less'],
})
export class ConfigComponent implements OnInit {
  title = 'config';
  data = {a: 1, b: 2};

  ngOnInit(): void {
  }

}
