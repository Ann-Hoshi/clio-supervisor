import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentWeeklyReportPage } from './student-weekly-report.page';

const routes: Routes = [
  {
    path: '',
    component: StudentWeeklyReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentWeeklyReportPageRoutingModule {}
