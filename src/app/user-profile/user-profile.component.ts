import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService:UserService,private toasterService:ToastrService) { }
  user:User=new User();
  ngOnInit() {
    this.userService.findUserById().subscribe(data=>{
      this.user = data as User;
    },err=>{
      //message d'erreur
      console.log(err);
    });
  }
  modifier_information(){
    this.userService.updateUser(this.user).subscribe(data=>{
      // Message de reussite de modification
      this.toasterService.success("Vos informations ont été enregistrées avec succès");
      console.log(data);
    },err=>{
      // Message d'impossibilite de modification d'un utilisateur
      this.toasterService.error("Impossible d'enregistrer vos informations");
      console.log(err);
    })
  }

}
