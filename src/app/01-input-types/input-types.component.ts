import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-types',
  template: `
    <form #form="ngForm" (submit)="submit()">
      <h1>Input types</h1>

      <label for="text">Text</label>
      <input type="text" id="text" name="formText" [(ngModel)]="model.text" />

      <label for="number">Number</label>
      <input
        type="number"
        id="number"
        name="formNumber"
        [(ngModel)]="model.number"
      />

      <label for="select">Select</label>
      <select id="select" name="formSelect" [(ngModel)]="model.select">
        <option [value]="null">Default Option</option>
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>

      <label>Checkbox list</label>
      <div class="flex space-x-4">
        <div class="checkbox-container" *ngFor="let check of model.checks">
          <input
            type="checkbox"
            [id]="'formCheckbox' + check.id"
            [name]="'formCheckbox' + check.id"
            [(ngModel)]="check.selected"
          />
          <label [for]="'formCheckbox' + check.id">{{ check.label }}</label>
        </div>
      </div>

      <label>Radio group</label>
      <div class="flex space-x-4">
        <div class="radio-container">
          <input
            type="radio"
            id="radio-1"
            name="formRadioGroup"
            [value]="1"
            [(ngModel)]="model.radio"
          />
          <label for="radio-1">Radio One</label>
        </div>
        <div class="radio-container">
          <input
            type="radio"
            id="radio-2"
            name="formRadioGroup"
            [value]="2"
            [(ngModel)]="model.radio"
          />
          <label for="radio-2">Radio Two</label>
        </div>
        <div class="radio-container">
          <input
            type="radio"
            id="radio-3"
            name="formRadioGroup"
            [value]="3"
            [(ngModel)]="model.radio"
          />
          <label for="radio-3">Radio Three</label>
        </div>
      </div>

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class InputTypesComponent {
  @Output() submitEmitter = new EventEmitter<FormModel>();

  @ViewChild(NgForm) form!: NgForm;

  model: FormModel = {
    text: '',
    number: 0,
    select: null,
    checks: [
      {
        id: 'check-one',
        label: 'Check One',
        selected: false,
      },
      {
        id: 'check-two',
        label: 'Check Two',
        selected: false,
      },
      {
        id: 'check-three',
        label: 'Check Three',
        selected: false,
      },
    ],
    radio: null,
  };

  options = [
    {
      value: 1,
      label: 'Option One',
    },
    {
      value: 2,
      label: 'Option Two',
    },
    {
      value: 3,
      label: 'Option Three',
    },
  ];

  submit() {
    if (this.form.valid) {
      this.submitEmitter.emit(this.model);
    } else {
      this.form.form.markAllAsTouched();
    }
  }
}

interface FormModel {
  text: string;
  number: number;
  select: number | null;
  checks: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  radio: number | null;
}

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [InputTypesComponent],
  exports: [InputTypesComponent],
})
export class InputTypesModule {}
