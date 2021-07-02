import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Titre } from 'app/models/titre.model';
import { TitreModel } from 'app/models/titre.model.model';
import { BinanceService } from 'app/services/binance.service';
import { TitreModelService } from 'app/services/titre-model.service';
import { TitreService } from 'app/services/titre.service';
import { ToastrService } from 'ngx-toastr';
import { MyMoneyAddComponent } from '../my-money-add/my-money-add.component';

@Component({
  selector: 'app-my-money',
  templateUrl: './my-money.component.html',
  styleUrls: ['./my-money.component.css']
})
export class MyMoneyComponent implements OnInit {

  constructor(public dialog: MatDialog, private titreService: TitreService,
    private binanceService: BinanceService, private toastrService: ToastrService,
    private titreModelService:TitreModelService) { }
  btn_add = true;
  ngOnInit(): void {
    this.getListeMyMoney();
    this.titreModelService.findAllTitres().subscribe(d=>{
      this.titreModels = d as TitreModel[];
    })
  }

  titreModels:TitreModel[]=[];
  
  getListeMyMoney() {
    this.titreService.findAllTitreOfUser().subscribe(data => {
      let data1:string=JSON.stringify(data as Titre[])
      this._TITRE  = Object.keys(data).map(function(personNamedIndex){
        let items = data[personNamedIndex];
        return items;
      })
      
      // if (this._TITRE.length < 4) this.btn_add = true;
      // else this.btn_add = false;
    }, err => {
      this.btn_add = true;
      console.log(err);
    })
  }

  getIcon(titre: string) {
    switch (titre) {
      case 'ARGENT':
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
      case 'ARGENT':
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

  getBinanceAccount(titre: Titre) {

    if(titre.emailadresse!='daohamadou@gmail.com')
    if (titre.etat_paiement.toLocaleLowerCase() == 'non_paye') {
      this.toastrService.warning("Vous devez payé ce titre");
      return;
    }
    const titreModel = this.titreModels.find(t=>t.nom==titre.titre);
    this.binanceService.getMyBalance(titreModel.id).subscribe(data => {
      this.selectTitre = { titre: titre.titre, balance: data && data.balance ? data.balance : 0, balance_usd: data && data.balance_usd ? data.balance_usd : 0 };
      this.valeur_titre_achete=this.selectTitre.balance_usd/this.nombre_titre_achete+250;
      this.dividante_titre_achete = (this.selectTitre.balance_usd-this.nombre_titre_achete*this.montant_titre_achete)/(2*this.nombre_titre_achete)
    }, err => {

      this.selectTitre = { titre: titre.titre, balance: 0, balance_usd: 0 };
      this.valeur_titre_achete=0;

    })
    this.titreService.nombre_titre_acheter(titre.titre).subscribe(data=>{
      let data2 = data as {nombre,montant,limit}
      this.nombre_titre_achete=data2.nombre as number;
      this.montant_titre_achete=data2.montant as number;
      this.limit_titre_achete=data2.limit as number;

    },err=>{
      this.nombre_titre_achete=0;
      this.valeur_titre_achete=0;
      this.dividante_titre_achete=0;
      this.montant_titre_achete=0;
      this.limit_titre_achete=0;
    })
  }
  nombre_titre_achete=0;
  valeur_titre_achete=0;
  dividante_titre_achete=0;
  montant_titre_achete=0;
  limit_titre_achete=0;
  click_add=false;
  addTitre() {
    if(this.click_add)return;
    this.click_add=true
    const dialogRef = this.dialog.open(MyMoneyAddComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getListeMyMoney();
      this.click_add=false;
    });
  }

  selectTitre: { titre, balance, balance_usd };
  _TITRE: Titre[] = [];

}
