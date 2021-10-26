import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Titre } from 'app/models/titre.model';
import { TitreModel } from 'app/models/titre.model.model';
import { BinanceService } from 'app/services/binance.service';
import { TitreModelService } from 'app/services/titre-model.service';
import { TitreService } from 'app/services/titre.service';
import { ToastrService } from 'ngx-toastr';
// EN DOLLAR
const FRAIS_ACHAT = 250;
@Component({
  selector: 'app-titre-add',
  templateUrl: './titre-add.component.html',
  styleUrls: ['./titre-add.component.css']
})
export class TitreAddComponent implements OnInit {

  ngOnInit(): void {
    
    this.titreModelService.findAllTitres().subscribe(d=>{
      console.log(d)
      this._TITRE = d as TitreModel[];
      this._TITRE = this._TITRE.filter(s=>!s.bloquer)
    })
  }
  titre: Titre = new Titre();
  constructor(private titreService: TitreService, private toasterService: ToastrService,
    private titreModelService:TitreModelService,
    public dialogRef: MatDialogRef<TitreAddComponent>,private binanceService:BinanceService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  on_register = false;
  choix_titre: TitreModel
  _TITRE: TitreModel[] = [
    // { nom: "Argent", montant: 2500,statut:'ACTIF' }
  ]
  registertitre() {
    if (!this.choix_titre) {
      this.toasterService.warning("Veuillez choisir un titre");
      return;
    }
    this.titre.titre=this.choix_titre.nom;
    this.titre.titre_id=this.choix_titre.id;
    this.titre.version = "V1";
    this.titre.montant=this.choix_titre.montant?this.choix_titre.montant.toFixed(1):0+'';
    this.on_register = true;
    this.titreService.addTitre(this.titre).subscribe(data => {
      if(data.status==200){
      this.toasterService.success("Le titre a été ajouté avec succès");
      this.dialogRef.close();}
      else
      this.toasterService.error("Impossible d'ajouter le titre");
        console.log(data)
      this.on_register=false;
    }, err => {
      this.toasterService.error("Impossible d'ajouter le titre");
      this.on_register=false;
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
      
      let data2 = data as { titre, balance, balance_usd,valeur_titre_achete,limit }
      
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
  nombre_titre_achete = 0;
  valeur_titre_achete = 0;
  limit_titre_achete = 0;
}

