import { Directive, Input } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';

function requiredCheckboxGroup(requiredCheckboxes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selected = Object.values(control.value).filter(Boolean).length;
    if (selected < requiredCheckboxes) {
      return {
        requiredCheckboxGroup: requiredCheckboxes,
      };
    }

    return null;
  };
}

@Directive({
  selector: '[requiredCheckboxGroup][ngModelGroup]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RequiredCheckboxGroupValidatorDirective,
      multi: true,
    },
  ],
})
export class RequiredCheckboxGroupValidatorDirective implements Validator {
  @Input() requiredCheckboxGroup = 1;

  validate(control: AbstractControl): ValidationErrors | null {
    return requiredCheckboxGroup(this.requiredCheckboxGroup)(control);
  }
}
