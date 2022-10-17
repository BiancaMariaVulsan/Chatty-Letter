
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ 
    providedIn: 'root' 
    })
    
export class UserService {
    users;

    constructor(
        private http: HttpClient
        ) { }

    registerUser(userData): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/my_chat/signup/', userData);
    }    

    loginUser(userData): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/my_chat/api-auth/', userData);
    }

    getallUsers(tokenkey): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
            'Authorization': `Token ${tokenkey}`
            })
        };
        return this.http.get('http://127.0.0.1:8000/my_chat/users/?format=json', httpOptions);
    }

    

    getCurrentUser(tokenkey): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Token ${tokenkey}`
            })
        };
        return this.http.get('http://127.0.0.1:8000/my_chat/getcurrentuser/', httpOptions);
    }
}