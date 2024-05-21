import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MEANS_TRANSPORTATION } from '../../core/enums/Transportation';

@Component({
  selector: 'locomotion-form',
  templateUrl: './locomotion.component.html',
  styleUrl: './locomotion.component.scss'
})
export class LocomotionComponent {

  @Output() formChange = new EventEmitter<any>();
  TransportationOptions = MEANS_TRANSPORTATION;
  locomotionForm: FormGroup;
  meansOfTransportaion = [
    { label: "", value: "" },
    { label: "Bus", value: MEANS_TRANSPORTATION.BUS },
    { label: "Métro", value: MEANS_TRANSPORTATION.METRO },
    { label: "Vélo", value: MEANS_TRANSPORTATION.BIKE },
    { label: "Voiture", value: MEANS_TRANSPORTATION.CAR },
    { label: "Moto", value: MEANS_TRANSPORTATION.MOTORIZED },
    { label: "Trottinette", value: MEANS_TRANSPORTATION.SCOOTER },
  ];
  carTemplate = [
    { label: "", value: "" },
    { label: "Utilitaire", value: "Utilitaire" },
    { label: "Citadine", value: "Citadine" },
    { label: "Berline", value: "Berline" },
    { label: "SUV", value: "SUV" }
  ]
  vehicleTypes = [
    { label: "", value: "" },
    { label: "Électrique", value: "Electrique" },
    { label: "Diesel", value: "Diesel" },
    { label: "GPL", value: "GPL" },
    { label: "Essence", value: "Essence" },
    { label: "Hybride", value: "Hybride" }
  ]


  twoWheelerTypes = [
    { label: "", value: "" },
    { label: "Scooter thermique (diesel/essence)", value: "ScooterThermique" },
    { label: "Scooter électrique", value: "ScooterElectrique" },
    { label: "Moto de moins de 250 cm3", value: "Moins250cm3" },
    { label: "Moto de plus de 250 cm3", value: "Plus250cm3" },
  ];

  constructor(private fb: FormBuilder) {
    this.locomotionForm = this.fb.group({
      locomotion: ['', Validators.required],
      distance: ['', Validators.required],
      time: ['', Validators.required],
      vehicleType: '',
      twoWheelerType: '',
      carpooling: '',
      vae: '',
      cartemplate: ''
    });

    this.locomotionForm.valueChanges.subscribe(changes => {
      this.formChange.emit(changes)
    });
  }

  onLocomotionChange() {

      const locomotion = this.locomotionForm.get('locomotion')?.value;
      const vehicleTypeControl = this.locomotionForm.get('vehicleType');
      const carpoolingControl = this.locomotionForm.get('carpooling');
      const twoWheelerControl = this.locomotionForm.get('twoWheelerType');
    
      // Reset validators
      vehicleTypeControl?.clearValidators();
      carpoolingControl?.clearValidators();
      twoWheelerControl?.clearValidators();
    
      if (locomotion === MEANS_TRANSPORTATION.CAR) {
        vehicleTypeControl?.setValidators(Validators.required);
        carpoolingControl?.setValidators(Validators.required);
      } else if (locomotion === MEANS_TRANSPORTATION.MOTORIZED) {
        twoWheelerControl?.setValidators(Validators.required);
      }
    
      // Update value and validity
      vehicleTypeControl?.updateValueAndValidity();
      carpoolingControl?.updateValueAndValidity();
      twoWheelerControl?.updateValueAndValidity();    
  }
    

  get locomotionControl() { return this.locomotionForm.get('locomotion')?.value; }
  get vae() { return this.locomotionForm.get('vae')?.value; }
}
