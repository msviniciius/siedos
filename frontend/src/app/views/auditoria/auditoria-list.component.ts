import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgSelectModule } from '@ng-select/ng-select';

import { Auditoria, AuditoriaService } from '../../services/auditoria/auditoria.service';
import { AuthService } from '../../services/auth/auth.service';
import { ApiAuthService } from '../../services/auth/api-auth.service';
import { UserAuthService } from '../../services/auth/user_auth.service';

import { finalize } from 'rxjs';

@Component({
  selector: 'app-auditoria-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgSelectModule, NgxPaginationModule],
  templateUrl: './auditoria-list.component.html',
  styleUrls: ['./auditoria-list.component.scss']
})
export class AuditoriaListComponent implements OnInit {
  auditorias: Auditoria[] = [];

  loading: boolean = false;

  userInfo: UserAuthService.Content;
  userRole: string | null = null;
  userId: number | null = null;

  constructor(
    private auditoriaService: AuditoriaService,
    private authService: AuthService,
    private apiAuthService: ApiAuthService,
  ) { }

  ngOnInit() {
    this.loadAuditorias();
  }

  public async loadAuditorias(): Promise<void> {
    this.loading = true;
    this.auditoriaService.getAuditoria()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.auditorias = data;
        },
        // error: (e) => this.toastService.error(e),
      });
  }
}