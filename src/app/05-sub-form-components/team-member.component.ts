import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgModelGroup } from '@angular/forms';
import { formViewProvider } from '../form-view-provider';

@Component({
  selector: 'app-team-members',
  viewProviders: [formViewProvider],
  template: `
    <fieldset
      *ngFor="let member of members; let memberIndex = index"
      class="mt-4 mb-0"
      [ngModelGroup]="member.id"
      #memberForm="ngModelGroup"
    >
      <legend>Team member {{ memberIndex + 1 }}</legend>

      <label [for]="'first-name-' + member.id">First name</label>
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
        (click)="moveUp.emit(memberIndex)"
        [hidden]="memberIndex === 0"
        class="mt-1 float-left focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
      >
        Up
      </button>
      <button
        type="button"
        (click)="moveDown.emit(memberIndex)"
        [hidden]="memberIndex === members.length - 1"
        class="mt-1 float-left focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
      >
        Down
      </button>

      <button
        type="button"
        (click)="remove.emit(member.id)"
        [hidden]="members.length === 1"
        class="mt-1 float-right focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
      >
        Remove member
      </button>

      <button
        type="button"
        class="mt-1 mr-2 float-right focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50 bg-transparent"
        (click)="memberResetClicked(memberForm)"
      >
        Reset
      </button>
    </fieldset>

    <div class="my-8 flex flex-row-reverse">
      <button>Submit Form</button>
      <button
        type="button"
        (click)="add.emit()"
        class="mr-2"
        [hidden]="members.length > 5"
      >
        Add team member
      </button>
    </div>
  `,
})
export class TeamMemberComponent {
  @Input() members: TeamMember[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<string>();
  @Output() moveUp = new EventEmitter<number>();
  @Output() moveDown = new EventEmitter<number>();

  goodieBagChanged(member: TeamMember) {
    if (!member.goodieBag) {
      member.tshirtSize = '';
    }
  }

  memberResetClicked(memberForm: NgModelGroup) {
    memberForm.reset();
  }

  get hasNoTeamCaptain() {
    return this.members.every((m) => !m.captain);
  }
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  captain: boolean;
  goodieBag: boolean;
  tshirtSize: string;
}
