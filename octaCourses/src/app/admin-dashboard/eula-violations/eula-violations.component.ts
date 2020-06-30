import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eula-violations',
  templateUrl: './eula-violations.component.html',
  styleUrls: ['./eula-violations.component.css']
})
export class EulaViolationsComponent implements OnInit {

  instructors: any[] = [
    {
      name: "el-astaza",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cumque eius",
      joiningDate: 'October 1, 2018'
    },
    {
      name: "James",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cumque eius",
      joiningDate: 'September 2, 2018'
    },
    {
      name: "ahmed",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cumque eius",
      joiningDate: 'january 25, 2020'
    },
    {
      name: "Mostafa",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cumque eius",
      joiningDate: 'October 1, 2019'
    },
    {
      name: "Alaa",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cumque eius",
      joiningDate: 'july 27, 2019'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
