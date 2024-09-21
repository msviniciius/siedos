import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notifications/notification.service';
import { ApiBase } from '../../../../src/app/services/api-base';
import { ApiAuthService } from '../../services/auth/api-auth.service';
import { BasicService, Basic } from '../../services/basic/basic.service';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  // notifications: ApiBase.ListViewModel<NotificationService.Notification>;
  // notifications: Basic[] = [];

  loading: boolean = false;
  userId: number | null = null;

  constructor(
    private notificationService: NotificationService,
    private apiAuthService: ApiAuthService,
  ) {}

  ngOnInit(): void {
    this.getUser(); 
  }

  ngOnDestroy(): void {
    // Lógica para desconectar do canal, se necessário
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  
  getUser(): void {
    this.loading = true;
    const token = this.getToken();
  
    this.apiAuthService.getUser(token)
      .then(user => {
        this.userId = user.id;

        this.loadNotifications(); 
        this.subscribeToNotifications(); 
      })
      .catch(error => {
        console.error('Erro ao carregar informações do usuário:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  subscribeToNotifications(): void {
    this.notificationService.subscribeToNotifications(this.userId, (notification) => {
      this.notifications.push(notification);
    });
  }

  loadNotifications(): void {
    this.loading = true;
    
    from(this.notificationService.getNotificationsUser(this.userId))
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.notifications = data;
        },
        // error: (e) => this.toastService.error(e),
      });
  }
}