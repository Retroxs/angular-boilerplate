import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '@zsx/core/auth/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class LayoutDefaultComponent implements OnInit {

  isCollapsed = false;
  triggerTemplate = null;
  initSelected: string;

  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.initSelected = this.router.url;

  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout() {
    this.authService.deAuthorize();
  }
}
