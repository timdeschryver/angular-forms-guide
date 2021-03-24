import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ValidatorModule } from '../validators';
import { FormErrorsModule } from '../form-errors';

@Component({
  selector: 'app-errors',
  template: `
    <form #form="ngForm" (submit)="submit()">
      <h1>Errors</h1>

      <div formField data-testid="email-field">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          [(ngModel)]="model.email"
          required
          email
          #email="ngModel"
        />

        <div class="help info">
          {{ email.status }} | {{ email.pristine ? 'pristine' : 'dirty' }} |
          {{ email.untouched ? 'untouched' : 'touched' }}
        </div>
      </div>

      <label>Flavor(s)</label>
      <div
        class="flex space-x-4"
        ngModelGroup="flavor"
        groupName="flavor"
        requiredCheckboxGroup
        formField
        #flavor="ngModelGroup"
      >
        <div class="checkbox-container" *ngFor="let flavor of model.flavors">
          <input
            type="checkbox"
            [id]="flavor.label"
            [name]="flavor.label"
            [(ngModel)]="flavor.selected"
          />
          <label [for]="flavor.label">{{ flavor.label }}</label>
        </div>
      </div>
      <div class="help info">
        {{ flavor.status }} | {{ flavor.pristine ? 'pristine' : 'dirty' }} |
        {{ flavor.untouched ? 'untouched' : 'touched' }}
      </div>

      <label for="vessel">Vessel</label>
      <select
        id="vessel"
        name="vessel"
        [(ngModel)]="model.vessel"
        required
        #vessel="ngModel"
      >
        <option value="">---</option>
        <option>Cone</option>
        <option>Cup</option>
      </select>
      <div class="help info">
        {{ vessel.status }} | {{ vessel.pristine ? 'pristine' : 'dirty' }} |
        {{ vessel.untouched ? 'untouched' : 'touched' }}
      </div>

      <div class="flex justify-end my-2">
        <button>Submit Form</button>
      </div>

      <div class="flex space-x-4">
        <div class="flex-1">
          <h2>Form States</h2>
          <pre>{{
            {
              status: form.status,
              submitted: form.submitted,
              valid: form.valid,
              invalid: form.invalid,
              pending: form.pending,
              pristine: form.pristine,
              dirty: form.dirty,
              untouched: form.untouched,
              touched: form.touched
            } | json
          }}</pre>
        </div>
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
export class ErrorsComponent {
  @Output() submitEmitter = new EventEmitter<any>();

  @ViewChild(NgForm) form!: NgForm;

  model = {
    email: '',
    vessel: '',
    flavors: [
      {
        label: 'Vanilla',
        selected: false,
      },
      {
        label: 'Chocolate',
        selected: false,
      },
      {
        label: 'Strawberry',
        selected: false,
      },
      {
        label: 'Lemon',
        selected: false,
      },
      {
        label: 'Mango',
        selected: false,
      },
    ],
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
  imports: [FormsModule, CommonModule, ValidatorModule, FormErrorsModule],
  declarations: [ErrorsComponent],
  exports: [ErrorsComponent],
})
export class ErrorsModule {}
