
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Collaborateur } from '../domain/Collaborateur';
import { CollaborateurAdminService } from '../services/collaborateur-admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class DashboardComponent implements OnInit{

    collaborateurDialog: boolean = false;

    Delete : string = "";

    collaborateurs: Collaborateur[] = [];

    collaborateur: Collaborateur = {} as Collaborateur;

    selectedCollabs: Collaborateur[] = [];

    submitted: boolean = false;

    disableEmail: boolean = false;

    constructor(private collaborateurAdminService: CollaborateurAdminService, private messageService: MessageService, private confirmationService: ConfirmationService) {
       
    }

    ngOnInit(): void {
   
    this.collaborateurAdminService.getAllCollaborateurs().subscribe({
       next:  (data) => {
        this.collaborateurs = data
       },
       error: (error) => {
        console.error('Il y a eu une erreur lors de la récupération des collaborateurs', error);
       }
    });
  }
 

  openNew() {
    this.collaborateur = {};
    this.submitted = false;
    this.collaborateurDialog = true;
}

deleteSelectedCollaborateurs() {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer les collaborateurs sélectionnés ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.collaborateurAdminService.deleteCollaborateurs(this.selectedCollabs?.map(c => c.id)).subscribe({
                next: (data) => {


                        let remainingCollab = this.filtrerSelectedCollabsParIds(this.selectedCollabs,data);
                        if(remainingCollab?.length === 0 )
                        {
                            this.collaborateurs = this.collaborateurs.filter((val) => !this.selectedCollabs.includes(val));
                            this.selectedCollabs = [];
                            this.messageService.add({ severity: 'success', summary: 'Succès ', detail: 'Collaborateurs Supprimés', life: 3000 });

                        }else
                        {
                            this.selectedCollabs = remainingCollab?? [] ; 
                            this.collaborateurs = this.collaborateurs.filter((val) => !this.selectedCollabs.includes(val));
                            this.messageService.add({ severity: 'warn', summary: 'Attention ! ', detail: 'Il y a encore des collaborateurs non supprimés', life: 3000 });
                            
                        }

                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur !', detail: 'Une erreur est apparue côté serveur ! ', life: 3000 });
                    console.error('Une erreur est survenue', error);
                }
            });

        }
    });
}

editCollaborateur(collab: Collaborateur) {
    this.collaborateur = { ...collab };
    this.collaborateurDialog = true;
    this.disableEmail = true;
}

deleteCollaborateur(collab: Collaborateur) {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer ' + collab.nom + '?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

            this.collaborateurAdminService.deleteCollaborateur(collab.id).subscribe({
                next: (data) => {
                    this.collaborateurs = this.collaborateurs.filter((val) => val.id !== collab.id);
                    this.collaborateur = {};
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Collaborateur Supprimé', life: 3000 });
                },
                error: (error) =>{
                    this.messageService.add({ severity: 'error', summary: 'Erreur !', detail: 'Une erreur est apparue côté serveur ! ', life: 3000 });
                    console.error('Une erreur est survenue', error);
                }
            });
        }
    });
}

hideDialog() {
    this.collaborateurDialog = false;
    this.submitted = false;
}

saveCollaborateur() {    

    this.submitted = true;
    
    if (this.ValidForm()) {
        if (this.collaborateur.id) {
            this.collaborateurAdminService.updateCollaborateur(this.collaborateur).subscribe({
                next: (data) => {
                    this.collaborateurs[this.findIndexById(this.collaborateur.id)] = data;
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Informations mis à jour', life: 3000 });
                    this.collaborateurs = [...this.collaborateurs];
                    this.collaborateurDialog = false;
                    this.collaborateur = {};
                    this.disableEmail = false;
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur !', detail: 'Une erreur est apparue côté serveur ! ', life: 3000 });
                    console.error('Une erreur est survenue', error);
                }
                
            });

        } else {

            this.collaborateurAdminService.addCollaborateur(this.collaborateur).subscribe({
                next: (data) => {
                    this.collaborateurs.push(this.collaborateur);
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Nouveau collaborateur ajouté', life: 3000 });
                    this.collaborateurs = [...this.collaborateurs];
                    this.collaborateurDialog = false;
                    this.collaborateur = {};
                },
                error: (error) => {
                    if(error.status == '409')
                    {
                        this.messageService.add({ severity: 'warn', summary: 'Attention !', detail: 'L\'email du collaborateur existe déjà ! ', life: 3000 });
                    }else
                    {
                        this.messageService.add({ severity: 'error', summary: 'Erreur !', detail: 'Une erreur est apparue côté serveur ! ', life: 3000 });
                    }
                    console.error('Une erreur est survenue', error);
                    
                }

            });
        }
    }
}

findIndexById(id?: string): number {
    let index = -1;
    for (let i = 0; i < this.collaborateurs.length; i++) {
        if (this.collaborateurs[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

filtrerSelectedCollabsParIds(selectedCollabs: Collaborateur[], ids: any[]): Collaborateur[]  {
    // Vérifier si la liste des IDs est vide
    if (ids.length === 0) {
        return [];
    }
    // Filtrer la liste de collaborateur pour ne garder que ceux dont l'ID est dans la liste des IDs
    let remainingCollab =  selectedCollabs.filter(c => ids.includes(c.id));
    return remainingCollab;
}

send() {
    if(this.selectedCollabs)
    {
        this.collaborateurAdminService.sendEmails(this.selectedCollabs?.map(c => c.id)).subscribe({
            next: (data) => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Emails envoyés ', life: 3000 });
                console.log(data);

            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur !', detail: 'Une erreur est apparue côté serveur ! ', life: 3000 });
                console.error('Une erreur est survenue', error);
            }
        });
    }
  }

  ValidForm(): boolean {
    // Vérifiez si tous les champs requis sont non nuls, non vides et que l'email correspond au format requis
    return !!(this.collaborateur?.nom?.trim() && 
              this.collaborateur?.prenom?.trim() && 
               
              this.validEmail() &&
              this.collaborateur?.uniteCommerciale?.trim());   
  }

   validEmail() : boolean {
    // Expression régulière pour valider l'email et le domaine
    const emailRegex: RegExp = /^[^\s@]+@softeam\.fr$/;
    return !!(this.collaborateur?.email?.trim() && emailRegex.test(this.collaborateur.email.trim()));
  }

}
