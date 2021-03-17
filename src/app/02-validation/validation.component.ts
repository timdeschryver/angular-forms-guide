import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ValidatorModule } from '../validators/validators.module';
import { UniqueUsernameValidatorDirective } from './unique-username.validator';

@Component({
  selector: 'app-validation',
  template: `
    <form #form="ngForm" (submit)="submit()">
      <h1>Validators</h1>

      <fieldset>
        <legend>Dynamic Validator</legend>

        <div class="checkbox-container">
          <input
            type="checkbox"
            id="makeNameRequired"
            name="makeNameRequired"
            [(ngModel)]="model.makeNameRequired"
          />
          <label for="makeNameRequired">Make "name" required</label>
        </div>

        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          [(ngModel)]="model.name"
          [required]="model.makeNameRequired"
          #name="ngModel"
        />
        <div *ngIf="name.invalid && name.touched" class="help error">
          <div *ngIf="name.errors?.required">Name is required</div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Custom Validator</legend>

        <label>Pick a time</label>
        <div
          class="flex space-x-4"
          ngModelGroup="times"
          [requiredCheckboxGroup]="1"
          data-testid="times"
          #times="ngModelGroup"
        >
          <div class="checkbox-container" *ngFor="let time of model.times">
            <input
              type="checkbox"
              [id]="time.label"
              [name]="time.label"
              [(ngModel)]="time.selected"
            />
            <label [for]="time.label">{{ time.label }}</label>
          </div>
        </div>
        <div *ngIf="times.invalid && times.touched" class="help error">
          <div *ngIf="times.errors?.requiredCheckboxGroup">
            You must select {{ times.errors!.requiredCheckboxGroup }} items
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Revalidate Validator</legend>

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          [(ngModel)]="model.password"
        />

        <label for="password-confirmation">Password confirmation</label>
        <input
          type="password"
          id="password-confirmation"
          name="password-confirmation"
          [(ngModel)]="model.passwordConfirmation"
          [equalTo]="model.password"
          #passwordConfirmation="ngModel"
        />
        <div
          *ngIf="passwordConfirmation.invalid && passwordConfirmation.touched"
          class="help error"
        >
          <div *ngIf="passwordConfirmation.errors?.equalTo">
            Password confirmation must be equal to password
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Async Validator</legend>

        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          uniqueUsername
          [(ngModel)]="model.username"
          [ngModelOptions]="{ updateOn: 'blur' }"
          #username="ngModel"
        />
        <div *ngIf="username.pending" class="help info">Pending</div>
        <div *ngIf="username.invalid && username.touched" class="help error">
          <div *ngIf="username.errors?.usernameTaken">
            Username is already taken
          </div>
        </div>
      </fieldset>

      <div class="flex justify-end my-2">
        <button>Submit Form</button>
      </div>

      <div class="flex space-x-4">
        <div class="flex-1">
          <h2>Form Value</h2>
          <pre>{{ form.form.value | json }}</pre>
        </div>
        <div class="flex-1">
          <h2>Data Model</h2>
          <pre>{{ model | json }}</pre>
        </div>
      </div>
    </form>
  `,
})
export class ValidationComponent {
  @Output() submitEmitter = new EventEmitter<any>();

  @ViewChild(NgForm) form!: NgForm;

  model = {
    makeNameRequired: false,
    name: '',
    times: [
      {
        label: 'Morning',
        selected: false,
      },
      {
        label: 'Noon',
        selected: false,
      },
      {
        label: 'Afternoon',
        selected: false,
      },
      {
        label: 'Evening',
        selected: false,
      },
    ],
    password: '',
    passwordConfirmation: '',
    username: '',
  };

  submit() {
    if (this.form.valid) {
      this.submitEmitter.emit(this.model);
    } else {
      this.form.form.markAllAsTouched();
    }
  }
}

@NgModule({
  imports: [FormsModule, CommonModule, ValidatorModule],
  declarations: [ValidationComponent, UniqueUsernameValidatorDirective],
  exports: [ValidationComponent, UniqueUsernameValidatorDirective],
})
export class ValidationModule {}
