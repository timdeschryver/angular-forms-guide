import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputTypesComponent } from './01-input-types/input-types.component';
import { ValidationComponent } from './02-validation/validation.component';
import { ErrorsComponent } from './03-errors/errors.component';
import {
  DynamicComponentFlat,
  DynamicComponentGrouped,
} from './04-dynamic/dynamic.component';

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
    path: '04-dynamic',
    component: DynamicComponentGrouped,
    // component: DynamicComponentFlat,
  },
  {
    path: '**',
    redirectTo: '04-dynamic',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
