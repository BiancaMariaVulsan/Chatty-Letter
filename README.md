# The Angular Django SOCKET.IO Messenger

This is a light-weight chatting application built on a **Django REST API** Framework as Backend, **Angular** Frontend and a **SOCKET.IO** WebSocket server.

### [Checkout the DEMO.](https://sudoricheek.github.io/AngularChat/)

## Dependencies and Version Info

* **Django : 3.0.4**
* **djangorestframework : 3.11.0**
* **Angular CLI : 9.1.1**
* **Node.js : 12.16.1**


## Working

This creates an **Angular** front-end server in ***localhost:4200***(the one which the users access). The **Django** backend gets hosted on ***localhost:8000***(the one which serves the **requests**  of ***localhost:4200***) and finally the **WebSocket** server is hosted on ***localhost:3000*** and provides users access to real-time communication and secure chat-rooms !

## Some Pictures :D

### Login/SignUp Page
![One](https://github.com/sudoRicheek/The-Angular-Django-Socket-Messenger/blob/master/readmeimages/rm1.PNG)

### Profile Page
![Two](https://github.com/sudoRicheek/The-Angular-Django-Socket-Messenger/blob/master/readmeimages/rm2.PNG)

### Message Window
![Three](https://github.com/sudoRicheek/The-Angular-Django-Socket-Messenger/blob/master/readmeimages/rm3.PNG)

## How To Use ?

* Clone this repo :
  ```
  git clone https://github.com/sudoRicheek/The-Angular-Django-Socket-Messenger.git
  cd The-Angular-Django-Socket-Messenger
  ```
  
* You'll need to create three **localhosts** so its advisable to split the terminals.  

* For starting the **WebSocket Server** on ***localhost:3000***:
  ```
  cd RealTime Socket Server
  node index.js
  ```
* For starting the **Django Backend API** on ***localhost:8000***
  ```
  cd Django REST Framework Backend
  python manage.py runserver
  ```

* Finally to play with the **Angular** front-end
  ```
  cd Angular Frontend Server
  cd messenger-frontend
  ng serve -o
  ```
  
  If there's an ```unhandled exception : Cannot find module @angular-devkit/build-angular/package.json``` then :
  ```
  npm install -g @angular/cli
  npm install @angular-devkit/build-angular
  ng serve -o
  ```
  And, it should work.

* Open ***localhost:4200*** in multiple tabs for interacting with the chat app :)

## Technologies

<br><img src="https://angular.io/assets/images/logos/angular/logo-nav@2x.png" />
* **Angular 9**

<p float="center">
  <img src="https://www.django-rest-framework.org/img/logo.png" width = 300/>
  <img src="https://www.postgresql.org/media/img/about/press/elephant.png" width=150/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1024px-Socket-io.svg.png" width = 150/>
</p>

* **Django REST Framework | PostgreSQL Database | Socket.IO**

## Author

Created by ***sudoRicheek***. April 2020
