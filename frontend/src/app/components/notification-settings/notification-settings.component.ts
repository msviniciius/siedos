import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notifications/notification.service';
import { ApiAuthService } from '../../services/auth/api-auth.service';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css']
})
export class NotificationSettingsComponent implements OnInit {
  notificationForm: FormGroup;
  loading: boolean = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private notificationService: NotificationService,
    private apiAuthService: ApiAuthService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getUser();

    this.notificationForm = this.fb.group({
      receive_profile_update_notifications: [null],
      receive_document_notifications: [null],
      receive_general_notifications: [null],
      receive_annivesary_notifications: [null],
    });
  }

  public loadPreferences(): void {
    this.notificationService.getOnePreferences({ id: this.userId }).subscribe({
      next: (response) => {
        if (response.items.length > 0) {
          const preferences = response.items[0];
          this.notificationForm.patchValue({
            receive_profile_update_notifications: preferences.receive_profile_update_notifications,
            receive_document_notifications: preferences.receive_document_notifications,
            receive_general_notifications: preferences.receive_general_notifications,
            receive_annivesary_notifications: preferences.receive_annivesary_notifications
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar preferências:', error);
        this.loading = false;
      },
    });
  }
  

  confirm(): void {
    if (this.notificationForm.valid) {
      this.activeModal.close(this.notificationForm.value);
    }
  }

  dismiss(): void {
    this.activeModal.dismiss('cancel');
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

        this.loadPreferences();
      })
      .catch(error => {
        console.error('Erro ao carregar informações do usuário:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}

export interface NotificationPreferences {
  receive_profile_update_notifications: boolean;
  receive_document_notifications: boolean;
  receive_general_notifications: boolean;
  receive_annivesary_notifications: boolean;
}
