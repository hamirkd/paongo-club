import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// const Binance = require('node-binance-api');
// const binance = new Binance().options({
//   APIKEY: 'pOyLqIz8FdGeH1ikheBFgTBob6Ch6bjWPQXMOwVJKxuEgHmeTxqhJMXjFkBnWYQL',
//   APISECRET: 'ykg8cFMDkpaMhtUARfqvFWOuYIWU0UHILkgzyFeYsfxhUQnGGz6PIHGClkgK25VX'
// });
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,',
  'Access-Control-Allow-Origin': '*',
  'X-MBX-APIKEY':'pOyLqIz8FdGeH1ikheBFgTBob6Ch6bjWPQXMOwVJKxuEgHmeTxqhJMXjFkBnWYQL'
})
};
@Injectable({
  providedIn: 'root'
})
export class BinanceService {
  url: string = "https://api.binance.com"
  query: string = "/api/v1/exchangeInfo"
  params: string = '?symbol=ETHUSDT'
  currencies: any;
  constructor(public http: HttpClient) { }

  getMyBalance() {

    // binance.balance((error, balances) => {
    //   if ( error ) return console.error(error);
    //   console.info("balances()", balances);
    //   console.info("ETH balance: ", balances.ETH.available);
    // });

    this.http.get(this.url + this.query).subscribe(data => {
      console.log(data)

    })

  }

  getBalance(){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Access-Control-Allow-Headers', 'X-MBX-APIKEY');
    headers.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    headers.set('Access-Control-Allow-Headers', 'Accept');
    headers.set('Access-Control-Allow-Origin', '*');
    // headers.set('binance-api-key', 'pOyLqIz8FdGeH1ikheBFgTBob6Ch6bjWPQXMOwVJKxuEgHmeTxqhJMXjFkBnWYQL');
    headers.set('X-MBX-APIKEY', 'pOyLqIz8FdGeH1ikheBFgTBob6Ch6bjWPQXMOwVJKxuEgHmeTxqhJMXjFkBnWYQL');
    // headers.set('binance-api-secret', 'ykg8cFMDkpaMhtUARfqvFWOuYIWU0UHILkgzyFeYsfxhUQnGGz6PIHGClkgK25VX');
    
    // XHRGEThttps://api.binance.com/api/v3/account?timestamp=1615147494138&&signature=Paongo
   
    let dateTime=new Date().getTime();
    this.http.get('https://api.binance.com/api/v3/account?timestamp='+dateTime+'&&signature=Paongo',{headers:headers}).subscribe(data => {
        console.log(data)

    })
  }
  getMarkets() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('binance-api-key', 'pOyLqIz8FdGeH1ikheBFgTBob6Ch6bjWPQXMOwVJKxuEgHmeTxqhJMXjFkBnWYQL');
    headers.set('X-MBX-APIKEY', 'pOyLqIz8FdGeH1ikheBFgTBob6Ch6bjWPQXMOwVJKxuEgHmeTxqhJMXjFkBnWYQL');
    headers.set('binance-api-secret', 'ykg8cFMDkpaMhtUARfqvFWOuYIWU0UHILkgzyFeYsfxhUQnGGz6PIHGClkgK25VX');
    

    const path = 'https://api.binance.com/api/v1/exchangeInfo';
    return this.http.get(path, {headers: headers});
}
}
