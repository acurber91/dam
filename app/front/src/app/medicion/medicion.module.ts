import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MedicionPageRoutingModule } from './medicion-routing.module';
import { MedicionPage } from './medicion.page';
import { UnitPipe } from '../pipes/unit.pipe';
import { BackgroundColorDirective } from '../directives/color.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicionPageRoutingModule,
  ],
  declarations: [MedicionPage, UnitPipe, BackgroundColorDirective]
})
export class MedicionPageModule {}
