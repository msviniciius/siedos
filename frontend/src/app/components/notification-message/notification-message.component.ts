import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notifications/notification.service';

@Component({
  selector: 'app-notification-message',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notification-message.component.html',
  styleUrl: './notification-message.component.scss'
})
export class NotificationMessageComponent {
  @Input() title: string;
  notificationForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  sendNotification() {
    if (this.notificationForm.valid) {
      this.notificationService.sendGlobalNotification(this.notificationForm.value).subscribe(() => {
        this.activeModal.close();
      });
    }
  }
}