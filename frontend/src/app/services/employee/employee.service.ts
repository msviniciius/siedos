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

  public getEmployees(filter?: EmployeeService.Filter): Promise<ApiBase.ListViewModel<EmployeeService.Employee>> {
    const params = this.buildRansackParams(filter);
    return super.post<ApiBase.ListViewModel<EmployeeService.Employee>>('', params);
  }
  
  private buildRansackParams(filter: EmployeeService.Filter): any {
    const params: any = { q: {} };
  
    // Parâmetros de busca
    if (filter.open_search) {
      params.q['name_or_registration_cont'] = filter.open_search;
    }
  
    if (filter.gender_identity && filter.gender_identity.length > 0) {
      params.q['gender_id_in'] = filter.gender_identity;
    }
  
    if (filter.job_roles && filter.job_roles.length > 0) {
      params.q['job_role_id_in'] = filter.job_roles;
    }
  
    if (filter.work_locations && filter.work_locations.length > 0) {
      params.q['workspace_id_in'] = filter.work_locations;
    }
  
    // Adicionando parâmetros de paginação
    if (filter.page) {
      params.page = filter.page; // Página atual
    }
  
    if (filter.per_page) {
      params.per_page = filter.per_page; // Registros por página
    }
  
    return params; // Retorna o objeto formatado para o Ransack
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
    page: number;
    per_page: number;
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