import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Flight, Journey } from '../entities/modelFlights';

interface State {
  exchange: any[];
}

@Injectable({ providedIn: 'root' })
export class ExchangeMoneyStateService {
  #state = new BehaviorSubject<State>({
    exchange: [],
  });

  getExchange() {
    return this.#state.asObservable().pipe(map((state) => state.exchange));
  }
  setExchange(exchange: any) {
    this.#state.next({
      ...this.#state.value,
      exchange: exchange,
    });
  }
}
