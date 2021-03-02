import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authGuardService: AuthGuardService) {
  }
  baseUrl = environment.urlapi + "/";

  isLoginIn() {
    return this.authGuardService.isLoginIn;
  }
  isAdmin(){
    return this.currentUser().role=='ADMIN';
  }

  currentUser() {
    if (sessionStorage.getItem('user_access')) {
      return JSON.parse(sessionStorage.getItem('user_access'));
    }
    return this.authGuardService.currentUserValue;
  }
  logout() {
    this.authGuardService.logout();
  }

  loginUserByLoginAndPassword(login: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'login.php', { email: login, password: password });
  }

  findUserById(): Observable<any> {
    let id;
    if (this.currentUser()) id = this.currentUser().id;
    return this.http.get(this.baseUrl + "get_user.php?id=" + id);
  }
  updateUser(user: User): Observable<any> {
    let id;
    if (this.currentUser()) id = this.currentUser().id;
    return this.http.post(this.baseUrl + "update_user.php?id=" + id, user);
  }

  addAccount(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'user_register.php', user);
  }


}
