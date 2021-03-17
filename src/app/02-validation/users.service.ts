import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isUsernameTaken(username: string) {
    return of(username === 'tim').pipe(delay(1000));
  }
}
