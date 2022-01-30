import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradingListPageRoutingModule } from './grading-list-routing.module';

import { GradingListPage } from './grading-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradingListPageRoutingModule
  ],
  declarations: [GradingListPage]
})
export class GradingListPageModule {}
