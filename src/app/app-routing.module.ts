import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SubmitGuard } from './routeConfig/submitGuard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'softeam/carbon-foot-print',
    children: [
      { path: 'form', component: FormulaireComponent, canActivate: [SubmitGuard] },
      {
        path: '',
        component: LayoutComponent,
        children: [
          { path: 'g8txk23fkijrg69rty28/dashbord', component: DashboardComponent }
        ]
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
