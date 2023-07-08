import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Journey } from 'src/app/entities/modelFlights';

@Component({
  selector: 'app-flights-response',
  templateUrl: './flights-response.component.html',
  styleUrls: ['./flights-response.component.css'],
})
export class FlightsResponseComponent {
  @Output() changeCurrencyFlight: EventEmitter<any> = new EventEmitter();
  @Output() reservateFlight: EventEmitter<any> = new EventEmitter();
  @Input() flightData!: Journey[];
  @Input() exchange:any;
  exchangeName:any[]=['USD'];
  onCurrencySelected(event: any) {
    this.exchangeName = [event.value[0]]; // Asignar el valor en un arreglo a exchange
    this.changeCurrencyFlight.emit(event.value[1]); // Emitir el valor a través del evento changeCurrencyFlight
  }
  onClickReserve(){
    this.reservateFlight.emit()
  }
}
