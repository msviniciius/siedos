import { Injectable } from '@angular/core';
import { ApiBase } from '../../services/api-base';
import { HttpHeaders } from '@angular/common/http';
import { UserAuthService } from '../../services/auth/user_auth.service';

@Injectable()
export class ApiAuthService extends ApiBase {
  protected routePath: string = "";

  // public getUser(params: any): Promise<UserAuthService.Content> {
  //   // return super.get<UserAuthService.Content>("/auth/user/infos", params);
  //   return super.get<UserAuthService.Content>("/auth/user/infos", { 
  //     headers: new HttpHeaders({ 'Authorization': `Bearer ${params}` }) 
  //   });
  // }

  // public getUser(token: string): Promise<UserAuthService.Content> {
  //   const options: ApiBase.Options = this.prepareOptions({}, token);
  //   return super.get<UserAuthService.Content>("/auth/user/infos", options);
  // }

  public getUser(token: string): Promise<UserAuthService.Content> {
    const options: ApiBase.Options = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return super.get<UserAuthService.Content>("/auth/user/infos", options);
  }
}

export namespace ApiAuthService {
  export interface Content {
    id: number;
    email: string;
  }
}