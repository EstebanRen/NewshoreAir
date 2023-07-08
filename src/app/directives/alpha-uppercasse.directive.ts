import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAlphaUppercase]'
})
export class AlphaUppercaseDirective {
  
  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const uppercaseValue = value.toUpperCase().replace(/[^A-Z]/g, '');
    this.ngControl.control!.setValue(uppercaseValue, { emitEvent: false });
  }
}