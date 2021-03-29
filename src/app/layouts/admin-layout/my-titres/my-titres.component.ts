import { Component, OnInit } from '@angular/core';
import { Titre } from 'app/models/titre.model';
import { AuthGuardService } from 'app/services/auth-guard.service';
import { TitreService } from 'app/services/titre.service';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import { TitreAddComponent } from '../titre-add/titre-add.component';


@Component({
  selector: 'app-my-titres',
  templateUrl: './my-titres.component.html',
  styleUrls: ['./my-titres.component.scss']
})
export class MyTitresComponent implements OnInit {


  constructor(public dialog: MatDialog,private toasterService: ToastrService, private titreService: TitreService, private authGuardService: AuthGuardService, private userService: UserService) { }
  btn_add = true;
  ngOnInit(): void {
    this.getTitreListe();
  }
  list_or_card = true;// if it's true, it shows list
  change_list_or_card() {
    this.list_or_card = !this.list_or_card;
    localStorage.setItem("list_or_card", JSON.stringify(this.list_or_card));
  }

  addTitre() {
    const dialogRef = this.dialog.open(TitreAddComponent,{
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTitreListe();
    });
  }
  getIcon(titre: string) {
    switch (titre) {
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

  getBg(titre: string) {
    switch (titre) {
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
  getTitreListe() {
    if (localStorage.getItem("list_or_card")) {
      this.list_or_card = JSON.parse(localStorage.getItem("list_or_card"));
    }
    this.titreService.findAllTitreOfUsers().subscribe(data => {
      
      this._TITRE  = Object.keys(data).map(function(personNamedIndex){
        let items = data[personNamedIndex];
        return items;
      })
    }, err => {
    })
  }

  _TITRE: Titre[] = []

  paye_titre_manuel(titre: Titre) {
    this.titreService.payeTitreManuelAdmin(titre).subscribe(data => {
      if (data.status == 200) {
        this.toasterService.success(data.message);
      }
      else {
        this.toasterService.error(data.message);
      }

      this.getTitreListe();
    }, err => {
      console.log(err)
      if (err.status == 200) {
        this.toasterService.success('Impossible de payer');
      }
      else {
        this.toasterService.error('Impossible de payer');
      }
    })
  }
  
  
  supprimer_titre_manuel(titre: Titre) {
    this.titreService.supprimerTitreManuelAdmin(titre).subscribe(data => {
      if (data.status == 200) {
        this.toasterService.success(data.message);
      }
      else {
        this.toasterService.error(data.message);
      }

      this.getTitreListe();
    }, err => {
      console.log(err)
      if (err.status == 200) {
        this.toasterService.success('Impossible de supprimer');
      }
      else {
        this.toasterService.error('Impossible de supprimer');
      }
      this.getTitreListe();
    })
  }
  debute_titre_manuel(titre: Titre) {
    this.titreService.debuteTitreManuelAdmin(titre).subscribe(data => {
      if (data.status == 200) {
        this.toasterService.success(data.message);
      }
      else {
        this.toasterService.error(data.message);
      }

      this.getTitreListe();
    }, err => {
      console.log(err)
      if (err.status == 200) {
        this.toasterService.success('Impossible de debuter');
      }
      else {
        this.toasterService.error('Impossible de debuter');
      }
      this.getTitreListe();
    })
  }
}
