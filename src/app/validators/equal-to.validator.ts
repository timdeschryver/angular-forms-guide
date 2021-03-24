import { Input, Directive, NgModule } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { VALIDATION_MESSAGES } from './validation-messages';

export function equalTo(value: any, equalToName?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== value) {
      return {
        equalTo: { value, name: equalToName },
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

  @Input() equalToName?: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return equalTo(this.equalTo, this.equalToName)(control);
  }

  registerOnValidatorChange?(fn: () => void): void {
    this._onChange = fn;
  }
}

@NgModule({
  declarations: [EqualToValidatorDirective],
  exports: [EqualToValidatorDirective],
  providers: [
    {
      provide: VALIDATION_MESSAGES,
      useValue: {
        equalTo: (details: any) =>
          `This field must be equal to "${details.name || details.value}"`,
      },
      multi: true,
    },
  ],
})
export class EqualToValidatorModule {}
