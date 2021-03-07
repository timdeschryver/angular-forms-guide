import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputTypesComponent } from './01-input-types/input-types.component';

const routes: Routes = [
  {
    path: '01-input-types',
    component: InputTypesComponent,
  },
  {
    path: '**',
    redirectTo: '01-input-types',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
