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
import { FaiComponent } from './components/fai/fai.component';
import { IpiComponent } from './components/ipi/ipi.component';
import { IpiHeaderComponent } from './components/ipi/ipi-header/ipi-header.component';
import { IpiFormComponent } from './components/ipi/ipi-form/ipi-form.component';
import { IpiBasicInfoComponent } from './components/ipi/ipi-basic-info/ipi-basic-info.component';
import { IpiQuantitiesComponent } from './components/ipi/ipi-quantities/ipi-quantities.component';
import { IpiDefectsComponent } from './components/ipi/ipi-defects/ipi-defects.component';
import { IpiMeasurementsComponent } from './components/ipi/ipi-measurements/ipi-measurements.component';
import { IpiVisualChecksComponent } from './components/ipi/ipi-visual-checks/ipi-visual-checks.component';
import { IpiProcessParametersComponent } from './components/ipi/ipi-process-parameters/ipi-process-parameters.component';
import { IpiSummaryComponent } from './components/ipi/ipi-summary/ipi-summary.component';
import { IpiTableComponent } from './components/ipi/ipi-table/ipi-table.component';

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
    MrbComponent,
    FaiComponent,
    IpiComponent,
    IpiHeaderComponent,
    IpiFormComponent,
    IpiBasicInfoComponent,
    IpiQuantitiesComponent,
    IpiDefectsComponent,
    IpiMeasurementsComponent,
    IpiVisualChecksComponent,
    IpiProcessParametersComponent,
    IpiSummaryComponent,
    IpiTableComponent
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
