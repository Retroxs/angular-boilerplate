import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '@zsx/core/auth/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class LayoutDefaultComponent implements OnInit {

  isCollapsed = false;
  triggerTemplate = null;
  initSelected: string;

  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initSelected = this.route.children[0].routeConfig.path;
    this.route.parent.url.subscribe(url => console.log(url[0].path));

    // Get Current Path:  company  同理
    this.route.url.subscribe(url => console.log(url[0].path));

  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout() {
    this.authService.deAuthorize();
  }
}
