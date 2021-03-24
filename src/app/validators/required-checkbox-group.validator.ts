import { Directive, Input, NgModule } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { VALIDATION_MESSAGES } from './validation-messages';

function requiredCheckboxGroup(
  requiredCheckboxes: number,
  groupName?: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selected = Object.values(control.value).filter(Boolean).length;
    if (selected < requiredCheckboxes) {
      return {
        requiredCheckboxGroup: { requiredCheckboxes, groupName },
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
  private _requiredCheckboxGroup = 1;
  private _onChange?: () => void;

  @Input()
  get requiredCheckboxGroup() {
    return this._requiredCheckboxGroup;
  }

  set requiredCheckboxGroup(value: number | string) {
    this._requiredCheckboxGroup =
      (typeof value === 'string' ? parseInt(value, 10) : value) || 1;
    if (this._onChange) {
      this._onChange();
    }
  }

  @Input() groupName?: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return requiredCheckboxGroup(
      this._requiredCheckboxGroup,
      this.groupName
    )(control);
  }

  registerOnValidatorChange?(fn: () => void): void {
    this._onChange = fn;
  }
}

@NgModule({
  declarations: [RequiredCheckboxGroupValidatorDirective],
  exports: [RequiredCheckboxGroupValidatorDirective],
  providers: [
    {
      provide: VALIDATION_MESSAGES,
      useValue: {
        requiredCheckboxGroup: (details: any) =>
          `This field must have at least ${details.requiredCheckboxes} ${
            details.groupName || 'item'
          } selected`,
      },
      multi: true,
    },
  ],
})
export class RequiredCheckboxGroupValidatorModule {}
