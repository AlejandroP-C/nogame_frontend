import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {

  display: boolean = false;
  structures: any[] = [];

  constructor(
    // private supabaseService: SupabaseService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // this.activatedRouter.params.subscribe(params => {
    //   this.supabaseService.getStructuresInPlanet(params['id']).subscribe(
    //     (response) => {
    //       this.structures = response;
    //       if (this.structures.length === 0) { this.display = true }
    //     }
    //   );
    // });

  }

  redirect(): void { this.router.navigate(['main']) }

}
