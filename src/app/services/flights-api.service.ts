import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightData } from '../entities/modelFlights';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  constructor(private http: HttpClient) { }

  getFlightsFromAPI() {
    return this.http.get<FlightData[]>(environment.urlApiFlights)
  }
}
