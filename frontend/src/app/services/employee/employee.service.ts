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
    return super.postOrPutWithAttachments<ApiBase.ListViewModel<EmployeeService.Employee>>(`${employeeId}`, params);
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
    contacts: EmployeeContact[]
  }

  export interface EmployeeContact {
    id: number;
    phone: string;
    cell_phone: string;
    email: string;
  }

  export class Filter {
    open_search?: string;
    gender_identity?: any[];
    job_roles?: any[];
    work_locations?: any[];
  }

  export interface FilterOption{
    value: any;
    text: string;
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

// no params de updateEmployee recebeo esse objeto

// Object
// birthday: "2010-03-02"
// contacts: [{…}]
// document_upload: File {name: 'Marcos Vinicius.pdf', lastModified: 1722945952457, lastModifiedDate: Tue Aug 06 2024 09:05:52 GMT-0300 (Horário Padrão de Brasília), webkitRelativePath: '', size: 116622, …}
// gender_id: 1
// job_role_id: 5
// marital_state_id: 2
// municipality: "Senador Alexandre Costa"
// name: "Raphaela Lau da Silva"
// registration: "MAT300"
// state: "Maranhão"
// workspace_id: 13

// mas no backend recebo ele "document_upload"=>{}