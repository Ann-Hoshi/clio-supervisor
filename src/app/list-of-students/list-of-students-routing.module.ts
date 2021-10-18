import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOfStudentsPage } from './list-of-students.page';

const routes: Routes = [
  {
    path: '',
    component: ListOfStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfStudentsPageRoutingModule {}
