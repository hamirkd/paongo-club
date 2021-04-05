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
    if (localStorage.getItem('user_access')) {
      return JSON.parse(localStorage.getItem('user_access'));
    }
    return this.authGuardService.currentUserValue;
  }
  logout() {
    this.authGuardService.logout();
    this.http.post(this.baseUrl+'api/auth/logout',{});
  }

  loginUserByLoginAndPassword(login: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/login', { email: login, password: password });
  }

  findUserById(): Observable<any> {
    return this.http.get(this.baseUrl + "api/auth/user-profile");
  }

  findAllUsers(): Observable<any>{
    return this.http.get(this.baseUrl + "api/auth/findAllUser");
  }

  deleteUser(user:User): Observable<any>{
    return this.http.delete(this.baseUrl + "api/auth/deleteUser/"+user.id);
  }

  bloquerUser(user:User): Observable<any>{
    return this.http.get(this.baseUrl + "api/auth/bloquerUser/"+user.id);
  }

  updateUser(user: User): Observable<any> {
    console.log(user)
    return this.http.put(this.baseUrl + "api/auth/update", user);
  }

  addAccount(user: User): Observable<any> {
    console.log(user);
    return this.http.post(this.baseUrl + 'api/auth/register', user);
  }

  
  sendPasswordLinkReset(email: string): Observable<any> {
    return this.http.post(this.baseUrl + 'api/password-forget', { email: email });
  }
  
  verifyValidToken(token: string): Observable<any> {
    return this.http.post(this.baseUrl + 'api/password-verify', { token: token });
  }
  resetPassword(user: User): Observable<any> {
    console.log(user)
    return this.http.post(this.baseUrl + 'api/password-init', { email:user.email,
    password:user.password,password_confirmation:user.password_confirmation });
  }


}
