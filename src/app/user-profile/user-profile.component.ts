import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService:UserService) { }
  user:User=new User();
  ngOnInit() {
    this.userService.findUserById().subscribe(data=>{
      this.user = data as User;
      console.log(data);
    },err=>{
      //message d'erreur
      console.log(err);
    });
  }
  modifier_information(){
    this.userService.updateUser(this.user).subscribe(data=>{
      // Message de reussite de modification
      console.log(data);
    },err=>{
      // Message d'impossibilite de modification d'un utilisateur
      console.log(err);
    })
  }

}
