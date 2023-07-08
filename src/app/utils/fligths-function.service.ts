import { Injectable } from '@angular/core';
import { Flight } from '../entities/modelFlights';

@Injectable({
  providedIn: 'root',
})
export class FlightFuntionService {

  flights!: Flight[];

  findRoutes(flights:Flight[],origin: string, destination: string): Flight[][] {
    this.flights=flights;
    const visited: string[] = [];
    const routes: Flight[][] = [];
    const currentRoute: Flight[] = [];
    this.searchAllRoutes(origin, destination, visited, currentRoute, routes);
    return routes;
  }
  searchAllRoutes(currentOrigin: string, destination: string, visited: string[], currentRoute: Flight[], routes: Flight[][]): void {
    visited.push(currentOrigin);
    if (currentOrigin === destination) {
      routes.push([...currentRoute]);
    } else {
      const flightsFromOrigin = this.flights.filter(
        (flight: Flight) => flight.origin === currentOrigin && !visited.includes(flight.destination)
      );
      for (const flight of flightsFromOrigin) {
        currentRoute.push(flight);
        this.searchAllRoutes(flight.destination, destination, visited, currentRoute, routes);
        currentRoute.pop();
      }
    }
    visited.pop();
  }

}