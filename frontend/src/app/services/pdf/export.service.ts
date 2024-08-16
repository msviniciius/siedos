import { Injectable } from '@angular/core';
import { ApiBase } from '../api-base';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ExportService extends ApiBase {
  protected routePath: string = "";

  constructor(
    httpClient: HttpClient, 
    private toastr: ToastrService
  ) {
    super(httpClient); 
  }
  
  public exportEmployeesPdf(params?: ExportService.Filter): Promise<Blob> {
    this.toastr.warning('Iniciando exportação PDF...', 'Exportação');

    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });
  
    const options = {
      headers,
      params: new HttpParams({ fromObject: params as any }),
      responseType: 'blob' as 'json'
    };
  
    return this.httpClient.get<Blob>(`${this.apiBaseUrl}/pdf/export_pdf`, options)
      .toPromise()
      .then(blob => {
        this.toastr.success('Exportação de PDF concluída!', 'Exportação');

        return blob;
      })
      .catch(error => {
        this.toastr.error('Erro ao exportar PDF!', 'Exportação');
        throw error;
      });
  }  
  
  public exportEmployeesXls(params?: ExportService.Filter): Promise<Blob> {
    this.toastr.warning('Iniciando exportação PDF...', 'Exportação');
    
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  
    const options = {
      headers,
      params: new HttpParams({ fromObject: params as any }),
      responseType: 'blob' as 'json'
    };
  
    return this.httpClient.get<Blob>(`${this.apiBaseUrl}/xls/export_xls`, options)
      .toPromise()
      .then(blob => {
        this.toastr.success('Exportação de XLS concluída!', 'Exportação');
        return blob;
      })
      .catch(error => {
        this.toastr.error('Erro ao exportar XLS!', 'Exportação');
        console.error('Erro ao exportar XLS:', error);
        throw error;
      });
  }
}

export namespace ExportService {
  export class Filter {
    open_search?: string;
    gender_identity?: any[];
    job_roles?: any[];
    work_locations?: any[];
  }
}