import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeekReportsPageRoutingModule } from './week-reports-routing.module';

import { WeekReportsPage } from './week-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeekReportsPageRoutingModule
  ],
  declarations: [WeekReportsPage]
})
export class WeekReportsPageModule {}
