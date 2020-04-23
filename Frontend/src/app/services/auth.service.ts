import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post('http://localhost:8080/AT-Chat-war/rest/user/register', user);
  }

  login(user) {
    return this.http.post('http://localhost:8080/AT-Chat-war/rest/user/login', user);
  }
}
