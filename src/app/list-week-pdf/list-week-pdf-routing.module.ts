import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListWeekPdfPage } from './list-week-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ListWeekPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListWeekPdfPageRoutingModule {}
