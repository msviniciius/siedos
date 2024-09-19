import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiAuthService } from '/home/siedos/Documentos/solides/rh_challenge_marcos_vinicius/frontend/src/app/services/auth/api-auth.service'
import { catchError, map, Observable } from 'rxjs';
import { UserAuthService } from './services/auth/user_auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  userInfo: UserAuthService.Content;

  constructor(
    private http: HttpClient,
    private authService: ApiAuthService
  ) {}

  ngOnInit() {
    // this.getUser();
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUser(): void {
    this.loading = true;
    const token = this.getToken();
  
    this.authService.getUser(token)
      .then(user => {
        this.userInfo = user;
      })
      .catch(error => {
        console.error('Erro ao carregar informações do usuário:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
