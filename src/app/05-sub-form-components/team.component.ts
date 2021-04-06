import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FormErrorsModule } from '../form-errors';
import { TeamMemberComponent } from './team-member.component';
import { TypeaheadModule } from './typeahead.module';

@Component({
  selector: 'app-team',
  template: `
    <form #form="ngForm" (submit)="submit()">
      <label for="team-name">Team name</label>
      <input
        type="text"
        id="team-name"
        name="team-name"
        [(ngModel)]="model.name"
        required
      />

      <label for="team-level">Team level</label>
      <input
        type="text"
        id="team-level"
        name="team-level"
        [(ngModel)]="model.level"
        required
        [typeaheadItems]="levels"
      />

      <app-team-members
        [members]="model.members"
        (add)="addTeamMember()"
        (remove)="removeTeamMember($event)"
        (moveUp)="moveTeamMemberUp($event)"
        (moveDown)="moveTeamMemberDown($event)"
      >
      </app-team-members>

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
export class TeamComponent {
  @Output() submitEmitter = new EventEmitter<any>();

  @ViewChild(NgForm) form!: NgForm;

  model: Team = {
    name: '',
    level: '',
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

  levels = [
    {
      value: 1,
      label: 'Amateur',
    },
    {
      value: 2,
      label: 'Professional',
    },
    {
      value: 3,
      label: 'Under 18',
    },
    {
      value: 4,
      label: 'Under 15',
    },
  ];

  addTeamMember() {
    this.model.members.push({
      id: Date.now().toString(),
      lastName: '',
      firstName: '',
      captain: false,
      goodieBag: true,
      tshirtSize: '',
    });
  }

  removeTeamMember(memberId: string) {
    this.model.members = this.model.members.filter((m) => m.id !== memberId);
  }

  moveTeamMemberUp(memberIndex: number) {
    [this.model.members[memberIndex], this.model.members[memberIndex - 1]] = [
      this.model.members[memberIndex - 1],
      this.model.members[memberIndex],
    ];
  }

  moveTeamMemberDown(memberIndex: number) {
    [this.model.members[memberIndex], this.model.members[memberIndex + 1]] = [
      this.model.members[memberIndex + 1],
      this.model.members[memberIndex],
    ];
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
  imports: [CommonModule, FormsModule, FormErrorsModule, TypeaheadModule],
  declarations: [TeamComponent, TeamMemberComponent],
  exports: [TeamComponent],
})
export class SubFormComponentsModule {}

export interface Team {
  name: string;
  level: string;
  members: {
    id: string;
    firstName: string;
    lastName: string;
    captain: boolean;
    goodieBag: boolean;
    tshirtSize: string;
  }[];
}
