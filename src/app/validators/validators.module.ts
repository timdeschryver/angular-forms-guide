import { NgModule } from '@angular/core';
import { EqualToValidatorDirective } from './equal-to.validator';
import { RequiredCheckboxGroupValidatorDirective } from './required-checkbox-group.validator';

@NgModule({
  declarations: [
    RequiredCheckboxGroupValidatorDirective,
    EqualToValidatorDirective,
  ],
  exports: [RequiredCheckboxGroupValidatorDirective, EqualToValidatorDirective],
})
export class ValidatorModule {}
