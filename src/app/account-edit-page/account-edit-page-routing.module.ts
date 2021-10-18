import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountEditPagePage } from './account-edit-page.page';

const routes: Routes = [
  {
    path: '',
    component: AccountEditPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountEditPagePageRoutingModule {}
