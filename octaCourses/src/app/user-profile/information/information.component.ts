import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  user = {
    name: 'Alaa A Amin',
    email: 'alaaamin@gmail.com'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
