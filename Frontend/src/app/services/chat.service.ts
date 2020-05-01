import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import DateTimeFormat = Intl.DateTimeFormat;

const CHAT_URL = 'ws://localhost:8080/AT-Chat-war/ws/';

export interface Message {
  receiver: string;
  sender: string;
  dateTime: string;
  subject: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>;

  constructor(private service: AuthService) {
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
  }
}
