import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollaborateurService } from '../services/collaborateur.service';
import { ClientService } from '../services/client.service';
import { HeatingType } from '../core/enums/HeatingType';


@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  showThankYouModal: boolean = false;

  clients : any[]= [];

  selectedCountry : any[] = [];
  filtredClients : any[] = [];

  heatingTypes = Object.values(HeatingType);

  constructor(private router: Router,private collaborateurService: CollaborateurService, private clientService: ClientService ) {}
  ngOnInit(): void {
    this.clientService.getClientsList().subscribe({
      next: (data) => {
        this.clients = data;
      }
    });
  }

  carbonFootPrintForm = new FormGroup({
    client: new FormControl('',Validators.required),
    presenceDays: new FormControl('', [Validators.required,Validators.min(0), Validators.max(7)]),
    transportationMode: new FormControl('', Validators.required), 
    distanceKm: new FormControl('', [Validators.required,Validators.min(0), Validators.max(1000)]), // Exemple : max 1000km pour la distance
    housingType: new FormControl('', Validators.required),
      homeEquipment: new FormGroup({
      laptop: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)]), // Exemple : 0 à 5 laptops
      desktopComputer: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)]),
      monitor: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)]),
      phone: new FormControl(0, [Validators.required,Validators.min(0), Validators.max(5)])
    }),
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


  filterClients(event: { query: any; }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.clients.length; i++) {
        let client = this.clients[i];
        if (client.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(client);
        }
    }

    this.filtredClients = filtered;
}

  
}
