import { Injectable } from "@angular/core";
import { UserAuthService } from "../services/auth/user_auth.service";
import { CookiesUtils } from '../utils/cookies-utils';

@Injectable({ providedIn: 'root' })
export class AuthGuard{
  constructor(
    private userAuthService: UserAuthService
  ){ }

  public async isUserLoggedIn(): Promise<boolean> {
    if(CookiesUtils.get('user_auth_token')) {
      if(!this.userAuthService.user){
        await this.userAuthService.loadUser();
      }

      return true;
    }

    return false;
  }
}
