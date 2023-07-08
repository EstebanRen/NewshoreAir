import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { Flight, FormFlightData, Journey } from 'src/app/entities/modelFlights';
import { ExchangeMoneyStateService } from 'src/app/services/exchange-money-state.service';
import { ExchangeMoneyFacadeService } from 'src/app/services/exchange-money.facade';
import { FlightsStateService } from 'src/app/services/flights-state.service';
import { FlightsFacadeService } from 'src/app/services/flights.facade';
import { FlightFuntionService } from 'src/app/utils/fligths-function.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  journey!: Journey[];
  flights!: Flight[];
  loading = false;
  exchange: any;
  constructor(
    private flightsState: FlightsStateService,
    private flightsFacade: FlightsFacadeService,
    private exchangeMoneyFacade: ExchangeMoneyFacadeService,
    private exchangeMoneyState: ExchangeMoneyStateService,

  ) { }
  ngOnInit(): void {
    combineLatest([
      this.flightsState.getFlights(),
      this.flightsState.getLoading(),
      this.flightsState.getJourney(),
      this.exchangeMoneyState.getExchange()
    ]).subscribe(([flights, loading, journey, exchange]) => {
      this.flights = flights;
      this.loading = loading;
      this.journey = journey;
      this.exchange = exchange;
    });
  }
  characteristicsFlight(characteristics: any) {
    this.flightsFacade.searchFlightsRoutes(characteristics);
  }
  changeCurrencyJourney(value:number){
    this.flightsFacade.exchangeMoney(this.journey,value);
  }
  reservateFlight(){
    this.flightsFacade.reservate();

  }
}
