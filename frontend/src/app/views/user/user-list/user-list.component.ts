import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { NgSelectModule } from '@ng-select/ng-select';

import { UserService } from '../../../services/user/user.service';
import { ApiBase } from '../../../../../src/app/services/api-base';
import { ConfirmDialogComponent } from '../../../../../src/app/components/confirm-dialog/confirm-dialog.component';
import { UserAuthService } from '../../../services/auth/user_auth.service';

import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgSelectModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: ApiBase.ListViewModel<UserService.User>;

  loading: boolean = false;
  toastService: any;

  canCreate: boolean = false;
  userInfo: UserAuthService.Content;
  userRole: string | null = null;
  userId: number | null = null;

  actions = [
    { label: 'Visualizar', icon: 'fa-solid fa-eye', action: (user: any) => this.viewUser(user) },
    { label: 'Editar', icon: 'fa-solid fa-pen-to-square', action: (user: any) => this.editUser(user) },
    { label: 'Excluir', icon: 'fa-solid fa-trash', action: (user: any) => this.deleteUser(user) },
  ];  

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  public async loadUsers(): Promise<void> {
    try {
      this.loading = true;
      this.users = await this.userService.getUsers();

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteUser(id: any) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.title = 'de exclusão';
    modalRef.componentInstance.subtitle = 'esse usuário';

    modalRef.result.then(
      async (result) => {
        if (result) {
          try {
            this.loading = true;
            await this.userService.deleteUser(id);
            this.toastr.success('Usuário deletado com sucesso!', 'Usuário');
            this.loadUsers();
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

  viewUser(userId: number) {
    this.router.navigate(['/usuarios/view', userId]);
  }

  editUser(userId: number): void {
    this.router.navigate(['/usuarios/edit', userId]);
  }
}

export namespace UserListComponent {
  export enum FilterTypes {
    Genders = 0,
    JobRoles = 1,
    WorkLocations = 2
  }
}
