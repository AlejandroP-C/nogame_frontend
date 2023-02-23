import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Planet } from 'src/app/interfaces/planet';
import { Player } from 'src/app/interfaces/player';
import { SpringService } from 'src/app/services/spring.service';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss']
})
export class PanelMenuComponent implements OnInit {

  @Input() currentPlanet: Planet = JSON.parse(localStorage.getItem('currentPlanet')!);
  @Input() player: Player = JSON.parse(localStorage.getItem("player")!);

  items!: MenuItem[];

  constructor(private springService: SpringService) { }


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
        routerLink: ['/resources/' + this.currentPlanet.id]
      },
      {
        label: '',
        icon: '',
      },
      {
        label: 'Explorar',
        icon: 'pi pi-pw pi-globe',
        command: () => { this.springService.exploreNewWorld(this.player).subscribe() },
        routerLink: ['/planet-select']
      },
      {
        label: 'Cuenta',
        icon: 'pi pi-pw pi-user',
        routerLink: ['/account']
      }
    ];
  }
}