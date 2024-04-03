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
  aaa = "aaa"
  TransportationOptions = MEANS_TRANSPORTATION;
  locomotionForm: FormGroup;
  meansOfTransportaion = [
    { label: "", value: "" },
    { label: "Bus", value: MEANS_TRANSPORTATION.BUS },
    { label: "métro", value: MEANS_TRANSPORTATION.METRO },
    { label: "Vélo", value: MEANS_TRANSPORTATION.BIKE },
    { label: "Voiture", value: MEANS_TRANSPORTATION.CAR },
    { label: "deux-roues motorisé", value: MEANS_TRANSPORTATION.MOTORIZED },
    { label: "trottinette", value: MEANS_TRANSPORTATION.SCOOTER },
  ];
  carTemplate = [
    { label: "", value: "" },
    { label: "utilitaire", value: "utilitaire" },
    { label: "citadine", value: "citadine" },
    { label: "berline", value: "berline" },
    { label: "SUV", value: "SUV" }
  ]
  vehicleTypes = [
    { label: "", value: "" },
    { label: "Électrique", value: "Électrique" },
    { label: "Diesel", value: "Diesel" },
    { label: "GPL", value: "GPL" },
    { label: "Essence", value: "Essence" },
    { label: "Hybride", value: "Hybride" }
  ]


  twoWheelerTypes = [
    { label: "", value: "" },
    { label: "Scooter thermique (diesel/essence)", value: "Scooter thermique (diesel/essence)" },
    { label: "Scooter électrique", value: "Scooter électrique" },
    { label: "Moto de moins de 250 cm3", value: "Moto de moins de 250 cm3" },
    { label: "Moto de plus de 250 cm3", value: "Moto de plus de 250 cm3" },
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
    if (locomotion === 'Voiture') {
      this.locomotionForm.get('vehicleType')?.setValidators(Validators.required);
      this.locomotionForm.get('carpooling')?.setValidators(Validators.required);
    } else if (locomotion === 'Deux-roues motorisé') {
      this.locomotionForm.get('twoWheelerType')?.setValidators(Validators.required);
    } 
  }
    
  goToMaps() {
    window.open('https://www.google.com/maps', '_blank');
  }

  get locomotionControl() { return this.locomotionForm.get('locomotion')?.value; }
  get vae() { return this.locomotionForm.get('vae')?.value; }
}
