import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getOnline() {
    return this.http.get('http://localhost:8080/AT-Chat-war/rest/user/all');
  }
  sendMessage(message) {
    return this.http.post('http://localhost:8080/AT-Chat-war/rest/message/send', message);
  }
}
