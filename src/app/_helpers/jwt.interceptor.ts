import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthGuardService } from 'app/services/auth-guard.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthGuardService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.urlapi);
        if (isLoggedIn) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + currentUser.token) });
        }
        // console.log(request.headers)

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // }
        
        // request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        // request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token') });
        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request);
    }
    
}