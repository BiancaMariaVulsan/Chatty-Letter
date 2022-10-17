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

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit(){
        this.register = {
            username: '',
            password: '',
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
}