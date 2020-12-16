import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FuncionamientoComponent } from './funcionamiento/funcionamiento.component';

@NgModule({
  declarations: [

    FuncionamientoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [FuncionamientoComponent]
})
export class AppModule { } 
