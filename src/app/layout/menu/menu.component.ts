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
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/softeam/carbon-foot-print/dashbord'] },
          { label: 'statistique', icon: 'pi pi-fw pi-id-card', routerLink: ['/softeam/carbon-foot-print/statistique'] }
        ]
      },
    ];
  }
}
