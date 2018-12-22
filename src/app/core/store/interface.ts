export interface IStore<T> {
  get(key: string): T;

  set(key: string, value: T): boolean;

  remove(key: string): boolean;
}
