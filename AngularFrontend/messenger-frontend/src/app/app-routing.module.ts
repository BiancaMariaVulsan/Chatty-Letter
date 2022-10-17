import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

import { UserProfileComponent } from './user-profile/user-profile.component';

import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';

import { UserService } from './user.service';

import { MessageWindowComponent } from './message-window/message-window.component';

import { WebSocketService } from './WebSocket.service';



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
