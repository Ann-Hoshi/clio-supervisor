import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOfStudentsWeeklyReportPageRoutingModule } from './list-of-students-weekly-report-routing.module';

import { ListOfStudentsWeeklyReportPage } from './list-of-students-weekly-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOfStudentsWeeklyReportPageRoutingModule
  ],
  declarations: [ListOfStudentsWeeklyReportPage]
})
export class ListOfStudentsWeeklyReportPageModule {}
