import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentControlComponent } from './components/document-control/document-control.component';
import { NcrComponent } from './components/ncr/ncr.component';
import { ProceduresComponent } from './components/procedures/procedures.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'document-control', component: DocumentControlComponent },
  { path: 'ncr', component: NcrComponent },
  { path: 'procedures', component: ProceduresComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
