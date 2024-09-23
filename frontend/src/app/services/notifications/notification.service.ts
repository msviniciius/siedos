import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as ActionCable from '@rails/actioncable';
import { map, Observable } from 'rxjs';

import { NotificationPreferences } from '../../components/notification-settings/notification-settings.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/v1';

  private cable: any;
  private notificationsChannel: any;

  constructor(private httpClient: HttpClient) {
    this.cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  }

  getNotificationsUser(params: any): Observable<Basic[]> {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.httpClient.post<BasicResponse>(`${this.apiUrl}/notifications`, { params }).pipe(
      map(response => response.items)
    );
  }

  subscribeToNotifications(userId: number, callback: (notification: any) => void) {
    this.notificationsChannel = this.cable.subscriptions.create(
      { channel: 'NotificationsChannel', user_id: userId },
      {
        received: (notification: any) => {
          console.log('Received notification:', notification);
          callback(notification);
        },
      }
    );
  }

  markNotificationAsRead(notificationId: number, read: boolean): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/notification/${notificationId}`, { notification: { read: read }});
  }  
  
  getOnePreferences(params: { id: number }): Observable<BasicResponsePreferences> {
    return this.httpClient.post<BasicResponsePreferences>(`${this.apiUrl}/preferences`, params);
  }
  
  updatePreferences(id: number, preferences: NotificationPreferences): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/preferences/${id}`, preferences);
  }
}

export namespace NotificationService {
  export interface Notification {
    receive_profile_update_notifications: boolean;
    receive_document_notifications: boolean;
    receive_general_notifications: boolean;
  }
}

export interface Basic {
  id: number;
  title: string;
  message: string;
  read: boolean;
}

export interface BasicResponse {
  items: Basic[];
}

export interface BasicResponsePreferences {
  items: NotificationPreferences[];
}
