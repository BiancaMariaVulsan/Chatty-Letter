import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class TokenManager {

    private tokenKey:string = 'current_user_token';
    private session_time = 6000000; //milliseconds
    private blankData = {logout_time: (new Date()).getTime() + 9000000, token : "", userid : -1};


    private store(data) {
        localStorage.setItem(this.tokenKey, JSON.stringify(data));
    }

    private retrieve() {
        let storedToken:string = localStorage.getItem(this.tokenKey);
        if(!storedToken) throw 'no-token-found';
        return storedToken;
    }

    
    public addNewToken(tokenkey, userid) {
        let currentTime:number = (new Date()).getTime() + this.session_time;;
        this.store({logout_time: currentTime, token : tokenkey, userid : userid});
    }

    public retrieveToken() {

        let currentTime:number = (new Date()).getTime(), storedToken = null;
        try {
            storedToken = JSON.parse(this.retrieve());
            if(storedToken.logout_time < currentTime) throw 'invalid-token-found';
        }
        catch(err) {
            localStorage.setItem(this.tokenKey, JSON.stringify(this.blankData));
            console.error(err);
        }
        return storedToken;
    }

    public destroyToken() {
        localStorage.setItem(this.tokenKey, JSON.stringify(this.blankData));
    }
}