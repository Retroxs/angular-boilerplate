export interface Response<T = {}> {
  code: number;
  msg: string;
  data?: T;
}

export interface TableResponse<T> {
  code: number;
  msg: string;
  data: {
    count: number;
    list: T;
  };
}
