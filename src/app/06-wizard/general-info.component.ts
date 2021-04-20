import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { formViewProvider } from '../form-view-provider';
import { HelpType, Model, Rate } from './model,';

@Component({
  selector: 'app-general-info',
  template: `
    <h5>Personal info</h5>
    <mat-form-field formField>
      <mat-label>First name</mat-label>
      <input
        matInput
        placeholder="First name"
        name="firstName"
        [(ngModel)]="model.firstName"
        required
      />
    </mat-form-field>
    <mat-form-field formField>
      <mat-label>Last name</mat-label>
      <input
        matInput
        placeholder="Last name"
        name="lastName"
        [(ngModel)]="model.lastName"
        required
      />
    </mat-form-field>

    <mat-form-field formField>
      <mat-label>Start date</mat-label>
      <input
        matInput
        [matDatepicker]="picker"
        [(ngModel)]="model.startDate"
        name="startDate"
        [min]="today"
        required
      />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    <h5>Help care</h5>
    <mat-selection-list [(ngModel)]="model.helpTypes" name="helpTypes" required>
      <mat-list-option
        *ngFor="let type of helpTypes"
        [value]="type.value"
        checkboxPosition="before"
      >
        {{ type.description }}
      </mat-list-option>
    </mat-selection-list>

    <h5 *ngIf="rates?.length">Rates</h5>
    <table
      *ngFor="let rateDetails of rates"
      class="w-full table-fixed mb-4 text-left"
    >
      <caption class="bg-purple-100 text-lg">
        {{
          rateDetails.header
        }}
      </caption>
      <thead>
        <tr>
          <th>Day</th>
          <th>Evening</th>
          <th>Nights and weekends</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td *ngFor="let rate of rateDetails.rates">{{ rate | currency }}</td>
        </tr>
      </tbody>
    </table>
  `,
  viewProviders: [formViewProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInfoComponent {
  @Input() model!: Model;
  @Input() helpTypes: HelpType[] = [];
  @Input() rates: Rate[] | null = [];

  today = new Date();
}
