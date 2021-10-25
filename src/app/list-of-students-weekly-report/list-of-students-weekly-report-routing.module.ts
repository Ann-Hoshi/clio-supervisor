import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOfStudentsWeeklyReportPage } from './list-of-students-weekly-report.page';

const routes: Routes = [
  {
    path: '',
    component: ListOfStudentsWeeklyReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfStudentsWeeklyReportPageRoutingModule {}
