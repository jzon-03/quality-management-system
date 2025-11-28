import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { RootComponent } from './components/root/root.component';
import { MaterialModule } from './shared/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentControlComponent } from './components/document-control/document-control.component';
import { NcrComponent } from './components/ncr/ncr.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { TrainingComponent } from './components/training/training.component';
import { CapaComponent } from './components/capa/capa.component';
import { MrbComponent } from './components/mrb/mrb.component';

@NgModule({
  declarations: [
    App,
    RootComponent,
    DashboardComponent,
    DocumentControlComponent,
    NcrComponent,
    ProceduresComponent,
    TrainingComponent,
    CapaComponent,
    MrbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
