import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '../interfaces/user';
import { SpringService } from '../services/spring.service';

@Injectable({
  providedIn: 'root'
})
export class IsplayerGuard implements CanActivate {

  constructor(private spring: SpringService) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let user: User = { email: localStorage.getItem('email')!};

    let isNewPlayer = this.spring.isNewPlayer(user);

    if (isNewPlayer) { return false } else { return true; }

  }

}
