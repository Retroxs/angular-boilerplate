import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '@zsx/core/auth/auth.service';

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class LayoutDefaultComponent implements OnInit {

  isCollapsed = false;
  triggerTemplate = null;

  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout() {
    this.authService.deAuthorize();
  }
}
