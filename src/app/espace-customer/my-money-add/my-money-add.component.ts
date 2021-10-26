import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Titre } from 'app/models/titre.model';
import { TitreModel } from 'app/models/titre.model.model';
import { User } from 'app/models/user.model';
import { BinanceService } from 'app/services/binance.service';
import { TitreModelService } from 'app/services/titre-model.service';
import { TitreService } from 'app/services/titre.service';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';
const FRAIS_ACHAT = 250;

@Component({
  selector: 'app-my-money-add',
  templateUrl: './my-money-add.component.html',
  styleUrls: ['./my-money-add.component.css']
})
export class MyMoneyAddComponent implements OnInit {


  ngOnInit(): void {
    this.userService.findUserById().subscribe(data => {
      const user = data as User;
      this.titre.nomprenom = user.last_name + " " + user.first_name;
      this.titre.telephone = user.telephone;
      this.titre.emailadresse = user.email;
    })
    this.titreModelService.findAllTitres().subscribe(d => {
      console.log(d)
      this._TITRE = d as TitreModel[];
      this._TITRE = this._TITRE.filter(s => !s.bloquer)
    })
  }
  titre: Titre = new Titre();
  user: User;
  constructor(private userService: UserService, private titreService: TitreService, private toasterService: ToastrService,
    public dialogRef: MatDialogRef<MyMoneyAddComponent>, private binanceService: BinanceService,
    private titreModelService: TitreModelService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  on_register = false;
  choix_titre: TitreModel
  _TITRE: TitreModel[] = []
  registertitre() {
    if (!this.choix_titre) {
      this.toasterService.warning("Veuillez choisir un titre");
      return;
    }
    this.titre.titre = this.choix_titre.nom;
    this.titre.titre_id = this.choix_titre.id;
    this.titre.version = "V1";
    this.titre.montant = this.choix_titre.montant ? this.choix_titre.montant.toFixed(1) : 0 + '';
    this.on_register = true;
    this.titreService.addTitre(this.titre).subscribe(data => {
      if (data.status == 200) {
        this.toasterService.success("Le titre a été ajouté avec succès");
        this.dialogRef.close();
      }
      else if (data.status == 400)
        this.toasterService.warning(data.message);
      else
        this.toasterService.error("Impossible d'ajouter le titre");
      console.log(data)
      this.on_register = false;
    }, err => {
      console.log(err)
      if (err.status == 400)
        this.toasterService.warning(err.error.message);
      else this.toasterService.error("Impossible d'ajouter le titre");
      this.on_register = false;
    });
  }
  choix_titre_(titre: TitreModel) {
    this.choix_titre = titre;
    this.on_register = true;
    this.nombre_titre_achete = 0;
    this.valeur_titre_achete = 0;
    this.limit_titre_achete = 0;
    this.choix_titre.montant = 0;
    this.titreService.montant_achat_titre_id(titre.id).subscribe(data => {

      let data2 = data as { titre, balance, balance_usd, valeur_titre_achete, limit }

      this.valeur_titre_achete = data2.valeur_titre_achete as number;
      this.choix_titre.montant = data2.valeur_titre_achete as number;
      this.limit_titre_achete = data2.limit as number;
      this.on_register = false;

    }, err => {
      this.on_register = false;
      this.nombre_titre_achete = 0;
      this.valeur_titre_achete = 0;
      this.limit_titre_achete = 0;
    })
  }
  choix_titre_1(titre: TitreModel) {
    this.choix_titre = titre;
    this.on_register = true;
    this.nombre_titre_achete = 0;
    this.valeur_titre_achete = 0;
    this.limit_titre_achete = 0;
    this.titreService.nombre_titre_acheter(titre.nom).subscribe(data => {

      let data2 = data as { nombre, montant, limit }
      this.nombre_titre_achete = data2.nombre as number;
      this.limit_titre_achete = data2.limit as number;

      this.binanceService.getMyBalance(titre.id).subscribe(data => {
        this.on_register = false;
        let selectTitre = { titre: titre.nom, balance: data && data.balance ? data.balance : 0, balance_usd: data && data.balance_usd ? data.balance_usd : 0 };
        this.valeur_titre_achete = selectTitre.balance_usd / this.nombre_titre_achete + FRAIS_ACHAT;
        this.choix_titre.montant = this.valeur_titre_achete;
      }, err => {
        this.on_register = false;
        this.valeur_titre_achete = titre.montant + FRAIS_ACHAT;
        this.choix_titre.montant = this.valeur_titre_achete;
      })

    }, err => {
      this.on_register = false;
      this.nombre_titre_achete = titre.montant + FRAIS_ACHAT;
      this.valeur_titre_achete = this.valeur_titre_achete;
      this.limit_titre_achete = 0;
    })
  }
  nombre_titre_achete = 0;
  valeur_titre_achete = 0;
  limit_titre_achete = 0;
}

