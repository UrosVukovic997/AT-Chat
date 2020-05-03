import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable, Observer } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject: Subject<MessageEvent>;
  private subject2: Subject<MessageEvent>;

  private ws1: WebSocket;
  private ws2: WebSocket;
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
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: user
    };
    console.log('usao');
    return this.http.delete('http://localhost:8080/AT-Chat-war/rest/user/logout', options);
  }





  public connect(url): Subject<MessageEvent> {
      if (!this.subject) {
      this.subject = this.create(url, 0);
      console.log('Successfully connected: ' + url);
    }
      return this.subject;
  }

  public connectOnline(url): Subject<MessageEvent> {
    if (!this.subject2) {
      this.subject2 = this.create(url, 1);
      console.log('Successfully connected: ' + url);
    }
    return this.subject2;
  }

  private create(url, i): Subject<MessageEvent> {
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
      if (i){
        this.ws2 = ws;
      }
      else {
        this.ws1 = ws;
      }
      return Subject.create(observer, observable);
  }
  public disconect() {
    this.ws1.close();
    this.ws2.close();
  }
}
