import { Injectable } from '@angular/core';
import { ApiBase } from '../../services/api-base';
import { UserAuthService } from '../../services/auth/user_auth.service';

@Injectable()
export class ApiAuthService extends ApiBase {
  protected routePath: string = "";

  public getUser(): Promise<UserAuthService.Content> {
    return super.get<UserAuthService.Content>("/user", { });
  }
}