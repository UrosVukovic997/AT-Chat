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
  newMessage: { [key: string]: boolean; } = {};


  constructor(private service: UsersService, @Inject(DOCUMENT) document,
              private router: Router, private chatService: ChatService, private authService: AuthService) {

    chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg.subject);
      this.messages.push(msg);
      if (msg.receiver !== 'All') {
        this.newMessage[msg.sender] = true;
      }
      else{
        if (msg.sender !== this.curentuser) {
          this.newMessage[msg.receiver] = true;
        }
      }
    });
    chatService.onlineUsers.subscribe(msg => {
      console.log('Akcija: ' + msg.akcija + 'korisnik: ' + msg.user);

      if (msg.akcija === 'ulogovan') {
        // if (!this.onlineUsers[msg.user]) {
          this.onlineUsers.push(msg.user);
          this.newMessage[msg.user] = false;
        // }
      }
      if (msg.akcija === 'izlogovan') {
        this.onlineUsers = this.onlineUsers.filter(item => item !== msg.user);
        this.newMessage[msg.user] = false;
      }
    });
  }

  ngOnInit(): void {
    this.service.isLoggedIn(localStorage.getItem('currentuser')).subscribe(
      data => {
        if(data !== 'Korisnik je ulogovan'){
          localStorage.removeItem('currentuser');
          this.router.navigate(['/']);
        }
      }
    );
    console.log('user-' + (localStorage.getItem('currentuser')));
    this.online = this.service.getOnline().subscribe(
      data => {
        this.online = data;
        for (const d of this.online) {
          this.onlineUsers.push(d);
          this.newMessage[d] = false;
        }
      }
    );
    let temp: any = [];
    temp = this.service.getAll(localStorage.getItem('currentuser')).subscribe(
      data => {
        temp = data;
        console.log(temp);
        for (const tmp of temp) {
          this.messages.push(tmp);
        }
      });
  }



  proba(a) {
    this.newMessage[a] = false;
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
