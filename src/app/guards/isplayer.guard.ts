import { Injectable, Input } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Player } from '../interfaces/player';
import { SpringService } from '../services/spring.service';

@Injectable({
  providedIn: 'root'
})
export class IsplayerGuard implements CanActivate {

  @Input() player: Player = JSON.parse(localStorage.getItem('player')!);

  constructor(private spring: SpringService) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let isNewPlayer = this.spring.isNewPlayer(this.player.id).subscribe((response) => { return response });

    if (!isNewPlayer) { return false } else { return true; }

  }

}
