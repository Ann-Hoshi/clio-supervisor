import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentWeeklyReportPageRoutingModule } from './student-weekly-report-routing.module';

import { StudentWeeklyReportPage } from './student-weekly-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentWeeklyReportPageRoutingModule
  ],
  declarations: [StudentWeeklyReportPage]
})
export class StudentWeeklyReportPageModule {}
