import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmissionStateService{

  private formSubmitted = false;

  setFormSubmitted(submitted: boolean): void {
    this.formSubmitted = submitted;
  }

  getFormSubmitted(): boolean {
    return this.formSubmitted;
  }
}
