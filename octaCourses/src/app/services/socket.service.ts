import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthService } from './authentication/auth.service';
import { Socket } from 'ngx-socket-io';

const socket = io(environment.SOCKET_ENDPOINT, {
  autoConnect: false,
});

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private auth: AuthService) {
  }
  initSocketConnection() {

    let error = null
    socket.on('connect', () => {
      socket.emit('authentication', { token: localStorage.getItem('token') })
    })

    socket.on('unauthorized', (reason) => {
      error = reason.message;
      socket.disconnect()
    })

    socket.on('authenticated', (data) => {
      socket.emit('post-authentication')
    })

    socket.on('new-feed', (data) => {
      console.log('data')
    })

    socket.on('disconnect', (reason) => {
      console.log(`Disconnected: ${error || reason}`);
      error = null;
    })

    socket.connect()
  }

  getNo() {
    socket.on('get-notification', changes => {
      console.log('changes')
    })
  }

  disconnectSocket(): void {
    socket.disconnect()
    socket.removeAllListeners()
  }

}
