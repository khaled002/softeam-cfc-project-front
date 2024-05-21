import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { SubmissionStateService } from '../services/submission-state.service';
import { CollaborateurService } from '../services/collaborateur.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {


  constructor(private router: Router, private submissionStateService: SubmissionStateService, private collaborateurService: CollaborateurService, private messageService: MessageService) { }

  surveyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.emailDomainValidator('softeam.fr')]),
  });


  emailDomainValidator(domainName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (email && !email.endsWith(`@${domainName}`)) {
        // Si l'email ne se termine pas par le domaine spécifié, retourne un objet d'erreur
        return { emailDomain: true };
      }
      // Si l'email est valide ou le champ est vide, retourne null (pas d'erreur)
      return null;
    };

  }

  onSubmit() {
    if (this.surveyForm.valid) {
      const emailValue: string = this.surveyForm.get('email')?.value?.toString() || '';;

      this.collaborateurService.getCollaborateurByEmail('' + emailValue).subscribe(
        data => {
          if (data === null) {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Adresse email non trouvée! ' });
            return;
          }
          this.submissionStateService.setFormSubmitted(true); // Marque le formulaire comme soumis
          this.router.navigate(['softeam/carbon-foot-print/form']); // Redirige vers la page protégée
          localStorage.setItem('email',emailValue);
        }
      )
    }
    else {
      this.surveyForm.get('email')?.markAsTouched();
    }
  }

}
