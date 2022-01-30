import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradingListPage } from './grading-list.page';

const routes: Routes = [
  {
    path: '',
    component: GradingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradingListPageRoutingModule {}
