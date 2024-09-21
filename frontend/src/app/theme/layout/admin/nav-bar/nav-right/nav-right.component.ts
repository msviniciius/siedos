// Angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ApiAuthService } from '../../../../../services/auth/api-auth.service';
import { NotificationService } from '../../../../../services/notifications/notification.service';
import { finalize, from } from 'rxjs';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  notifications: any[] = [];
  loading: boolean = false;
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private apiAuthService: ApiAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/guest/login']);
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

  markAsRead(notificationId: number, read: boolean): void {
    const notification = true

    this.notificationService.markNotificationAsRead(notificationId, notification).subscribe({
      next: () => {
        console.log('Notificação marcada como lida no backend');
      },
      error: (error) => {
        console.error('Erro ao marcar a notificação como lida:', error);
      }
    });
  }
}