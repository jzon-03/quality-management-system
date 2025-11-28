import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentControlComponent } from './components/document-control/document-control.component';
import { NcrComponent } from './components/ncr/ncr.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { TrainingComponent } from './components/training/training.component';
import { CapaComponent } from './components/capa/capa.component';
import { MrbComponent } from './components/mrb/mrb.component';
import { FaiComponent } from './components/fai/fai.component';
import { IpiComponent } from './components/ipi/ipi.component';
import { FinalInspectionComponent } from './components/final-inspection/final-inspection.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'document-control', component: DocumentControlComponent },
  { path: 'ncr', component: NcrComponent },
  { path: 'procedures', component: ProceduresComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'capa', component: CapaComponent },
  { path: 'mrb', component: MrbComponent },
  { path: 'fai', component: FaiComponent },
  { path: 'ipi', component: IpiComponent },
  { path: 'final-inspection', component: FinalInspectionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
