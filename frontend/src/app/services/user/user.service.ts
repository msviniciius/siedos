import { Injectable } from '@angular/core';
import { ApiBase } from '../api-base';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBase {
  protected routePath: string = "users";

  public getOneUser(userId: any): Promise<ApiBase.ListViewModelUser<UserService.User>> {
    return super.get<ApiBase.ListViewModelUser<UserService.User>>(`${userId}`, {})
  }

  public getUsers(params?: UserService): Promise<ApiBase.ListViewModel<UserService.User>> {
    return super.post<ApiBase.ListViewModel<UserService.User>>(``, params);
  }

  public updateUser(userId: any, params: any): Promise<ApiBase.ListViewModel<UserService.User>> {
    return super.put<ApiBase.ListViewModel<UserService.User>>(`${userId}`, params);
  }

  public deleteUser(userId: any): Promise<ApiBase.ListViewModel<UserService.User>> {
    return super.delete<ApiBase.ListViewModel<UserService.User>>(`${userId}`);
  }
}

export namespace UserService {
  export interface User {
    id: number;
    email: string;
    role: string;
  }

}