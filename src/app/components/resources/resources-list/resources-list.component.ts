import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Planet } from 'src/app/interfaces/planet';
import { SpringService } from 'src/app/services/spring.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {

  @Input() currentPlanet: Planet = JSON.parse(localStorage.getItem('currentPlanet')!);

  display: boolean = false;
  structures: any[] = [];

  constructor(
    private springService: SpringService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.springService.getResourcesInPlanet(this.currentPlanet).subscribe((structuresDB) => {
      this.structures = structuresDB;
      if (this.structures.length === 0) { this.display = true }
    });

  }

  redirect(): void { this.router.navigate(['main']) }

}
