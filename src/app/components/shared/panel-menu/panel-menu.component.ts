import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss']
})
export class PanelMenuComponent implements OnInit {

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
        routerLink: ['/resources']
      }
    ];
  }
}