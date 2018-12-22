import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[danger]'
})
export class DangerDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#f5222d';
  }

}
