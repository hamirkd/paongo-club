import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "app/models/user.model";

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private _router: Router) { }
    user: User
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.user) {
            return true;
        }
        this.user = JSON.parse(sessionStorage.getItem("user_access"));
        if (this.user) {
            
            console.log(this.user)
            return true;
        }
        this._router.navigate(['/login']);
        return false;
    }
    
    get isLoginIn() {
        if (this.user) {
            return true;
        }
        if (sessionStorage.getItem("user_access")) {
            this.user = JSON.parse(sessionStorage.getItem("user_access"));
            return true;
        }
    }

    get currentUserValue(){
        if (this.user) {
            return this.user;
        }
        else
        if (sessionStorage.getItem("user_access")) {
            this.user = JSON.parse(sessionStorage.getItem("user_access"));
            return this.user;
        }
    }

    logout(){
        this.user=null;
        console.log(this.user)
        sessionStorage.removeItem("user_access");
        this._router.navigate(['/login']);
        return false;
    }

}