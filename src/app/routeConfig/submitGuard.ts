// submit-guard.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SubmissionStateService } from '../services/submission-state.service';

@Injectable({
  providedIn: 'root',
})
export class SubmitGuard implements CanActivate {
  constructor(private submissionStateService: SubmissionStateService, private router: Router) {}

  canActivate(): boolean {
    if (this.submissionStateService.getFormSubmitted()) {
      return true; // Permet l'accès si le formulaire a été soumis
    } else {
      this.router.navigate(['softeam/carbon-foot-print/home']); 
      return false;
    }
  }
}
