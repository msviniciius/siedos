import { Injectable } from '@angular/core';
import { ApiBase } from '../../../../src/app/services/api-base';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiBase {
  protected routePath: string = "funcionarios";

  public getOneEmployee(employeeId: any): Promise<ApiBase.ListViewModelEmployee<EmployeeService.Employee>> {
    return super.get<ApiBase.ListViewModelEmployee<EmployeeService.Employee>>(`${employeeId}`, {})
  }

  public getEmployees(params?: EmployeeService.Filter): Promise<ApiBase.ListViewModel<EmployeeService.Employee>> {
    return super.post<ApiBase.ListViewModel<EmployeeService.Employee>>(``, params);
  }

  public saveEmployee(params: any): Promise<ApiBase.ListViewModel<EmployeeService.Employee>> {
    return super.post<ApiBase.ListViewModel<EmployeeService.Employee>>(`/new`, params);
  }

  public updateEmployee(employeeId: any, params: any): Promise<ApiBase.ListViewModel<EmployeeService.Employee>> {
    return super.put<ApiBase.ListViewModel<EmployeeService.Employee>>(`${employeeId}`, params);
  }

  public deleteEmployee(employeeId: any): Promise<ApiBase.ListViewModel<EmployeeService.Employee>> {
    return super.delete<ApiBase.ListViewModel<EmployeeService.Employee>>(`${employeeId}`);
  }
}

export namespace EmployeeService {
  export interface Employee {
    id: number;
    name: string;
    registration: string;
    birthday: Date;
    municipality: string;
    state: string;
    marital_status: MaritalStatus;
    gender: Gender;
    job_role: Gender;
    workspace: Gender;
  }

  export class Filter {
    open_search?: string;
  }

  export class Gender {
    id: number;
    title: string;
  }

  export class MaritalStatus {
    id: number;
    title: string;
  }
}
