import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOfStudentsPageRoutingModule } from './list-of-students-routing.module';

import { ListOfStudentsPage } from './list-of-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOfStudentsPageRoutingModule
  ],
  declarations: [ListOfStudentsPage]
})
export class ListOfStudentsPageModule {}
