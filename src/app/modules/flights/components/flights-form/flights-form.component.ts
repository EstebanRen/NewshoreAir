import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormFlightData } from 'src/app/entities/modelFlights';
import { FlightFuntionService } from 'src/app/utils/fligths-function.service';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.css']
})
export class FlightsFormComponent {
  @Output() characteristicsFlight: EventEmitter<any> = new EventEmitter();
  formFlight: FormGroup;
  constructor() {
    this.formFlight = new FormGroup({
      originStation: new FormControl("", [Validators.required]),
      arrivalStation: new FormControl("", [Validators.required]),
      scales: new FormControl(0, [Validators.required]),
    }, { validators: this.checkSameValues });
  }
  checkSameValues(formGroup: AbstractControl): ValidationErrors | null {
    const origin = formGroup.get('originStation')?.value;
    const destination = formGroup.get('arrivalStation')?.value;
    if (origin === destination) {
      formGroup.get('arrivalStation')?.setErrors({ sameValues: true });
    } else {
      formGroup.get('arrivalStation')?.setErrors(null);
    }
    return null;
  }

  onClickSearchFligths() {
    this.characteristicsFlight.emit(this.formFlight.value);

    if (this.formFlight.valid && this.formFlight.get('origin')?.dirty && this.formFlight.get('destination')?.dirty) {
    }
  }
}
