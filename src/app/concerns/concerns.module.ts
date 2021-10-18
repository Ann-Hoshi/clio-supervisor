import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcernsPageRoutingModule } from './concerns-routing.module';

import { ConcernsPage } from './concerns.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcernsPageRoutingModule
  ],
  declarations: [ConcernsPage]
})
export class ConcernsPageModule {}
