import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Flight,Journey } from '../entities/modelFlights';

interface State {
  journey: Journey[];
  flights: Flight[];
  error: unknown;
  loading: boolean;
}

@Injectable({ providedIn: 'root' })

export class FlightsStateService {
  #state = new BehaviorSubject<State>({
    journey:[],
    flights: [],
    error: null,
    loading: false,
  });

  getJourney() {
    return this.#state.asObservable().pipe(map((state) => state.journey));
  }

  getFlights() {
    return this.#state.asObservable().pipe(map((state) => state.flights));
  }
 
  getLoading() {
    return this.#state.asObservable().pipe(map((state) => state.loading));
  }
  getError() {
    return this.#state.asObservable().pipe(map((state) => state.error));
  }
  setJourney(journey: Journey[]) {
    this.#state.next({
      ...this.#state.value,
      journey:journey,
    });
  }
  setFlights(flights: Flight[]) {
    this.#state.next({
      ...this.#state.value,
      flights: flights,
    });
  }
  setLoading(loading: boolean) {
    this.#state.next({
      ...this.#state.value,
      loading,
    });
  }
  setError(loading: boolean) {
    this.#state.next({
      ...this.#state.value,
      loading,
    });
  }
}
