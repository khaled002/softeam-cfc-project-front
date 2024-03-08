import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { SubmissionStateService } from '../services/submission-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

   
  constructor(private router: Router, private submissionStateService: SubmissionStateService) {}

  surveyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.emailDomainValidator('softeam.com')]),
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
    if(this.surveyForm.valid){
      console.log(this.surveyForm.get('email')?.value);
    this.submissionStateService.setFormSubmitted(true); // Marque le formulaire comme soumis
    this.router.navigate(['softeam/carbon-foot-print/form']); // Redirige vers la page protégée
    
    }
  }

}
