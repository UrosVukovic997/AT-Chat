import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {DOCUMENT, formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {ChatService, UserEvent} from '../services/chat.service';
import {Message} from '../services/chat.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  online: any = [];
  selected = 'All';
  curentuser = localStorage.getItem('currentuser');
  messages: Message [] = [];
  onlineUsers: string [] = [];

  constructor(private service: UsersService, @Inject(DOCUMENT) document,
              private router: Router, private chatService: ChatService, private authService: AuthService) {
    chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg.subject);
      this.messages.push(msg);
    });
    chatService.onlineUsers.subscribe(msg => {
      console.log('Akcija: ' + msg.akcija + 'korisnik: ' + msg.user);

      if (msg.akcija === 'ulogovan') {
        this.onlineUsers.push(msg.user);
      }
      if (msg.akcija === 'izlogovan') {
        this.onlineUsers = this.onlineUsers.filter(item => item !== msg.user);
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentuser') === null) {
       this.router.navigate(['/']);
    }
    console.log('user-' + (localStorage.getItem('currentuser')));
    this.online = this.service.getOnline().subscribe(
      data => {
        this.online = data;
        for (const d of this.online) {
          this.onlineUsers.push(d);
        }
      }
    );
  }

  filter(){
    for (const entry of this.online) {
      if (entry.username === localStorage.getItem('currentuser')) {
        console.log('okinuo');
        this.online.remove(entry);
      }
    }
  }

  proba(a) {
    console.log(a);
    this.selected = a;
  }

  send() {
    const message = {receiver: this.selected, sender: localStorage.getItem('currentuser'),
    dateTime: formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
    subject: (document.getElementById('messageField')as HTMLInputElement).value};

    this.chatService.messages.next(message);

    (document.getElementById('messageField')as HTMLInputElement).value = '';
  }

  logout() {
    const user = JSON.stringify({
      username: localStorage.getItem('currentuser'),
      password: '',
    });
    this.authService.logout(user).subscribe((ok) => {
      localStorage.removeItem('currentuser');
      this.authService.disconect();
      this.router.navigate(['/']);
    });

  }
}
