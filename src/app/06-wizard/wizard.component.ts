import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormErrorsModule } from '../form-errors';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { GeneralInfoComponent } from './general-info.component';
import { HelpDetails, Model, Rate } from './model,';
import { concatMap, debounceTime, map, startWith, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DetailsComponent } from './details.component';
import { VALIDATION_MESSAGES } from '../validate/validation-messages';

@Component({
  selector: 'app-wizard',
  template: `
    <form #form="ngForm">
      <mat-horizontal-stepper #stepper labelPosition="bottom">
        <mat-step
          ngModelGroup="generalInfo"
          #generalInfo="ngModelGroup"
          [stepControl]="generalInfo.control"
        >
          <ng-template matStepLabel>General Info</ng-template>
          <app-general-info
            [model]="model"
            [helpTypes]="helpTypes"
            [rates]="rates$ | async"
          ></app-general-info>
          <div>
            <button
              mat-button
              matStepperNext
              class="bg-purple-700 hover:bg-purple-900"
            >
              Next
            </button>
          </div>
        </mat-step>
        <mat-step
          ngModelGroup="details"
          #details="ngModelGroup"
          [stepControl]="details.control"
        >
          <ng-template matStepLabel>Details</ng-template>
          <app-details [modelDetails]="model.details"></app-details>

          <div>
            <button
              mat-button
              matStepperPrevious
              class="bg-purple-700 hover:bg-purple-900"
            >
              Back
            </button>
            <button
              mat-button
              matStepperNext
              class="bg-purple-700 hover:bg-purple-900"
            >
              Next
            </button>
          </div>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Done</ng-template>
          <h5>Model value</h5>
          <pre>{{ model | json }}</pre>

          <h5>Form value</h5>
          <pre>{{ form.value | json }}</pre>
          <div>
            <button
              mat-button
              matStepperPrevious
              class="bg-purple-700 hover:bg-purple-900"
            >
              Back
            </button>
            <button
              mat-button
              (click)="stepper.reset()"
              class="bg-purple-700 hover:bg-purple-900"
            >
              Reset
            </button>
          </div>
        </mat-step>
      </mat-horizontal-stepper>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements AfterViewInit, OnDestroy {
  @Output() submitEmitter = new EventEmitter<any>();

  helpTypes = [
    { description: 'Assistance with personal care', value: 1 },
    { description: 'Eldercare', value: 2 },
    { description: 'Child care', value: 3 },
    { description: 'Support with daily tasks', value: 4 },
    { description: 'Cleaning aid', value: 5 },
  ];

  model: Model = {
    firstName: 'Sarah',
    lastName: 'Sanders',
    startDate: null,
    helpTypes: [1, 4],
    details: [
      {
        helpType: this.helpTypes[0],
        days: [1, 2, 3, 4, 5],
        notes: 'The backdoor is always open',
        minimumRequiredHours: 3,
        idealRequiredHours: 5,
      },
      {
        helpType: this.helpTypes[3],
        days: [1, 5],
        notes: 'Needs help for grocery shopping',
        minimumRequiredHours: 1,
        idealRequiredHours: 2,
      },
    ],
  };

  @ViewChild(NgForm) form!: NgForm;
  init$ = new Subject();

  selectedHelpTypes$ = this.init$.pipe(
    concatMap(() => {
      return this.form.form
        .get('generalInfo.helpTypes')!
        .valueChanges.pipe(
          startWith(this.form.form.get('generalInfo.helpTypes')?.value),
          debounceTime(100)
        );
    })
  ) as Observable<number[]>;

  rates$ = this.selectedHelpTypes$.pipe(
    map((value) => {
      return value.map(
        (value): Rate => ({
          header: this.helpTypes.find((t) => t.value === value)!.description,
          rates: [value, value * 2, value * 3],
        })
      );
    })
  );

  updater = this.selectedHelpTypes$
    .pipe(tap(() => this.updateDetails()))
    .subscribe();

  ngAfterViewInit() {
    requestAnimationFrame(() => this.init$.next());
  }

  ngOnDestroy() {
    this.updater.unsubscribe();
    this.init$.unsubscribe();
  }

  updateDetails() {
    const newDetails = this.model.helpTypes
      .filter((helpType) =>
        this.model.details.every((detail) => detail.helpType.value !== helpType)
      )
      .map(
        (helptype): HelpDetails => {
          console.log(
            'create ',
            this.helpTypes.find((t) => t.value === helptype)
          );
          return {
            helpType: this.helpTypes.find((t) => t.value === helptype)!,
            days: [],
            notes: '',
            minimumRequiredHours: null,
            idealRequiredHours: null,
          };
        }
      );

    this.model.details = this.model.details
      .filter((detail) => this.model.helpTypes.includes(detail.helpType.value))
      .concat(newDetails);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormErrorsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  declarations: [WizardComponent, GeneralInfoComponent, DetailsComponent],
  exports: [WizardComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    {
      provide: VALIDATION_MESSAGES,
      useValue: {
        matDatepickerMin: (details: any) =>
          `Date can't be less than ${details.min}`,
      },
      multi: true,
    },
  ],
})
export class WizardModule {}
