import { Pipe, PipeTransform, Inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationMessages, VALIDATION_MESSAGES } from './validation-messages';

@Pipe({ name: 'validate' })
export class ValidatePipe implements PipeTransform {
  // create a key-value pair out of the provided validation messages
  readonly validationMessage = this.validationMessages.reduce(
    (all, entry) => ({ ...all, ...entry }),
    {} as ValidationMessages
  );

  constructor(
    @Inject(VALIDATION_MESSAGES)
    readonly validationMessages: ValidationMessages[]
  ) {}

  transform(validationErrors: ValidationErrors | null) {
    // pluck the first error out of the errors
    const [error] = Object.entries(validationErrors || {});
    if (!error) {
      return '';
    }

    // create the validation message
    const [errorKey, errorDetails] = error;
    const template = this.validationMessage[errorKey];
    return template ? template(errorDetails) : 'This field is invalid';
  }
}
