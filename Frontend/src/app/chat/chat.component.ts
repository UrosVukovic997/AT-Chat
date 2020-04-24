import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {DOCUMENT, formatDate} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  online: any = [];
  selected = 'All';
  curentuser = localStorage.getItem('currentuser');
  htmlToAdd: any;
  constructor(private service: UsersService, @Inject(DOCUMENT) document, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentuser') === null) {
      this.router.navigate(['/']);
    }
    console.log('user-' + (localStorage.getItem('currentuser')));
    this.online = this.service.getOnline().subscribe(
      data => {
        this.online = data;
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

    this.htmlToAdd = message;
    (document.getElementById('messageField')as HTMLInputElement).value = '';
    this.service.sendMessage(message).subscribe(
      data => {}
    );
  }

  logout() {
     localStorage.removeItem('currentuser');
  }
}
