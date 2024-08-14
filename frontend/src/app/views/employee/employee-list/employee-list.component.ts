// angular import
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from '../../../services/employee/employee.service';
import { ApiBase } from '../../../../../src/app/services/api-base';
import { ConfirmDialogComponent } from '../../../../../src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: ApiBase.ListViewModel<EmployeeService.Employee>;
  filter: EmployeeService.Filter = new EmployeeService.Filter();

  loading: boolean = false;
  searchTerm: string = '';
  searchTimeout: any;

  actions = [
    { label: 'Visualizar', icon: 'fa-solid fa-eye', action: (employee: any) => this.viewEmployee(employee) },
    { label: 'Editar', icon: 'fa-solid fa-pen-to-square', action: (employee: any) => this.editEmployee(employee) },
    { label: 'Excluir', icon: 'fa-solid fa-trash', action: (employee: any) => this.deleteEmployee(employee) },
  ];
      
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.loadEmployees();
  }

  public async loadEmployees(): Promise<void> {
    try {
      this.loading = true;
      this.filter.open_search = this.searchTerm ? this.searchTerm : "";
      this.employees = await this.employeeService.getEmployees(this.filter);

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
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
}