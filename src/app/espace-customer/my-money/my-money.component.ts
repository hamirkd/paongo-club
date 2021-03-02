import { Component, OnInit } from '@angular/core';
import { Titre } from 'app/models/titre.model';
import { AuthGuardService } from 'app/services/auth-guard.service';
import { TitreService } from 'app/services/titre.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-my-money',
  templateUrl: './my-money.component.html',
  styleUrls: ['./my-money.component.css']
})
export class MyMoneyComponent implements OnInit {

  constructor(private titreService:TitreService,private authGuardService:AuthGuardService,private userService:UserService) { }
  btn_add=false;
  ngOnInit(): void {
    this.titreService.findAllTitreOfUser().subscribe(data=>{
      this._TITRE=data as Titre[];
      if(this._TITRE.length<4)this.btn_add=true;
      else this.btn_add=false;
    },err=>{
      this.btn_add=true;
    })
  }

  getIcon(plan: string) {
    switch (plan) {
      case 'Argent':
        return 'fa fa-money';
      case 'Or':
        return 'fa fa-battery-0';
      case 'Diamant':
        return 'fa fa-battery-1';
      case 'Master':
        return 'fa fa-battery-2';
      case 'Champion':
        return 'fa fa-battery-3';
      case 'Titan':
        return 'fa fa-battery-4';
      default:
        break;
    }
  }

  getBg(plan: string) {
    switch (plan) {
      case 'Argent':
        return 'bg-info';
      case 'Or':
        return 'bg-warning';
      case 'Diamant':
        return 'bg-info';
      case 'Master':
        return 'bg-dark';
      case 'Champion':
        return 'fa fa-battery-3';
      case 'Titan':
        return 'bg-danger';
      default:
        break;
    }
  }

  get_titre_from_user(i) {
    i = i - 1;
    if (i >= this._TITRE.length) {
      return null;
    }
    else return this._TITRE[i];
  }

  _TITRE: Titre[] = []

}
