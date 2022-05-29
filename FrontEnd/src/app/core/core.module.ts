import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { WorkComponent } from './work/work.component';
import { SharedModule } from '../libs/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoreComponent,
    WorkComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CoreModule { }
