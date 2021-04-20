import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { formViewProvider } from '../form-view-provider';
import { Model } from './model,';

@Component({
  selector: 'app-details',
  template: `
    <h5>Details</h5>

    <ng-template #noHelpTypes> No help types are selected </ng-template>
    <ng-container *ngIf="modelDetails.length; else noHelpTypes">
      <fieldset
        *ngFor="let details of modelDetails"
        [ngModelGroup]="details.helpType.value.toString()"
        class="mb-4"
      >
        <legend>
          <h6>{{ details.helpType.description }}</h6>
        </legend>
        <mat-form-field formField>
          <mat-label>Required hours of help</mat-label>
          <input
            type="number"
            matInput
            name="minimumRequiredHours"
            [(ngModel)]="details.minimumRequiredHours"
            required
          />
        </mat-form-field>

        <mat-form-field formField>
          <mat-label>Required hours of help</mat-label>
          <input
            type="number"
            matInput
            name="idealRequiredHours"
            [(ngModel)]="details.idealRequiredHours"
            [min]="details.minimumRequiredHours"
            required
          />
        </mat-form-field>

        <mat-selection-list
          [(ngModel)]="details.days"
          name="days"
          class="flex"
          required
          style="display: flex;"
        >
          <mat-list-option
            *ngFor="let day of days"
            [value]="day.value"
            checkboxPosition="before"
          >
            {{ day.description }}
          </mat-list-option>
        </mat-selection-list>

        <mat-form-field formField>
          <mat-label>Notes</mat-label>
          <textarea
            matInput
            name="notes"
            [(ngModel)]="details.notes"
          ></textarea>
        </mat-form-field>
      </fieldset>
    </ng-container>
  `,
  viewProviders: [formViewProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  @Input() modelDetails!: Model['details'];

  days = [
    {
      description: 'Monday',
      value: 1,
    },
    {
      description: 'Tuesday',
      value: 2,
    },
    {
      description: 'Wednesday',
      value: 3,
    },
    {
      description: 'Thursday',
      value: 4,
    },
    {
      description: 'Friday',
      value: 5,
    },
    {
      description: 'Saturday',
      value: 6,
    },
    {
      description: 'Sunday',
      value: 0,
    },
  ];
}
