import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputTypesComponent } from './01-input-types/input-types.component';
import { ValidationComponent } from './02-validation/validation.component';
import { ErrorsComponent } from './03-errors/errors.component';

const routes: Routes = [
  {
    path: '01-input-types',
    component: InputTypesComponent,
  },
  {
    path: '02-validation',
    component: ValidationComponent,
  },
  {
    path: '03-errors',
    component: ErrorsComponent,
  },
  {
    path: '**',
    redirectTo: '03-errors',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
