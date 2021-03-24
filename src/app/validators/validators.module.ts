import { NgModule } from '@angular/core';
import { EqualToValidatorModule } from './equal-to.validator';
import { RequiredCheckboxGroupValidatorModule } from './required-checkbox-group.validator';
import { VALIDATION_MESSAGES } from './validation-messages';

@NgModule({
  imports: [RequiredCheckboxGroupValidatorModule, EqualToValidatorModule],
  exports: [RequiredCheckboxGroupValidatorModule, EqualToValidatorModule],
  providers: [
    {
      provide: VALIDATION_MESSAGES,
      useValue: {
        required: () => 'This field is required',
        email: () => 'This field must be a valid email',
        minlength: (details: any) =>
          `This field must have a minimum length of ${details.requiredLength}`,
        maxlength: (details: any) =>
          `This field must have a maximum length of ${details.requiredLength}`,
      },
      multi: true,
    },
  ],
})
export class ValidatorModule {}
