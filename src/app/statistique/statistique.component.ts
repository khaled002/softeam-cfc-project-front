import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../domain/Collaborateur';
import { CollaborateurService } from '../services/collaborateur.service';

@Component({
    selector: 'app-statistique',
    templateUrl: './statistique.component.html',
    styleUrls: ['./statistique.component.scss'],
})
export class StatistiqueComponent implements OnInit {

    data: any;
    collaborateurs: Collaborateur[] = [];
    options: any;
    collabStatsDidNotAnswer: any;
    collabStatsAnswered: any;

    constructor(private collaborateurService: CollaborateurService) { }

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
        this.collaborateurService.getStatiqueCollaborateurs().subscribe(
            (data: any) => {
                this.data = {
                    labels: ['Collaborateurs qui ont répondu', "Collaborateurs qui n'ont pas répondu"],
                    datasets: [
                        {
                            data: [data.nbCollaborateursWhoAnswered, data.nbCollaborateursWhoDidNotanswer],
                            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500')],
                            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--green-400')]
                        }
                    ]
                };
                this.collabStatsAnswered = data.collabStatsAnswered;
                this.collabStatsDidNotAnswer = data.collabStatsDidNotAnswer
            }
        )
    }

}
