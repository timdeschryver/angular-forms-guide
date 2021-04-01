import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { ValidatorModule } from '../validators';
import { FormErrorsModule } from '../form-errors';

@Component({
  selector: 'app-dynamic',
  template: `
    <form #form="ngForm" (submit)="submit()">
      <h1>Dynamic Nested</h1>

      <label for="team-name">Team name</label>
      <input
        type="text"
        id="team-name"
        name="team-name"
        [(ngModel)]="model.name"
        required
      />

      <!-- technically this is not needed, but it's added here to showcase the reset -->
      <ng-container ngModelGroup="members">
        <!-- iterate over all members of the model -->
        <fieldset
          *ngFor="let member of model.members; let memberIndex = index"
          class="mt-4 mb-0"
          [ngModelGroup]="member.id"
        >
          <legend>Team member {{ memberIndex + 1 }}</legend>

          <label [for]="'first-name-' + member.id">First name</label>
          <!-- input elements have a unique id but
               the name is the same because it belongs to another group -->
          <input
            type="text"
            [id]="'first-name-' + member.id"
            name="first-name"
            [(ngModel)]="member.firstName"
            required
          />

          <label [for]="'last-name-' + member.id">Last name</label>
          <input
            type="text"
            [id]="'last-name-' + member.id"
            name="last-name"
            [(ngModel)]="member.lastName"
            required
          />

          <div class="checkbox-container" formField>
            <input
              type="checkbox"
              [id]="'captain' + member.id"
              name="captain"
              [(ngModel)]="member.captain"
              [required]="hasNoTeamCaptain"
            />
            <label [for]="'captain' + member.id">Team captain</label>
          </div>

          <div class="checkbox-container" formField>
            <input
              type="checkbox"
              [id]="'goodie-bag' + member.id"
              name="goodie-bag"
              [(ngModel)]="member.goodieBag"
              (change)="goodieBagChanged(member)"
            />
            <label [for]="'goodie-bag' + member.id">Goodie bag</label>
          </div>

          <div *ngIf="member.goodieBag">
            <label [for]="'tshirt-size' + member.id">T-shirt size</label>
            <select
              [id]="'tshirt-size' + member.id"
              name="tshirt-size"
              [(ngModel)]="member.tshirtSize"
              required
            >
              <option value=""></option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XLL">XXL</option>
            </select>
          </div>

          <button
            type="button"
            (click)="upClicked(memberIndex)"
            [hidden]="memberIndex === 0"
            class="mt-1 float-left focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
          >
            Up
          </button>
          <button
            type="button"
            (click)="downClicked(memberIndex)"
            [hidden]="memberIndex === model.members.length - 1"
            class="mt-1 float-left focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
          >
            Down
          </button>

          <button
            type="button"
            (click)="removeClicked(member.id)"
            [hidden]="model.members.length === 1"
            class="mt-1 float-right focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
          >
            Remove member
          </button>

          <button
            type="button"
            (click)="memberResetClicked(member.id)"
            class="mt-1 mr-2 float-right focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
          >
            Reset
          </button>
        </fieldset>
      </ng-container>

      <div class="my-8 flex flex-row-reverse">
        <button>Submit Form</button>
        <button
          type="button"
          (click)="addClicked()"
          class="mr-2"
          [hidden]="model.members.length > 5"
        >
          Add team member
        </button>
        <button type="button" (click)="teamResetClicked()" class="mr-2">
          Reset Team
        </button>
        <button type="button" (click)="formResetClicked()" class="mr-2">
          Reset Form
        </button>
      </div>

      <div class="flex space-x-4">
        <div class="flex-1">
          <h2>Form States</h2>
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
export class DynamicComponentGrouped {
  @Output() submitEmitter = new EventEmitter<any>();

  @ViewChild(NgForm) form!: NgForm;

  model: Team = {
    name: '',
    members: [
      {
        id: Date.now().toString(),
        firstName: 'Emily',
        lastName: 'Earnshaw',
        captain: true,
        goodieBag: true,
        tshirtSize: '',
      },
    ],
  };

  addClicked() {
    this.model.members.push({
      id: Date.now().toString(),
      lastName: '',
      firstName: '',
      captain: false,
      goodieBag: true,
      tshirtSize: '',
    });
  }

  removeClicked(id: string) {
    this.model.members = this.model.members.filter((m) => m.id !== id);
  }

  goodieBagChanged(member: Team['members'][0]) {
    if (!member.goodieBag) {
      member.tshirtSize = '';
    }
  }

  upClicked(memberIndex: number) {
    [this.model.members[memberIndex], this.model.members[memberIndex - 1]] = [
      this.model.members[memberIndex - 1],
      this.model.members[memberIndex],
    ];
  }

  downClicked(memberIndex: number) {
    [this.model.members[memberIndex], this.model.members[memberIndex + 1]] = [
      this.model.members[memberIndex + 1],
      this.model.members[memberIndex],
    ];
  }

  teamResetClicked() {
    this.teamMembersControl.reset();
  }

  memberResetClicked(id: string) {
    this.teamMembersControl.get(id)?.reset();
  }

  formResetClicked() {
    this.model = {
      name: '',
      members: [],
    };
  }

  get teamMembersControl() {
    return this.form.form.get('members') as FormGroup;
  }

  get hasNoTeamCaptain() {
    return this.model.members.every((m) => !m.captain);
  }

  submit() {
    if (this.form.valid) {
      this.submitEmitter.emit(this.model);
    } else {
      this.form.form.markAllAsTouched();
    }
  }
}

@Component({
  selector: 'app-dynamic',
  template: `
    <form #form="ngForm" (submit)="submit()">
      <h1>Dynamic Nested</h1>

      <label for="team-name">Team name</label>
      <input
        type="text"
        id="team-name"
        name="team-name"
        [(ngModel)]="model.name"
        required
      />

      <!-- iterate over all members of the model -->
      <fieldset
        *ngFor="let member of model.members; let memberIndex = index"
        class="mt-4 mb-0"
      >
        <legend>Team member {{ memberIndex + 1 }}</legend>

        <label [for]="'first-name-' + member.id">First name</label>
        <!-- input elements have a unique id and name -->
        <input
          type="text"
          [id]="'first-name-' + member.id"
          [name]="'first-name-' + member.id"
          [(ngModel)]="member.firstName"
          required
        />

        <label [for]="'last-name-' + member.id">Last name</label>
        <input
          type="text"
          [id]="'last-name-' + member.id"
          [name]="'last-name-' + member.id"
          [(ngModel)]="member.lastName"
          required
        />

        <div class="checkbox-container" formField>
          <input
            type="checkbox"
            [id]="'captain' + member.id"
            [name]="'captain' + member.id"
            [(ngModel)]="member.captain"
            [required]="hasNoTeamCaptain"
          />
          <label [for]="'captain' + member.id">Team captain</label>
        </div>

        <div class="checkbox-container" formField>
          <input
            type="checkbox"
            [id]="'goodie-bag' + member.id"
            [name]="'goodie-bag' + member.id"
            [(ngModel)]="member.goodieBag"
            (change)="goodieBagChanged(member)"
          />
          <label [for]="'goodie-bag' + member.id">Goodie bag</label>
        </div>

        <div *ngIf="member.goodieBag">
          <label [for]="'tshirt-size' + member.id">T-shirt size</label>
          <select
            [id]="'tshirt-size' + member.id"
            [name]="'tshirt-size' + member.id"
            [(ngModel)]="member.tshirtSize"
            required
          >
            <option value=""></option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XLL">XXL</option>
          </select>
        </div>

        <button
          type="button"
          (click)="upClicked(memberIndex)"
          [hidden]="memberIndex === 0"
          class="mt-1 float-left focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
        >
          Up
        </button>
        <button
          type="button"
          (click)="downClicked(memberIndex)"
          [hidden]="memberIndex === model.members.length - 1"
          class="mt-1 float-left focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
        >
          Down
        </button>

        <button
          type="button"
          (click)="removeClicked(member.id)"
          [hidden]="model.members.length === 1"
          class="mt-1 float-right"
        >
          Remove member
        </button>
      </fieldset>

      <div class="my-8 flex flex-row-reverse">
        <button>Submit Form</button>
        <button
          type="button"
          (click)="addClicked()"
          class="mr-2"
          [hidden]="model.members.length > 5"
        >
          Add team member
        </button>
      </div>

      <div class="flex space-x-4">
        <div class="flex-1">
          <h2>Form States</h2>
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
export class DynamicComponentFlat {
  @Output() submitEmitter = new EventEmitter<any>();

  @ViewChild(NgForm) form!: NgForm;

  model: Team = {
    name: '',
    members: [
      {
        id: Date.now().toString(),
        firstName: 'Emily',
        lastName: 'Earnshaw',
        captain: true,
        goodieBag: true,
        tshirtSize: '',
      },
    ],
  };

  addClicked() {
    this.model.members.push({
      id: Date.now().toString(),
      lastName: '',
      firstName: '',
      captain: false,
      goodieBag: true,
      tshirtSize: '',
    });
  }

  removeClicked(id: string) {
    this.model.members = this.model.members.filter((m) => m.id !== id);
  }

  goodieBagChanged(member: Team['members'][0]) {
    if (!member.goodieBag) {
      member.tshirtSize = '';
    }
  }

  upClicked(memberIndex: number) {
    [this.model.members[memberIndex], this.model.members[memberIndex - 1]] = [
      this.model.members[memberIndex - 1],
      this.model.members[memberIndex],
    ];
  }

  downClicked(memberIndex: number) {
    [this.model.members[memberIndex], this.model.members[memberIndex + 1]] = [
      this.model.members[memberIndex + 1],
      this.model.members[memberIndex],
    ];
  }

  get hasNoTeamCaptain() {
    return this.model.members.every((m) => !m.captain);
  }

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
  declarations: [DynamicComponentFlat, DynamicComponentGrouped],
  exports: [DynamicComponentFlat, DynamicComponentGrouped],
})
export class DynamicModule {}

export interface Team {
  name: string;
  members: {
    id: string;
    firstName: string;
    lastName: string;
    captain: boolean;
    goodieBag: boolean;
    tshirtSize: string;
  }[];
}
