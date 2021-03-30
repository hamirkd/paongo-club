import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  constructor(private userService: UserService, private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.listeUtilisateur();
  }
  listeUtilisateur() {
    this.userService.findAllUsers().subscribe(data => {
      // this.users = data as User[];
      this.users = Object.keys(data).map(function (personNamedIndex) {
        let items = data[personNamedIndex];
        return items;
      })
      this.users.sort((a,b) => a.first_name.localeCompare(b.first_name) 
      && a.last_name.localeCompare(b.last_name));
    })
  }

  supprimerUtilisateur(user: User) {
    this.userService.deleteUser(user).subscribe(data => {
      this.toasterService.success("L'utilisateur a été supprimé avec succès");
      this.listeUtilisateur();
    })
  }
  bloquerUser(user: User) {
    this.userService.bloquerUser(user).subscribe(data => {
      this.toasterService.success("L'utilisateur a été bloqué avec succès");
      this.listeUtilisateur();
    })
  }

}
