import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notifications/notification.service';
import { NotificationSettingsComponent } from '../../components/notification-settings/notification-settings.component';
import { NotificationMessageComponent } from '../../components/notification-message/notification-message.component';
import { ApiBase } from '../../services/api-base';
import { ApiAuthService } from '../../services/auth/api-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicService, Basic } from '../../services/basic/basic.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
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
    private modalService: NgbModal,
    private toastr: ToastrService
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

  openPreferencesModal(): void {
    const modalRef = this.modalService.open(NotificationSettingsComponent);

    modalRef.result.then(
      async (preferences) => {
        if (preferences) {
          try {
            this.loading = true;
            await this.notificationService.updatePreferences(this.userId, preferences).toPromise();

            this.loadNotifications();
            this.toastr.success('Preferências atualizadas com sucesso!', 'Preferências');
          } catch (error) {
            console.log(error);
            this.toastr.error('Erro ao atualizar as preferências', 'Erro');
          } finally {
            this.loading = false;
          }
        }
      },
      (reason) => {
      }
    );
  }

  openNotificationModal() {
    const modalRef = this.modalService.open(NotificationMessageComponent);
    modalRef.componentInstance.title = 'Enviar Comunicado Global';
  }
}