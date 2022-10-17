import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import { Router } from '@angular/router';
import { TokenManager } from '../tokenmanager.service';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    input;
    userdata;

    constructor(
        private router: Router,
        private userService: UserService,
        private tokenManager: TokenManager,
    ) {}

    ngOnInit(){
        this.input = {
            username: '',
            password: '',
        };
    }

    loginNewUser(){
        this.userService.loginUser(this.input).subscribe(            
            response => {
                this.tokenManager.addNewToken(response.token, response.user_id);
                alert('User ' + response.username + ' has been logged in');
                console.log(response.user_id);
                this.router.navigate(['/users', response.user_id]);
            },
            error => {
              console.log(error.error.non_field_errors);
              if (error.error.non_field_errors != null){
                alert(error.error.non_field_errors)
              }
            }
        );        
    }

}