import { Component, OnInit } from '@angular/core';
import { User, USERDATA } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-my-members',
  templateUrl: './my-members.component.html',
  styleUrls: ['./my-members.component.css']
})
export class MyMembersComponent implements OnInit {

  constructor(private userService:UserService) { }
  mySons:User[]=[];
  ngOnInit() {
    this.mySons = USERDATA.filter(u=>u.codeFather==this.userService.user.id);
  }

}