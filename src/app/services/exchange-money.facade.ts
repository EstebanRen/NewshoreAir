import { Injectable } from '@angular/core';
import { ExchangeMoneyService } from './exchange-money-api.service';
import { PopUpMessageComponent } from '../components/pop-up-message/pop-up-message.component';
import { ExchangeMoneyStateService } from './exchange-money-state.service';

@Injectable()
export class ExchangeMoneyFacadeService {
  dialog: any;
 
  constructor(
    private exchangeMoneyService: ExchangeMoneyService,
    private exchangeMoneyState: ExchangeMoneyStateService,

  ) {
    this.getDataExchangeMoneyApi();
  }

  getDataExchangeMoneyApi(){
    this.exchangeMoneyService.getExchangeFromAPI().subscribe((response: any) => {
        this.exchangeMoneyState.setExchange(Object.entries(response.rates))
      }, (error: any) => {
        this.error(error);
      });
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
 
}
