import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user.model';
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
  }

}
