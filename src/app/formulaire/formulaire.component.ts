import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { CollaborateurService } from '../services/collaborateur.service';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { HeatingType } from '../core/enums/HeatingType';

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
  meansOfTransportaion = [
    {label: "Voiture", value: "car"},
    {label: "Transports en commun", value: "public-transport"},
    {label: "Vélo", value: "bike"},
    {label: "Marche", value: "walk"},
  ];
  quantity = [
    {label: "0", value: "0"},
    {label: "1", value: "1"},
    {label: "2", value: "2"},
    {label: "3", value: "3"},
  ]

  constructor(private router: Router,private collaborateurService: CollaborateurService, private clientService: ClientService ) {
   
  }
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
    presenceDays: new FormControl('', [Validators.required,Validators.min(0), Validators.max(7)]),
    transportationMode: new FormControl('', Validators.required), 
    distanceKm: new FormControl('', [Validators.required,Validators.min(0), Validators.max(1000)]), // Exemple : max 1000km pour la distance
    housingType: new FormControl('', Validators.required), 
    laptop: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)]), // Exemple : 0 à 5 laptops
    desktopComputer: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)]),
    monitor: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)]),
    phone: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)]),
    heatingType: new FormControl('',Validators.required)
  });

  onSubmit() {
    if (this.carbonFootPrintForm.valid) {
      this.collaborateurService.calculateCarbonFoorPrint(this.carbonFootPrintForm.value).subscribe({
         next: (data) => {
           
         },
         error : (error) => {
          console.log(error);
         }

      });

      
      this.showThankYouModal = true; // Affiche le modal de remerciement
      // Redirige après un délai
      setTimeout(() => {
        this.router.navigate(['softeam/carbon-foot-print/home']);
    
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(option => option.name.toLowerCase().includes(filterValue));
  }

get clientControl() { return this.carbonFootPrintForm.get('client');}
get presenceControl() {return this.carbonFootPrintForm.get('presenceDays')}
get transportationModeControl() {return this.carbonFootPrintForm.get('transportationMode')}
get distanceControl() {return this.carbonFootPrintForm.get('distanceKm')}
get housingTypeControl(){return this.carbonFootPrintForm.get('housingType')}
get lapTopControl(){return this.carbonFootPrintForm.get('laptop')}
get monitorControl(){return this.carbonFootPrintForm.get('monitor')}
get desktopControl(){return this.carbonFootPrintForm.get('desktopComputer')}
get phoneControl(){return this.carbonFootPrintForm.get('phone')}
get heatingTypeControl(){return this.carbonFootPrintForm.get('heatingType')}

}
