import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titre } from 'app/models/titre.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TitreService {
  baseUrl = environment.urlapi+"/";

  constructor(private http:HttpClient,private userService:UserService ) {
  }
  findAllTitreOfUser():Observable<any>{
    let email='';
    if(this.userService.currentUser()) email=this.userService.currentUser().email;
    return this.http.get(this.baseUrl+"/gettitre.php?email="+email);
  }
  findAllTitreOfUsers():Observable<any>{
    let email='';
    return this.http.get(this.baseUrl+"/gettitres.php");
  }
  payeTitreManuelAdmin(titre:Titre):Observable<any>{
    return this.http.post(this.baseUrl+"titre/titre_paye_manuel_admin.php",titre);
  }
  debuteTitreManuelAdmin(titre:Titre):Observable<any>{
    return this.http.post(this.baseUrl+"titre/titre_debute_manuel_admin.php",titre);
  }
  supprimerTitreManuelAdmin(titre:Titre):Observable<any>{
    return this.http.post(this.baseUrl+"titre/titre_supprimer_manuel_admin.php",titre);
  }
  addTitre(titre:Titre):Observable<any>{
    return this.http.post(this.baseUrl+"titre/titre_add_manuel_admin.php",titre);
  }

}
