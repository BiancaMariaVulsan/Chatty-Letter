import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserService } from '../user.service';
import { WebSocketService } from '../WebSocket.service';
import { TokenManager } from '../tokenmanager.service';

@Component({
    selector: 'message-window-component',
    templateUrl: './message-window.component.html',
    styleUrls: ['./message-window.component.css'],
    providers: [UserService,WebSocketService]
})
export class MessageWindowComponent implements OnInit {
    prevmessages;
    sender;
    users;
    receiver;
    message: string;
    chatdetails;
    sentdate;
    crntauthenticuser;
    
    messages;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private webSocketService: WebSocketService,
        private tokenManager: TokenManager,
        ) { 
            this.message = "";

            this.chatdetails = {
                sender: null,
                receiver: null,
                textcontent: ""
            }

            this.messages = [{
                msg: "",
                senderid: 0,
                receiverid: 0
            }];

            this.crntauthenticuser = this.tokenManager.retrieveToken().userid;
        }

    ngOnInit(){
        this.users = this.userService.getallUsers(this.tokenManager.retrieveToken().token);
        this.webSocketService
            .getPrevMessages(this.tokenManager.retrieveToken().token)
            .subscribe((data: any) => {
                this.prevmessages = data;
              });

        this.route.paramMap.subscribe(params => {
            this.sender = +params.get('senderId');
            this.receiver = +params.get('receiverId');
            console.log(this.crntauthenticuser);
            if(this.crntauthenticuser != (this.sender)){
                this.router.navigate(['/login']);
            }
          });

        this.webSocketService.emit('join', {userid: this.sender});

        this.webSocketService
          .getMessages()
          .subscribe((data: any) => {
            this.messages.push(data);
          });
    }



    sendMessage() {

        this.chatdetails = {
            sender: this.sender,
            receiver: this.receiver,
            textcontent: this.message
        }

        if(this.message != ""){
            this.messages.push({msg: this.message, senderid: this.sender, receiverid: this.receiver})

            this.webSocketService.storeMessagedb(this.chatdetails, this.tokenManager.retrieveToken().token);
            
            this.webSocketService.emit("new-message", {receiverid: this.receiver, msg: this.message, senderid: this.sender});
            this.message = '';
        }
    }

}