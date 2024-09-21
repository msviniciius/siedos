import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as ActionCable from '@rails/actioncable';
import { map, Observable } from 'rxjs';

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

    return this.httpClient.get<BasicResponse>(`${this.apiUrl}/notifications`, { params: httpParams }).pipe(
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
