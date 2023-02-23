import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../interfaces/user';
import { Player } from '../interfaces/player';
import { Planet } from '../interfaces/planet';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  logged = new BehaviorSubject<boolean>(false);

  saveStorageLogin(token: string, user: User, player: Player, homePlanet: Planet) {

    // ? Create item:
    // ? let myObj = { name: 'Nixon', profession: 'Developer' };
    // ? localStorage.setItem(key, JSON.stringify(myObj));

    // ? Read item:
    // ? let item = JSON.parse(localStorage.getItem(key));

    localStorage.setItem('user', JSON.stringify(user));

    localStorage.setItem('player', JSON.stringify(player));

    localStorage.setItem('homePlanet', JSON.stringify(homePlanet));

    localStorage.setItem('currentPlanet', JSON.stringify(homePlanet));

    localStorage.setItem('userTk', (token));

  }

  isLogged() {

    const userTk = localStorage.getItem('userTk')

    if (userTk) {

      if (!this.jwtHelper.isTokenExpired(userTk)) { return true } else { return false }

    } else { return false }

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
