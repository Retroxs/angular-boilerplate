import qs from 'qs';

export function FormEncode() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const o = descriptor.value;
    descriptor.value = function () {
      arguments[0] = qs.stringify(arguments[0])
      return o.apply(this, arguments);
    };
  };
}
