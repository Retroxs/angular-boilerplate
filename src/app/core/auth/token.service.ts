import { Injectable } from '@angular/core';
import { LocalStorageStore } from '../store/local-storage.service';
import { TokenModel } from './interface';
import { AuthConfig } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private tokenStore: LocalStorageStore<TokenModel>, private authConfig: AuthConfig) {
  }

  get(): string {
    let { token } = this.tokenStore.get(this.authConfig.token_key);
    return token ? token : '';

  }

  set(token) {
    this.tokenStore.set(this.authConfig.token_key, {token});
  }

  remove() {
    this.tokenStore.remove(this.authConfig.token_key);
  }
}
