import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubmitGuard } from './routeConfig/submitGuard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

const routes: Routes = [
  { path : 'softeam/carbon-foot-print/form' , component: FormulaireComponent, canActivate: [SubmitGuard]},
  { path : 'softeam/carbon-foot-print/home' , component: HomeComponent },
  { path: '', redirectTo: '/softeam/carbon-foot-print/home', pathMatch: 'full' },
  { path : 'softeam/carbon-foot-print/g8txk23fkijrg69rty28/dashbord', component : DashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
