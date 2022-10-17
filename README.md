**Chatty Letter**

# The Angular Django SOCKET.IO Messenger

This is a simple messanger application build using  **Django REST API** Framework as Backend, **Angular** Frontend and a **SOCKET.IO** WebSocket server.

## Requirements

* **Django**
* **djangorestframework**
* **Angular CLI**
* **Node.js**


## Working

This creates an **Angular** front-end server in ***localhost:4200***(the one which the users access). The **Django** backend gets hosted on ***localhost:8000***(the one which serves the **requests**  of ***localhost:4200***) and finally the **WebSocket** server is hosted on ***localhost:3000*** and provides users access to real-time communication and secure chat-rooms!

## How To Use ?
  
* You'll need to create three **localhosts** so its advisable to split the terminals.  

* For starting the **WebSocket Server** on ***localhost:3000***:
  ```
  cd RealTimeSocketServer
  node index.js
  ```
* For starting the **Django Backend API** on ***localhost:8000***
  ```
  cd DjangoServer
  python manage.py runserver
  ```

* Finally to play with the **Angular** front-end
  ```
  cd AngularFrontend
  cd messenger-frontend
  ng serve -o
  ```

# Source of the initial poject:

https://github.com/sudoRicheek/The-Angular-Django-Socket-Messenger

