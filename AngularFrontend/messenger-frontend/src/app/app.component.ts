import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'messenger-frontend';
  private tokenKey:string = 'current_user_token';
  private blankData = {logout_time: (new Date()).getTime() + 9000000, token : "", userid : -1};

  constructor(
    private router: Router,
  ){}


  openNav() {
    document.getElementById("mySidebar").style.width = "175px";
    document.getElementById("main").style.marginLeft = "175px";
  }
  
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  logout(){
    localStorage.setItem(this.tokenKey, JSON.stringify(this.blankData));
    this.router.navigate(['/']);
  }
}
