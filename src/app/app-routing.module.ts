import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudComponent } from './crud/crud.component';
import { AuthComponent } from './auth/auth.component';
import { CrudFormComponent } from './crud-form/crud-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'crud',
    component: CrudComponent

  },
  {
    path: 'formulario',
    component: CrudFormComponent

  },
  {
    path: 'actualizar/:id',
    component: CrudFormComponent,
    

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
