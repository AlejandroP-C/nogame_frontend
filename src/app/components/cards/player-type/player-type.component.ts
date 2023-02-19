import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { User } from 'src/app/interfaces/user';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-type',
  templateUrl: './player-type.component.html',
  styleUrls: ['./player-type.component.scss']
})
export class PlayerTypeComponent implements OnInit {

  @Input() user: User = JSON.parse(localStorage.getItem('user')!);
  @Input() player: Player = JSON.parse(localStorage.getItem('player')!);
  
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  pickType(typeSelected: string) {

    let updtatePayer = { ...this.player, type: typeSelected };
    this.supabaseService.updateData(`player?user=eq.${this.user.email}&select=*`, environment.supabaseKey, updtatePayer).subscribe(() => {

      this.supabaseService.getPlayerData(this.user.email).subscribe((tablePlayer) => {
        console.log(tablePlayer[0]);
        localStorage.setItem('player', JSON.stringify(tablePlayer[0]))
        this.router.navigate(['/main']);
      });

    });

  }

  ngOnInit(): void {
  }

}
