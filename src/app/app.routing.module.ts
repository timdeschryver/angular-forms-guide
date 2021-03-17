import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputTypesComponent } from './01-input-types/input-types.component';
import { ValidationComponent } from './02-validation/validation.component';

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
    path: '**',
    redirectTo: '02-validation',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
