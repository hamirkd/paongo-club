import { Component, OnInit } from '@angular/core';
import { User, USERDATA } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private userService:UserService) { }
  mySons:User[]=[];
  ngOnInit() {
    this.mySons = USERDATA.filter(u=>u.codeFather==this.userService.user.id);
  }

}
