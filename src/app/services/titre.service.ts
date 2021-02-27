import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
