import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Planet } from 'src/app/interfaces/planet';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss']
})
export class PanelMenuComponent implements OnInit {

  @Input() planet: Planet = JSON.parse(localStorage.getItem('planet')!);

  items!: MenuItem[];

  constructor() { }


  ngOnInit(): void {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-pw pi-home',
        routerLink: ['/main']
      },
      {
        label: 'Recursos',
        icon: 'pi pi-pw pi-box',
        routerLink: ['/resources/' + this.planet.id]
      },
      {
        label: '',
        icon: '',
      },
      {
        label: 'Cuenta',
        icon: 'pi pi-pw pi-user',
        routerLink: ['/account']
      }
    ];
  }
}