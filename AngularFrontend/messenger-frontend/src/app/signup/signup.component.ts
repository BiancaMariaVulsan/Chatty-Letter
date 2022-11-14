import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'signup-component',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [UserService]
})

export class SignupComponent implements OnInit {
    register;
    avatars: string[] = ["../../assets/avatars/boy.png", "../../assets/avatars/girl-1.png", "../../assets/avatars/girl.png",
                        "../../assets/avatars/man-1.png", "../../assets/avatars/man-2.png", "../../assets/avatars/man-3.png",
                        "../../assets/avatars/man-4.png", "../../assets/avatars/man.png"]

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit(){
        this.register = {
            username: '',
            password: '',
            avatar: '../../assets/avatars/man-4.png'
        };
    }
    
    registerNewUser(){
        this.userService.registerUser(this.register).subscribe(
            response => {
              if (response.user_id != -1){
                  alert("User Registered Sucessfully");
                  this.router.navigate(['/login']);
              }
              else
              {
                  alert(response.username)
              }
            },
            error => {
              if (error.error.username != null){
                  alert(error.error.username)
              }
            }
          );
    }

    setUserAvatar(event, avatar){
        this.register.avatar = avatar
    }
}