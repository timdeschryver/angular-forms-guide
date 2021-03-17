import { Input, Directive } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';

export function equalTo(value: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== value) {
      return {
        equalTo: value,
      };
    }

    return null;
  };
}

@Directive({
  selector: '[equalTo][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EqualToValidatorDirective,
      multi: true,
    },
  ],
})
export class EqualToValidatorDirective implements Validator {
  private _equalTo: any;
  private _onChange?: () => void;

  @Input()
  get equalTo() {
    return this._equalTo;
  }

  set equalTo(value: any) {
    this._equalTo = value;
    if (this._onChange) this._onChange();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return equalTo(this.equalTo)(control);
  }

  registerOnValidatorChange?(fn: () => void): void {
    this._onChange = fn;
  }
}
