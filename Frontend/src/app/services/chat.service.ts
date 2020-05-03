import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import DateTimeFormat = Intl.DateTimeFormat;
import {HttpClient, HttpHeaders} from '@angular/common/http';

const CHAT_URL = 'ws://localhost:8080/AT-Chat-war/ws/';
const ONLINE_USERS_URL = 'ws://localhost:8080/AT-Chat-war/users/';


export interface Message {
  receiver: string;
  sender: string;
  dateTime: string;
  subject: string;
}

export interface UserEvent {
  akcija: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>;
  public onlineUsers: Subject<UserEvent>;

  constructor(private service: AuthService, private http: HttpClient) {
    this.messages = <Subject<Message>> service.connect(CHAT_URL + localStorage.getItem('currentuser')).pipe(map(
      (response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return {
          receiver: data.receiver,
          sender: data.sender,
          dateTime: data.dateTime,
          subject: data.subject
        };
      }
    ));

    this.onlineUsers = <Subject<UserEvent>> service.connectOnline(ONLINE_USERS_URL + localStorage.getItem('currentuser')).pipe(map(
      (response: MessageEvent): UserEvent => {
        const data = JSON.parse(response.data);
        return {
          akcija: data.akcija,
          user: data.user
        };
      }
    ));
  }



}
