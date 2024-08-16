import { Injectable, EventEmitter } from '@angular/core';
import { CookiesUtils } from '../../utils/cookies-utils';
import { ApiAuthService } from '../../services/auth/api-auth.service';

@Injectable()
export class UserAuthService {
  user: UserAuthService.User;

  constructor(
    private apiAuthService: ApiAuthService
  ) { }

  public async loadUser(): Promise<void>{
    const content = await this.apiAuthService.getUser();
    this.user = content.user;
    CookiesUtils.set('permissions', JSON.stringify(this.user.permissions));
  }
}

export namespace UserAuthService {
  export interface User {
    id: number;
    permissions: string[];
  }

  export interface Content {
    user: User;
  }
}
