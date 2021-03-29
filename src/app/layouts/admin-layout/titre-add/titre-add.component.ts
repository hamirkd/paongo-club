import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Titre } from 'app/models/titre.model';
import { TitreModel } from 'app/models/titre.model.model';
import { TitreService } from 'app/services/titre.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-titre-add',
  templateUrl: './titre-add.component.html',
  styleUrls: ['./titre-add.component.css']
})
export class TitreAddComponent implements OnInit {

  ngOnInit(): void {
  }
  titre: Titre = new Titre();
  constructor(private titreService: TitreService, private toasterService: ToastrService,
    public dialogRef: MatDialogRef<TitreAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  on_register = false;
  choix_titre: { titre, montant,statut }
  _TITRE: TitreModel[] = [
    { nom: "Argent", montant: 2500,statut:'ACTIF' }
  ]
  registertitre() {
    this.titre.titre=this.choix_titre.titre;
    this.titre.montant=this.choix_titre.montant;
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
}

