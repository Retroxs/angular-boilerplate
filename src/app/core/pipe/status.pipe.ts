import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(status: number, args: 'valid' | 'visible' | 'usage' | 'user' = 'valid'): string {
    switch (args) {
      case 'valid':
        return +status ? '已生效' : '已失效';
      case 'visible':
        return +status ? '已显示' : '已隐藏';
      case 'usage':
        return +status ? '已使用' : '未使用';
      case 'user':
        return +status ? '已启用' : '已禁用';
      default:
        return String(status);
    }
  }
}
