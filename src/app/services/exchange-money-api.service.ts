import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})

export class ExchangeMoneyService {

  constructor(private http: HttpClient) { }

  getExchangeFromAPI() {
    return this.http.get<any>(environment.urlApiExchangeMonet)
  }
}
