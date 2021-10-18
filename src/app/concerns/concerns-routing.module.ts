import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcernsPage } from './concerns.page';

const routes: Routes = [
  {
    path: '',
    component: ConcernsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcernsPageRoutingModule {}
