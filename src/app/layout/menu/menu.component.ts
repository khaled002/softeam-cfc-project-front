import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
      this.model = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/softeam/carbon-foot-print/g8txk23fkijrg69rty28/dashbord'] },
                // { label: 'Formulaire', icon: 'pi pi-fw pi-id-card', routerLink: ['/softeam/carbon-foot-print/form'] }
            ]
        },
        // {
        //     label: 'UI Components',
        //     items: [
        //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
        //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
        //        
        //     ]
        // }
      ];
    }
  }
