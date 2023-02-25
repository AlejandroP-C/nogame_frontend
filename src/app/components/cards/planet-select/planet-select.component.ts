import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { SpringService } from 'src/app/services/spring.service';

@Component({
  selector: 'app-planet-select',
  templateUrl: './planet-select.component.html',
  styleUrls: ['./planet-select.component.scss']
})
export class PlanetSelectComponent implements OnInit {

  @Input() player: Player = JSON.parse(localStorage.getItem('player')!);

  planets: any[] = [];

  constructor(private springService: SpringService, private router: Router) {}

  ngOnInit(): void {

    this.springService.getPlanetsOfUser(this.player).subscribe((response) => {
      this.planets = response
    });

  }

  change(planet: string): void {
    const changePlanet = this.planets.find(obj => obj.id === planet);
    localStorage.setItem('currentPlanet', JSON.stringify(changePlanet));
    this.router.navigate(['main']);
  }

}
