import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you-modal',
  templateUrl: './thank-you-modal.component.html',
  styleUrls: ['./thank-you-modal.component.scss']
})
export class ThankYouModalComponent {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  

  close() {
    this.closeModal.emit(); 
  }
}
