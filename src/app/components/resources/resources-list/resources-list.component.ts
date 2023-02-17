import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {

  structures: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(params => {
      this.supabaseService.getStructuresInPlanet(params['id']).subscribe(
        (response) => { 
          console.log(response);
          this.structures = response;
        }
      );
    })

    console.log(this.structures);

  }

}
