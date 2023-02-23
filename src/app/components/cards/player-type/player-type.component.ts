import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { SpringService } from 'src/app/services/spring.service';

@Component({
  selector: 'app-player-type',
  templateUrl: './player-type.component.html',
  styleUrls: ['./player-type.component.scss']
})
export class PlayerTypeComponent implements OnInit {

  typesList: any[] = [];

  // @Input() user: User = JSON.parse(localStorage.getItem('user')!);
  @Input() player: Player = JSON.parse(localStorage.getItem('player')!);

  constructor(
    private springService: SpringService,
    private router: Router
  ) { }

  pickType(typeSelected: number) {

    this.springService.updatePlayerType(this.player.id, typeSelected).subscribe(() => {
      this.springService.getPlayerById(this.player.id).subscribe((player) => {
        localStorage.setItem('player', JSON.stringify(player));
        this.router.navigate(['/main']);
      })
    });

  }

  ngOnInit(): void {
    this.springService.getAllTypesList().subscribe((types) => {
      this.typesList = types;
    })
  }

}
