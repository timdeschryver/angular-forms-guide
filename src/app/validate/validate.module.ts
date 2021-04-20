import { NgModule } from '@angular/core';
import { ValidatePipe } from './validate.pipe';
import { VALIDATION_MESSAGES } from './validation-messages';

@NgModule({
  declarations: [ValidatePipe],
  exports: [ValidatePipe],
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
export class ValidateModule {}
