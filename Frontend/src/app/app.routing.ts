import {RouterModule, Routes} from '@angular/router';

import { ChatComponent } from 'src/app/chat/chat.component';
import { LogInComponent } from 'src/app/log-in/log-in.component';
import { RegistrationComponent } from 'src/app/registration/registration.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
  , {
    path: 'signup',
    component: RegistrationComponent,
    children: [
    ]},
  {
    path: 'login',
    component: LogInComponent,
    children: [
    ]},
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
