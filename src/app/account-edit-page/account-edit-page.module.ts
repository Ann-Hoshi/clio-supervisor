import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountEditPagePageRoutingModule } from './account-edit-page-routing.module';

import { AccountEditPagePage } from './account-edit-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountEditPagePageRoutingModule
  ],
  declarations: [AccountEditPagePage]
})
export class AccountEditPagePageModule {}
