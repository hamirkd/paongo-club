import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitreModelService {
  baseUrl = environment.urlapi + "/";

  constructor(private http: HttpClient) {
  }
  findAllTitres():Observable<any>{
    return this.http.get(this.baseUrl + "api/titres");
  }
}
