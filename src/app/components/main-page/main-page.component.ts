import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Planet } from 'src/app/interfaces/planet';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @Input() currentPlanet: Planet = JSON.parse(localStorage.getItem('currentPlanet')!);

  constructor(private router: Router) { }

  ngOnInit(): void { }

  showPlanetList(): void { this.router.navigate(['planet-select']) }

}
