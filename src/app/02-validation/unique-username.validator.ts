import { Directive, Inject } from '@angular/core';
import {
  NG_ASYNC_VALIDATORS,
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from './users.service';

@Directive({
  selector: '[uniqueUsername][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueUsernameValidatorDirective,
      multi: true,
    },
  ],
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.usersService.isUsernameTaken(control.value as string).pipe(
      map((taken) => {
        return taken ? { usernameTaken: true } : null;
      })
    );
  }
}
