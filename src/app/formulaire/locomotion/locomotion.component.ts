import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
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
      locomotion: ['',Validators.required],
      distance: ['',[Validators.required,Validators.min(1), Validators.max(100)]],
      time: ['',[Validators.required,Validators.min(1), Validators.max(180)]],
      vehicleType: [''],
      cartemplate: [''],
      twoWheelerType: [''],
      carpooling: '',
      vae: ''
    });

    this.locomotionForm.valueChanges.subscribe(changes => {
      this.formChange.emit(changes)
    });
  }

  get locomotionControl()  { return this.locomotionForm.get('locomotion')?.value; }
  get vae()  { return this.locomotionForm.get('vae')?.value; }
  get _vae() { return this.locomotionForm.get('vae')! }
  get _distance() { return this.locomotionForm.get('distance') }
  get _time() { return this.locomotionForm.get('time')! }
  get _cartemplate(){ return this.locomotionForm.get('cartemplate')! }
  get _vehicleType() { return this.locomotionForm.get('vehicleType')! }
  get _twoWheelerType() { return this.locomotionForm.get('twoWheelerType')! }
  
}
