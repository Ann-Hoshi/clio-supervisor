import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeekReportsPage } from './week-reports.page';

const routes: Routes = [
  {
    path: '',
    component: WeekReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeekReportsPageRoutingModule {}
