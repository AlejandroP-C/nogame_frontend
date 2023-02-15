import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() player: Player = JSON.parse(localStorage.getItem('player')!);
  @Input() user: User = JSON.parse(localStorage.getItem('user')!);

  constructor() { }

  ngOnInit(): void {

  }

}
