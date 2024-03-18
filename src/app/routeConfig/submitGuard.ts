// submit-guard.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SubmissionStateService } from '../services/submission-state.service';


export const SubmitGuard = () => {
  const submissionStateService = inject(SubmissionStateService);
  const router = inject(Router);
    if (submissionStateService.getFormSubmitted()) {
      return true; // Permet l'accès si le formulaire a été soumis
    } else {
      router.navigate(['login']); 
      
      return false;
    }
}
