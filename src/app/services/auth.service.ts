import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable, Observer } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject: Subject<MessageEvent>;
  constructor(private http: HttpClient) {
  }

  register(user) {
    return this.http.post('http://localhost:8080/AT-Chat-war/rest/user/register', user,      {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    });
  }

  login(user) {
    return this.http.post('http://localhost:8080/AT-Chat-war/rest/user/login', user,      {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    });
  }

  logout(user){
    return this.http.delete('http://localhost:8080/AT-Chat-war/rest/user/logout', user);
  }





  public connect(url): Subject<MessageEvent> {
      if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
      return this.subject;
  }

  private create(url): Subject<MessageEvent> {
      const ws = new WebSocket(url);

      const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
      const observer = {
        // tslint:disable-next-line:ban-types
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
      return Subject.create(observer, observable);
  }
}
