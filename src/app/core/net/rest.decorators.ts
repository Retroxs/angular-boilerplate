import qs from 'qs';

function pure(obj) {
  Object.keys(obj).forEach(v => {
      if (typeof obj[v] === 'string' && !obj[v].trim()) {
        delete obj[v];
      }
    }
  );
  return obj;
}

export function QuerySearch() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const o = descriptor.value;
    descriptor.value = function () {
      arguments[0] = pure(arguments[0]);
      return o.apply(this, arguments);
    };
  };
}

export function FormEncode() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const o = descriptor.value;
    descriptor.value = function () {
      arguments[0] = qs.stringify(arguments[0]);
      return o.apply(this, arguments);
    };
  };
}
