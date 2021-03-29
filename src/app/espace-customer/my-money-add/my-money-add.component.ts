import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Titre } from 'app/models/titre.model';
import { TitreModel } from 'app/models/titre.model.model';
import { User } from 'app/models/user.model';
import { TitreService } from 'app/services/titre.service';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-money-add',
  templateUrl: './my-money-add.component.html',
  styleUrls: ['./my-money-add.component.css']
})
export class MyMoneyAddComponent implements OnInit {

  
  ngOnInit(): void {
    this.userService.findUserById().subscribe(data=>{
      const user=data as User;
      this.titre.nomprenom = user.last_name+" "+user.first_name;
      this.titre.telephone = user.telephone;
      this.titre.emailadresse = user.email;
    })
  }
  titre: Titre = new Titre();
  user:User;
  constructor(private userService:UserService,private titreService: TitreService, private toasterService: ToastrService,
    public dialogRef: MatDialogRef<MyMoneyAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  on_register = false;
  choix_titre: { titre, montant }
  _TITRE: TitreModel[] = [
    { nom: "Argent", montant: 2500,statut:"ACTIF" }
  ]
  registertitre() {
    if(!this.choix_titre){
      this.toasterService.warning("Veuillez choisir un titre");
      return;
    }
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

