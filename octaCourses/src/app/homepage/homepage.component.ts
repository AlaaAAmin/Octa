import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  @HostListener('window:unload', ['$event']) unloadHandler () {
    this.socket.disconnectSocket()
  }
  constructor(private socket: SocketService) { }

  ngOnInit(): void {
    // add this after login
    this.socket.initSocketConnection()
    this.socket.getNo()

  }
  

  ngOnDestroy(): void {
    this.socket.disconnectSocket()
  }

}
