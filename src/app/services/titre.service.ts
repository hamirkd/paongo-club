import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titre } from 'app/models/titre.model';
import { TitreModel } from 'app/models/titre.model.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TitreService {
  baseUrl = environment.urlapi + "/";

  constructor(private http: HttpClient, private userService: UserService) {
  }
  findAllTitreOfUser(): Observable<any> {
    return this.http.get(this.baseUrl + "api/achats_/getforme");
  }
  findAllTitreOfUsers(): Observable<any> {
    return this.http.get(this.baseUrl + "api/achats");
  }
  findTitreByPlan(titre: string): Observable<any> {
    return this.http.post(this.baseUrl + "titre/titre_get_by_titre.php", { titre: titre });
  }

  payeTitreManuelAdmin(titre: Titre): Observable<any> {
    return this.http.put(this.baseUrl + "api/achats_/payer/"+titre.id, titre);
  }
  debuteTitreManuelAdmin(titre: Titre): Observable<any> {
    return this.http.post(this.baseUrl + "titre/titre_debute_manuel_admin.php", titre);
  }
  supprimerTitreManuelAdmin(titre: Titre): Observable<any> {
    return this.http.put(this.baseUrl + "api/achats_/supprimer/"+titre.id, titre);
  }
  addTitre(titre: Titre): Observable<any> {
    console.log(titre);
    return this.http.post(this.baseUrl + "api/achats", titre);
  }
  valeurTitre(titreModel:TitreModel){
    return this.http.get(this.baseUrl + "api/achats_/valeur/"+titreModel.nom);
  }
  /**
   * 
   * @param titreModel // Le nom du titre, la recherche est effectué sur le nom
   * @returns {nombre,montant,status}
   */
  nombre_titre_acheter(titreModel:string){
    return this.http.get(this.baseUrl + "api/achats_/nombre_titre_acheter/"+titreModel);
  }
  montant_achat_titre_id(titreModel:number){
    return this.http.get(this.baseUrl + "api/achats_/montant_achat_titre_id/"+titreModel);
  }
  

}
