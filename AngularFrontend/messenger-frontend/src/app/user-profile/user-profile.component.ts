import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, provideRoutes, Router } from '@angular/router';

import { UserService } from '../user.service';
import { TokenManager } from '../tokenmanager.service';

@Component({
    selector: 'user-profile-component',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
    providers: [UserService]
})
export class UserProfileComponent implements OnInit {
    usercurrentId;
    users;
    crntauthenticuser;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private tokenManager: TokenManager,
    ) { 
        this.crntauthenticuser = this.tokenManager.retrieveToken().userid;
    }

    ngOnInit(){
        this.users = this.userService.getallUsers(this.tokenManager.retrieveToken().token);
        
        console.log(this.crntauthenticuser);
        this.route.paramMap.subscribe(params => {
            this.usercurrentId = params.get('userId');
            if(this.crntauthenticuser != this.usercurrentId){
                this.router.navigate(['/login']);
            }
          });        
    }
}