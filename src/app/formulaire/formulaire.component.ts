import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { CollaborateurService } from '../services/collaborateur.service';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { HeatingType } from '../core/enums/HeatingType';
import { Locomotion } from '../domain/Locomotion';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent {

  showThankYouModal: boolean = false;
  clients : any[]= [];
  selectedCountry : any[] = [];
  filteredClients!: Observable<any[]>;
  heatingTypes = Object.values(HeatingType).map((o :string)=> ({label: o, value: o}));
  locomotionsFields: any[] = [{}];
  locomotions : Locomotion[] = [];
 footprintValue : any = {
  empreinteTotalParSemaine: 0,
  empreinteParJourDePresence:0
 };
  quantity = [
    {label: "0", value: "0"},
    {label: "1", value: "1"},
    {label: "2", value: "2"},
    {label: "3", value: "3"},
  ]

  visible: boolean = false;

  constructor(private router: Router,private collaborateurService: CollaborateurService, private clientService: ClientService ) {}

  ngOnInit(): void {
    this.clientService.getClientsList().subscribe({
      next: (data) => {
        this.clients = data.map((client :string)=> ({label: client, value: client}))
      }
    });

    if(this.clientControl)
    {
    this.filteredClients = this.clientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value?? ''))
    );
    }
  }

  carbonFootPrintForm = new FormGroup({
    client: new FormControl('',Validators.required),
    presenceDays: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)]),
    housingType: new FormControl('', Validators.required), 
    heatingType: new FormControl('',Validators.required),
    laptop: new FormControl(this.quantity[0], [Validators.required,Validators.min(0), Validators.max(5)]), // Exemple : this.quantity[0] à 5 laptops
    desktop: new FormControl(this.quantity[0], [Validators.required,Validators.min(0), Validators.max(5)]),
    monitor: new FormControl(this.quantity[0], [Validators.required,Validators.min(0), Validators.max(5)]),
    phone: new FormControl(this.quantity[0], [Validators.required,Validators.min(0), Validators.max(5)])
  });

  onSubmit() {

    this.collaborateurService.emitEvent();
    console.log(this.carbonFootPrintForm.valid)
    if (this.carbonFootPrintForm.valid) {
      let formValue = {...this.carbonFootPrintForm?.value, locomotions: this.locomotions}
   
      let adapted = adaptFormValue(formValue);
      //todo api calculateCarbonFoorPrint à modifier
      this.collaborateurService.calculateCarbonFoorPrint(adapted).subscribe({
         next: (data) => {
          this.footprintValue = data
          this.visible = true
           
         },
         error : (error) => {
          console.log(error);
         }
      });

      
      this.showThankYouModal = true; // Affiche le modal de remerciement
      // Redirige après un délai
      setTimeout(() => {
        this.router.navigate(['login']);
    
      }, 50000); // Ajustez le délai 
    } else {
      this.carbonFootPrintForm.markAllAsTouched();
    }
    
  }

  onModalClose() {
    this.showThankYouModal = false; // Cache le modal
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 30);
  }
  addNewLocomotionField() {
    this.locomotionsFields.push({})
  }

  removeLocomtionField(){
    this.locomotionsFields.pop();
  }

  updateLocomotionValue(event: any, index: number){
    this.locomotions[index] = event;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  showHeatingForm(){
    let presenceDays = this.carbonFootPrintForm.get('presenceDays')?.value;
    if(presenceDays !== null && presenceDays !== undefined){
      return presenceDays < 5
    }
    return false;
  }

get clientControl() { return this.carbonFootPrintForm.get('client');}
get presenceControl() {return this.carbonFootPrintForm.get('presenceDays')}
get housingTypeControl(){return this.carbonFootPrintForm.get('housingType')}
get heatingTypeControl(){return this.carbonFootPrintForm.get('heatingType')}
get lapTopControl(){return this.carbonFootPrintForm.get('laptop')}
get monitorControl(){return this.carbonFootPrintForm.get('monitor')}
get desktopControl(){return this.carbonFootPrintForm.get('desktop')}
get phoneControl(){return this.carbonFootPrintForm.get('phone')}

}


// Fonction d'adaptation pour transformer formValue
function adaptFormValue(formValue: any): any {
  const adaptedValue = { ...formValue };
  adaptedValue.email = localStorage.getItem("email")

  // Adaptation des clients:
  adaptedValue.client = adaptedValue.client.value;

  // Adaptation des propriétés spécifiques
  adaptedValue.housingType = adaptedValue.housingType.toLowerCase(); // Mettre en minuscules
  adaptedValue.heatingType = adaptedValue.heatingType.value; // Utiliser seulement la valeur 'label' pour heatingType

  // Adaptation des ordinateurs
  adaptedValue.laptop = adaptedValue.laptop.value;
  adaptedValue.desktop = adaptedValue.desktop.value;
  adaptedValue.monitor = adaptedValue.monitor.value;
  adaptedValue.phone = adaptedValue.phone.value;

  // Adaptation des locomotions
  adaptedValue.locomotions = adaptedValue.locomotions.map((loc : any) => ({
    modeTransport: loc.locomotion.value,
    distance: loc.distance,
    temps: loc.time,
    typeEnergie: loc.vehicleType ? loc.vehicleType.value : '',
    typeMoto: loc.twoWheelerType.value,
    covoiturage: Array.isArray(loc.carpooling) ? loc.carpooling[0] : loc.carpooling,
    vae: Array.isArray(loc.vae) ? loc.vae[0] : loc.vae,
    gabarit: loc.cartemplate ? loc.cartemplate.value : ''
  }));

  return adaptedValue;
}