import { NgModule } from '@angular/core';
import { FlightsComponent } from './flights.component';
import { FlightRoutingModule } from './flights-routing.module';
import { FlightsFormComponent } from './components/flights-form/flights-form.component';
import { FlightsResponseComponent } from './components/flights-response/flights-response.component';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlphaUppercaseDirective } from 'src/app/directives/alpha-uppercasse.directive';
import { CommonModule } from '@angular/common';
import { FlightsFacadeService } from 'src/app/services/flights.facade';
import { ExchangeMoneyFacadeService } from 'src/app/services/exchange-money.facade';

@NgModule({
  declarations: [
    FlightsComponent,
    FlightsFormComponent,
    FlightsResponseComponent,
    AlphaUppercaseDirective
  ],
  imports: [
    FlightRoutingModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [FlightsFacadeService,ExchangeMoneyFacadeService],
})
export class FlightModule { }
