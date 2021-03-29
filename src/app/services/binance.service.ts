import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BinanceService {

  baseUrl = environment.urlapi+"/";

  constructor(public http: HttpClient) { }

  getMyBalance(titre:string):Observable<any>{
    return this.http.get(this.baseUrl+"api/binance/"+titre);
  }

  // getBalance() {
  //   binanceClient.fetchBalance().then(b => {
  //     console.log(b)
  //   })
  // }

  // getMarkets() {
  //   const headers = new HttpHeaders();
  //   headers.set('Content-Type', 'application/json');
  //   headers.set('Accept', 'application/json');
  //   headers.set('Access-Control-Allow-Headers', 'Content-Type');
  //   headers.set('Access-Control-Allow-Origin', '*');
  //   headers.set('binance-api-key', '89ffa4c3393fe44e36d1ee674ce6c00fb4e62c89239f1115a5c566e49b7fec09');
  //   headers.set('X-MBX-APIKEY', '89ffa4c3393fe44e36d1ee674ce6c00fb4e62c89239f1115a5c566e49b7fec09');
  //   headers.set('binance-api-secret', '6e8b8649de96ca18cafdd4bba878abd22ede84dc2b78c14ff85faa9b5ab62f45');
  //   const path = 'https://api.binance.com/api/v1/exchangeInfo';
  //   return this.http.get(path, { headers: headers });
  // }

}
