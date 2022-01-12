import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListWeekPdfPageRoutingModule } from './list-week-pdf-routing.module';

import { ListWeekPdfPage } from './list-week-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListWeekPdfPageRoutingModule
  ],
  declarations: [ListWeekPdfPage]
})
export class ListWeekPdfPageModule {}
