import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
    })

export class WebSocketService {

    private socket: any;
    readonly uri: string = "http://localhost:3000";
    postId;
    
    constructor(
        private http: HttpClient
        ) {        
        this.socket = io.connect(this.uri);
    }

    public listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data);
            })
        });
    }

    storeMessagedb(newchatdetails, tokenkey) {
        const httpOptions = {
            headers: new HttpHeaders({
            'Authorization': `Token ${tokenkey}`
            })
        };
        return this.http.post<any>('http://127.0.0.1:8000/my_chat/createchat/', newchatdetails, httpOptions).subscribe();
    }

    getPrevMessages(tokenkey): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
            'Authorization': `Token ${tokenkey}`
            })
        };
        return this.http.get('http://127.0.0.1:8000/my_chat/chats/?format=json', httpOptions);
    }
    
    public getMessages() {
        return Observable.create((observer) => {
            this.socket.on('new-msg', function (data) {
                observer.next(data);
            });
        });
    }

    public emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }

}