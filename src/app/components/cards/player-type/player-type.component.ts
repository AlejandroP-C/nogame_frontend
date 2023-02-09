import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-type',
  templateUrl: './player-type.component.html',
  styleUrls: ['./player-type.component.scss']
})
export class PlayerTypeComponent implements OnInit {

  constructor(
    private supabaseService: SupabaseService, 
    private router: Router
  ) { }

  pickType(typeSelected: string) {
      
    let player: Player = { user: localStorage.getItem('email')!, type: typeSelected};

    this.supabaseService.insertData('player', environment.supabaseKey, player).subscribe();

    this.router.navigate(['/main']);

  }

  ngOnInit(): void {
  }

}
