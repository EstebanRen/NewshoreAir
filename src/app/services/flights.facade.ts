import { Injectable } from '@angular/core';
import { FlightsStateService } from './flights-state.service';
import { FlightsService } from './flights-api.service';
import { Flight, FlightData, Journey, Transport } from '../entities/modelFlights';
import { FlightFuntionService } from '../utils/fligths-function.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpMessageComponent } from '../components/pop-up-message/pop-up-message.component';

@Injectable()
export class FlightsFacadeService {
  flights!: Flight[];

  constructor(
    private flightsState: FlightsStateService,
    private flightsService: FlightsService,
    private flightFuntion: FlightFuntionService,
    private dialog: MatDialog
  ) {
    this.flightsService.getFlightsFromAPI().subscribe((response: FlightData[]) => {
      this.mappingDataFromService(response);
    }, (error: any) => {
      this.error(error);
    });
  }

  mappingDataFromService(response: FlightData[]): void {
    this.flights = response.map((flightData: FlightData) => {
      const transport = new Transport(flightData.flightCarrier, flightData.flightNumber);
      return new Flight(transport, flightData.departureStation, flightData.arrivalStation, flightData.price);
    });
    this.updateFlights(this.flights)
  }

  error(error: any): void {
    const dialogRef = this.dialog.open(PopUpMessageComponent, {
      width: '100%',
      panelClass: 'modal-pricing-plans-page',     
      data: {
        title: 'Upss!',
        message: 'Estamos teniendo problemas técnicos, por favor espera mientras traemos tus vuelos de vuelta',
      }
    });
  }



  searchFlightsRoutes(characteristics: any) {
    this.mappingDataFromFlights(
      this.flightFuntion.findRoutes(
        this.flights, characteristics.originStation, characteristics.arrivalStation),
      characteristics.originStation, characteristics.arrivalStation,characteristics.scales)
  }
  exchangeMoney(journeys:Journey[],exchange:number){
    const updatedJourneys = journeys.map((journey) => {
      return {
        ...journey,
        price: journey.price * exchange
      };
    });
    this.updateJourney(updatedJourneys);
  }
  mappingDataFromFlights(data: Flight[][], origin: string, destination: string,scales:number) {
    const journeys: Journey[] = data.map((route: Flight[]) => {
      const totalPrice = route.reduce((total, flight) => total + flight.price, 0);
      return new Journey(route, origin, destination, totalPrice);
    });
    this.mappingJourneyDataScales(journeys,scales)
  }
  mappingJourneyDataScales(journeys:Journey[],scales:number) {
    const filteredFlights = journeys.filter((journey) => journey.flights.length <= scales);
    if(filteredFlights.length==0){
      this.noFoundJourney();
    }
    else{
      this.updateJourney(filteredFlights);
    }
  }

  updateFlights(flights: Flight[]): void {
    this.flightsState.setLoading(true);
    this.flightsState.setFlights(flights);
  }

  updateJourney(journey: Journey[]): void {
    this.flightsState.setLoading(true);
    this.flightsState.setJourney(journey);
  }
  reservate(){
    const dialogRef = this.dialog.open(PopUpMessageComponent, {
      width: '100%',
      panelClass: 'modal-pricing-plans-page',     
      data: {
        title: 'Vuelo reservado',
        message: 'Tu vuelo ha sido reservado, muchas gracias por confiar en Newshore.',
      }
    }).afterClosed().subscribe(res => {
      const resetJourney: Journey[] = [];
      this.updateJourney(resetJourney);
    });;
  }
  noFoundJourney(){
    const dialogRef = this.dialog.open(PopUpMessageComponent, {
      width: '100%',
      panelClass: 'modal-pricing-plans-page',     
      data: {
        title: 'Upss!',
        message: 'Parece ser que no tenemos vuelos con esas características, te pedimos que cambies la cantidad de escalas o el destino. Ten buen viaje',
      }
    });
  }
}
