import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgSelectModule } from '@ng-select/ng-select';
import { saveAs } from 'file-saver';

import { BasicService, Basic } from '../../../services/basic/basic.service';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ExportService } from '../../../services/pdf/export.service';
import { ApiBase } from '../../../../../src/app/services/api-base';
import { ConfirmDialogComponent } from '../../../../../src/app/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../services/auth/auth.service';
import { ApiAuthService } from '../../../services/auth/api-auth.service';
import { UserAuthService } from '../../../services/auth/user_auth.service';

import { finalize } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgSelectModule, NgxPaginationModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: ApiBase.ListViewModel<EmployeeService.Employee>;

  filter: EmployeeService.Filter;
  gendersType: EmployeeService.FilterOption[];
  job_roles: EmployeeService.FilterOption[];
  workspaces: EmployeeService.FilterOption[];
  selectedTypes: string[] = [];

  selectedGenders: any[] = [];
  selectedJobRoles: any[] = [];
  selectedWorkLocations: any[] = [];

  jobRoles: Basic[] = [];
  workLocations: Basic[] = [];

  loading: boolean = false;
  searchTerm: string = '';
  searchTimeout: any;
  toastService: any;

  canCreate: boolean = false;
  userInfo: UserAuthService.Content;
  userRole: string | null = null;
  actions = [];
  userId: number | null = null;

  currentPage: number = 1;
  perPage: number = 100;

  configureActions(): void {
    if (this.userRole === 'admin') {
      this.actions = [
        { label: 'Visualizar', icon: 'fa-solid fa-eye', action: (employee: any) => this.viewEmployee(employee) },
        { label: 'Editar', icon: 'fa-solid fa-pen-to-square', action: (employee: any) => this.editEmployee(employee) },
        { label: 'Excluir', icon: 'fa-solid fa-trash', action: (employee: any) => this.deleteEmployee(employee) },
      ];
    } else if (this.userRole === 'rh') {
      this.actions = [
        { label: 'Visualizar', icon: 'fa-solid fa-eye', action: (employee: any) => this.viewEmployee(employee) },
        { label: 'Editar', icon: 'fa-solid fa-pen-to-square', action: (employee: any) => this.editEmployee(employee) },
        { label: 'Excluir', icon: 'fa-solid fa-trash', action: (employee: any) => this.deleteEmployee(employee) },
      ];
    } else if (this.userRole === 'employee') {
      this.actions = [
        { label: 'Visualizar', icon: 'fa-solid fa-eye', action: (employee: any) => this.viewEmployee(employee) },
      ];
    }
  }
  
  optionExports: { label: string, icon: string, option: Function }[] = [
    { label: 'PDF', icon: 'fa-solid fa-file-pdf', option: this.exportPdf.bind(this) },
    { label: 'XLS', icon: 'fa-solid fa-file-excel', option: this.exportXls.bind(this) }
  ];  

  FilterTypes = EmployeeListComponent.FilterTypes;

  constructor(
    private employeeService: EmployeeService,
    private exportService: ExportService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private basicService: BasicService,
    private authService: AuthService,
    private apiAuthService: ApiAuthService,
  ) { }

  ngOnInit() {
    this.initVariables();
    
    this.loadEmployees();
    this.clearFilters();
    this.loadJobRole();
    this.loadWorkLocation();
    this.checkAuthentication();
    this.getUser();
  }

  public initVariables(): void {
    this.gendersType = [
      { text: "Masculino", value: "1" },
      { text: "Feminino", value: "2" },
      { text: "Todos", value: "0" }
    ];
  }

  public async clearFilters(reload?: boolean): Promise<void> {
    this.filter = new EmployeeService.Filter();
    this.selectedTypes = [];
    this.filter.gender_identity = [];
    this.searchTerm = "";

    await this.loadEmployees();
  }

  public async loadEmployees(): Promise<void> {
    try {
      this.loading = true;
  
      // Atualize o objeto filter com os valores dos filtros
      this.filter.open_search = this.searchTerm ? this.searchTerm : '';
      this.filter.gender_identity = this.selectedGenders;
      this.filter.job_roles = this.selectedJobRoles;
      this.filter.work_locations = this.selectedWorkLocations;

      this.filter.page = this.currentPage; // Página atual
      this.filter.per_page = this.perPage;  // Registros por página
  
      // Chama o serviço com os filtros
      this.employees = await this.employeeService.getEmployees(this.filter);
  
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }
  

  exportOptions(label: string) {
    switch(label) {
      case 'PDF':
        this.exportPdf();
        break;
      case 'XLS':
        this.exportXls();
        break; 
    }
  }
  
  private exportPdf() {
    this.exportService.exportEmployeesPdf(this.filter)
    .then(blob => {
      saveAs(blob, 'employees.pdf');
    }).catch(error => {
      console.error('Erro ao exportar PDF:', error);
    });
  }

  private exportXls() {
    this.exportService.exportEmployeesXls(this.filter).then(blob => {
      saveAs(blob, 'employees.xlsx');
    }).catch(error => {
      console.error('Erro ao exportar XLS:', error);
    });
  }

  public async deleteEmployee(id: any) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.title = 'de exclusão';

    modalRef.result.then(
      async (result) => {
        if (result) {
          try {
            this.loading = true;
            await this.employeeService.deleteEmployee(id);
            this.toastr.success('Funcionário deletado com sucesso!', 'Funcionário');
            this.loadEmployees();
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false;
          }
        }
      },
      (reason) => {
      }
    );
  }

  loadJobRole(): void {
    this.loading = true;
    this.basicService.getRoles()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.jobRoles = data;
        },
        error: (e) => this.toastService.error(e),
      });
  }

  loadWorkLocation(): void {
    this.loading = true;
    this.basicService.getWorkLocation()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.workLocations = data;
        },
        error: (e) => this.toastService.error(e),
      });
  }

  public async onFilterChange(event: any, type: EmployeeListComponent.FilterTypes): Promise<void> {
    try {
      const selectedValues = Array.isArray(event) ? event.map(item => item.id || item.value) : [];
  
      switch (type) {
        case EmployeeListComponent.FilterTypes.Genders:
          this.filter.gender_identity = selectedValues;
          break;
  
        case EmployeeListComponent.FilterTypes.JobRoles:
          this.filter.job_roles = selectedValues;
          break;
  
        case EmployeeListComponent.FilterTypes.WorkLocations:
          this.filter.work_locations = selectedValues;
          break;
      }
  
      await this.loadEmployees();
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }
  

  createEmployee() {
    this.router.navigate(['funcionarios/new']).then(success => {
      if (success) {
        console.log('Navegação bem-sucedida');
      } else {
        console.log('Navegação falhou');
      }
    });
  }

  onSearch(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.loadEmployees();
    }, 500);
  }

  viewEmployee(employeeId: number) {
    this.router.navigate(['/funcionarios/view', employeeId]);
  }

  editEmployee(employeeId: number): void {
    this.router.navigate(['/funcionarios/edit', employeeId]);
  }

  checkAuthentication(): void {
    this.canCreate = this.authService.isAuthenticated();
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUser(): void {
    this.loading = true;
    const token = this.getToken();
  
    this.apiAuthService.getUser(token)
      .then(user => {
        this.userInfo = user;
        this.userRole = user.role;
        this.userId = user.id;
        this.configureActions();
      })
      .catch(error => {
        console.error('Erro ao carregar informações do usuário:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}

export namespace EmployeeListComponent {
  export enum FilterTypes {
    Genders = 0,
    JobRoles = 1,
    WorkLocations = 2
  }
}
